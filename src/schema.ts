import { gql } from 'apollo-server-lambda';

export const schema = gql`
    type APIGatewayProxyResult {
        statusCode: Int
        body: String
    }

    type Query {
        hello: APIGatewayProxyResult
    }
`;
