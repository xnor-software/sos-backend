type Maybe<T> = T | null;
export type ApiGatewayProxyResult = {
  statusCode?: Maybe<number>,
  body?: Maybe<string>,
};

export type Query = {
  users?: Maybe<Array<Maybe<User>>>,
};

export type User = {
  id: string,
  firstName: string,
  lastName: string,
};
