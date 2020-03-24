import { gql } from 'apollo-server-lambda';

// eslint-disable-next-line import/prefer-default-export
export const schema = gql`
    type APIGatewayProxyResult {
        statusCode: Int
        body: String
    }

    type Query {
        hello: APIGatewayProxyResult
    }
`;
