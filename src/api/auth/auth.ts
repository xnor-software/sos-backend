/**
 * External Dependencies
 */
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * Internal Dependencies
 */
import { verifyAuthorizationToken } from './verifyToken';
import { json } from '../../response';

// eslint-disable-next-line import/prefer-default-export
export async function handler(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    try {
        await verifyAuthorizationToken(event);
        return json(event)
    } catch (error) {
        return json(error);
    }
}
