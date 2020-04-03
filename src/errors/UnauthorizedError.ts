import StatusCodeError from './StatusCodeError';

class UnauthorizedError extends StatusCodeError {
    public statusCode: number = 403;
    public message: string = 'Unauthorized';

    constructor(public errorMessage: string = 'Unauthorized'){
        super(errorMessage);
    }
}

export default UnauthorizedError;
