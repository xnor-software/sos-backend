import StatusCodeError from './StatusCodeError';

class UnauthorizedError extends StatusCodeError {
    public statusCode: number = 403;

    constructor(public message: string = 'Unauthorized'){
        super(message);
    }
}

export default UnauthorizedError;
