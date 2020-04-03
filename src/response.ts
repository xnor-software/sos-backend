/* eslint-disable import/prefer-default-export */
/**
 * External Dependencies
 */
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import StatusCodeError from './errors/StatusCodeError';

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

export function json(body: Body, statusCode?: StatusCode): APIGatewayProxyResult;
export function json(body: StatusCodeError, statusCode?: StatusCode): APIGatewayProxyResult;
export function json(body: Body | StatusCodeError, statusCode: StatusCode = 200 ): APIGatewayProxyResult {
    let _body = body;
    let _statusCode = statusCode;

    if (body instanceof StatusCodeError) {
        _body = { message: body.message };
        _statusCode = body.statusCode;
    }

    return createBaseResponse({
        statusCode: _statusCode,
        body: JSON.stringify(_body),
    })
}
