import { WebSocketLink } from "@apollo/client/link/ws";
import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import { LOGADMIN_TOKEN } from "./const";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";

const token = localStorage.getItem(LOGADMIN_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token)); // false
export const authTokenVar = makeVar(token); // null

const httpLink = createHttpLink({
  uri: "http://localhost:5001/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || "", // escape undefined
    },
  };
});

const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "ws://localhost:5001/graphql"
      : `ws://localhost:5001/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      "x-jwt": authTokenVar() || "",
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

export const client = new ApolloClient({
  link: from([onErrorLink, splitLink]),
  // link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
