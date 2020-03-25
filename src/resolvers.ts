import { APIGatewayEvent } from 'aws-lambda';
import db from './db';

import { User } from './types';

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
    Query: {
        users: async( event: APIGatewayEvent ): Promise<Array<User>> => {
            const users = await db.select( '*' ).from( 'users' );
            return users;
        },
    },
};
