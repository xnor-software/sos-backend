import { APIGatewayEvent } from 'aws-lambda';

export async function handler( event: APIGatewayEvent ): Promise<any> {
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
