import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ApolloServer, Config, CreateHandlerOptions } from 'apollo-server-lambda';

type Callback = ()=> void;
type Handler = (event: APIGatewayProxyEvent, lambdaContext: Context, callback: Callback) => void;


const defaultHanderOptions: CreateHandlerOptions = {
    cors: {
        origin: '*',
        credentials: true,
    },
};


const _createHandler = (server: ApolloServer, handlerOptions: CreateHandlerOptions) => (event: APIGatewayProxyEvent, lambdaContext: Context, callback: Callback) => {

    const handler = server.createHandler(handlerOptions);

    // Handle playground
    if (event.httpMethod === 'GET') {
        handler(
            { ...event, path: event.requestContext.path || event.path },
            lambdaContext,
            callback,
        );
    } else {
        handler(event, lambdaContext, callback);
    }
};

/**
 *
 *
 * @export
 * @param {Config} options
 * @returns {ApolloServer}
 */
export function createServer(options: Config): ApolloServer {
    return new ApolloServer( options );
}

/**
 *
 *
 * @export
 * @param {Config} options
 * @param {CreateHandlerOptions} [handlerOptions=defaultHanderOptions]
 * @returns {Handler}
 */
export function createHandler(options: Config, handlerOptions = defaultHanderOptions): Handler {
    const server: ApolloServer = createServer(options);
    return _createHandler(server, handlerOptions);
}
