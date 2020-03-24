import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export const resolvers = {
    Query: {
        hello: (event: APIGatewayEvent): APIGatewayProxyResult => {
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
