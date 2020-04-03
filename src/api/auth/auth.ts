/**
 * External Dependencies
 */
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * Internal Dependencies
 */
import verifyToken from './verifyToken';
import { json } from '../../response';

// eslint-disable-next-line import/prefer-default-export
export async function handler(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    verifyToken(event);
    return json(event);
}
