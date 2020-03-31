/* eslint-disable import/prefer-default-export */
/**
 * External Dependencies
 */
import { APIGatewayProxyResult } from 'aws-lambda';

type StatusCode = number;
type Body = string | boolean | number | object | null;

function createBaseResponse( {
    statusCode,
    body,
    headers,
    multiValueHeaders,
    isBase64Encoded,
}: APIGatewayProxyResult ): APIGatewayProxyResult {
    return {
        statusCode,
        body,
        headers,
        multiValueHeaders,
        isBase64Encoded,
    };
}

export const json = (
    body: Body,
    statusCode: StatusCode = 200,
): APIGatewayProxyResult => (
    createBaseResponse( {
        statusCode,
        body: JSON.stringify( body ),
    } )
);
