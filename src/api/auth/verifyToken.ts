// Based on https://github.com/awslabs/aws-support-tools/blob/master/Cognito/decode-verify-jwt/decode-verify-jwt.ts

/**
 * External Dependencies
 */
// @ts-ignore
import { get } from 'r2';
import { verify } from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { APIGatewayEvent } from 'aws-lambda';

/**
 * Internal Dependencies
 */
import UnauthorizedError from '../../errors/UnauthorizedError';

export type JWTToken = string;
export interface ClaimVerifyResult {
    readonly userName: string;
    readonly clientId: string;
    readonly isValid: boolean;
    readonly error?: any;
}

interface TokenHeader {
    kid: string;
    alg: string;
}
interface PublicKey {
    alg: string;
    e: string;
    kid: string;
    kty: string;
    n: string;
    use: string;
}
interface PublicKeyMeta {
    instance: PublicKey;
    pem: string;
}

interface PublicKeys {
    keys: PublicKey[];
}

interface MapOfKidToPublicKey {
    [key: string]: PublicKeyMeta;
}

interface Claim {
    token_use: string;
    auth_time: number;
    iss: string;
    exp: number;
    username: string;
    client_id: string;
}

const { COGNITO_POOL_ID, AWS_REGION } = process.env;

if (!COGNITO_POOL_ID) {
    throw new Error('env var required for cognito pool');
}

if (!AWS_REGION) {
    throw new Error('env var required for aws region');
}

const cognitoIssuer = `https://cognito-idp.${AWS_REGION}.amazonaws.com/${COGNITO_POOL_ID}`;

let cacheKeys: MapOfKidToPublicKey;
/**
 * Get public keys for cognito pool
 * @returns {MapOfKidToPublicKey}
 */
const getPublicKeys = async (): Promise<MapOfKidToPublicKey> => {
    if (!cacheKeys) {
        const url = `${cognitoIssuer}/.well-known/jwks.json`;
        const publicKeys = await get<PublicKeys>(url).json;
        cacheKeys = publicKeys.keys.reduce((agg: MapOfKidToPublicKey, current: PublicKey) => {
            // @ts-ignore This is correct as PublicKey has e, n, and kty field
            const pem = jwkToPem(current);
            agg[current.kid] = { instance: current, pem };
            return agg;
        }, {} as MapOfKidToPublicKey);
    }
    return cacheKeys;
};

/**
 * Verify the Authorization token on an event
 * @param event {APIGatewayEvent}
 */
const verifyToken = async (token: JWTToken): Promise<void> => {
    if(! token){
        throw new UnauthorizedError('Invalid token');
    }
    const tokenSections = (token || '').split('.');
    if (tokenSections.length < 2) {
        throw new UnauthorizedError('requested token is invalid');
    }
    const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
    const header = JSON.parse(headerJSON) as TokenHeader;
    const keys = await getPublicKeys();
    const key = keys[header.kid];
    if (key === undefined) {
        throw new UnauthorizedError('claim made for unknown kid');
    }
    const claim = verify(token, key.pem) as Claim;
    const currentSeconds = Math.floor((new Date()).valueOf() / 1000);
    if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
        throw new UnauthorizedError('claim is expired or invalid');
    }
    if (claim.iss !== cognitoIssuer) {
        throw new UnauthorizedError('claim issuer is invalid');
    }
    if ( ! ['access', 'id' ].includes( claim.token_use ) ) {
        throw new UnauthorizedError('Invalid claim use');
    }
    console.log(`claim confirmed for ${claim.username}`);
};

export const verifyAuthorizationToken = async(event: APIGatewayEvent)=> {
    await verifyToken(event.headers.Authorization);
}

export default verifyToken;
