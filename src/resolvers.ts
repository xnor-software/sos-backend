import { APIGatewayEvent } from 'aws-lambda';

export const resolvers = {
    Query: {
        hello: (event: APIGatewayEvent): Record<string, any> => {
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
