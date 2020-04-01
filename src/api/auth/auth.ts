/**
 * External Dependencies
 */
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * Internal Dependencies
 */
import { json } from '../../response';

// eslint-disable-next-line import/prefer-default-export
export async function handler(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    return json(event);
}
