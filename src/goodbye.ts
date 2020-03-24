import { APIGatewayEvent } from 'aws-lambda';
import { gql } from 'apollo-server-lambda';

import { createHandler } from './handler';

const typeDefs = gql`
    type Response {
        statusCode: Int
        body: String
    }

    type Query {
        goodbye: Response
    }
`;

const resolvers = {
    Query: {
        goodbye: (event: APIGatewayEvent): Record<string, any> => {
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        message: 'Goodbye Serverless v1.0! Your function executed successfully!',
                        input: event,
                    },
                    null,
                    2
                ),
            };
        }
    },
};

export const handler = createHandler({ typeDefs, resolvers })
