/**
 * External Dependencies
 */
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * Internal Dependencies
 */
import { User } from '../../types';
import db from '../../db';
import { json } from '../../response';

// eslint-disable-next-line import/prefer-default-export
export async function handler( event: APIGatewayEvent ): Promise<APIGatewayProxyResult> {
    const users: Array<User> = await db.select( '*' ).from( 'users' );
    return json( users );
}
