import { APIGatewayEvent } from 'aws-lambda';
import { gql } from  'apollo-server-lambda';

import { createHandler } from './handler';

const typeDefs = gql`
    type Response {
        statusCode: Int
        body: String
    }

    type Query {
        hello: Response
    }
`;

const resolvers = {
    Query: {
        hello: ( event: APIGatewayEvent ): Record<string, any> => {
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        message: 'Hello Serverless v1.0! Your function executed successfully!',
                        input: event,
                    },
                    null,
                    2
                ),
            };
        }
    },
};

export const handler = createHandler({typeDefs, resolvers})
