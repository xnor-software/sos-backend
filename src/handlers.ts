import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { graphqlLambda } from 'apollo-server-lambda/dist/lambdaApollo';
import lambdaPlayground from 'graphql-playground-middleware-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { schema } from './schema';
import { resolvers } from './resolvers';

type CallbackOutput = APIGatewayProxyResult | undefined;
type CallbackError = string | Error | null | undefined;
type Callback = (error: CallbackError, output: CallbackOutput) => void;


const myGraphQLSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers,
    logger: console,
});

export function graphqlHandler(event: APIGatewayProxyEvent, lambdaContext: Context, callback: Callback) {
    lambdaContext.callbackWaitsForEmptyEventLoop = false;

    function callbackFilter(error: CallbackError, output: CallbackOutput) {
        if(! output || error){
            return;
        }

        if (!output.headers) {
            output.headers = {};
        }
        output.headers['Access-Control-Allow-Origin'] = '*';
        callback(error, output);
    }

    const handler = graphqlLambda({ schema: myGraphQLSchema, tracing: true });
    return handler(event, lambdaContext, callbackFilter);
};

// for local endpointURL is /graphql and for prod it is /stage/graphql
export function playgroundHandler(event: APIGatewayProxyEvent, lambdaContext: Context, callback: Callback): Promise<void> {
    lambdaContext.callbackWaitsForEmptyEventLoop = false;
    return lambdaPlayground({
        endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT
            ? process.env.REACT_APP_GRAPHQL_ENDPOINT
            : '/production/graphql',
    })(event, lambdaContext, callback);
};
