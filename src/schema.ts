import { gql } from 'apollo-server-lambda';

export const schema = gql`
    type Response {
        statusCode: Int
        body: String
    }

    type Query {
        hello: Response
    }
`;
