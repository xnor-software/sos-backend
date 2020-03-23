import { APIGatewayEvent } from 'aws-lambda';
import { ApolloServer, gql } from  'apollo-server-lambda';

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

const server = new ApolloServer( { typeDefs, resolvers } );

export const handler = server.createHandler( {
    cors: {
        origin: '*',
        credentials: true,
    },
} );
