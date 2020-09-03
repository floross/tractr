import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { NormalizedCacheObject, ApolloLink } from '@apollo/react-hooks';
import {
  SERVERLESS_URL,
  DOCKER_SERVER_URL,
} from '../constants/servers.constant';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  // Create First Link
  const serverLessHttpLink = new HttpLink({
    uri: SERVERLESS_URL,
    credentials: 'same-origin',
  });

  // Create Second Link
  const dockerServerLink = new HttpLink({
    uri: DOCKER_SERVER_URL,
    credentials: 'same-origin',
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.split(
      // Routes the query to the proper client
      (operation) => operation.getContext().serverSource === 'docker',
      dockerServerLink,
      serverLessHttpLink,
    ),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getFilteredUsers: {
              keyArgs: ['contains', 'startDate', 'endDate', 'nationality'],
              merge(existing = {}, incoming = {}) {
                return {
                  ...existing,
                  ...incoming,
                  users: [...(existing.users || []), ...(incoming.users || [])],
                };
              },
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(
  initialState = null,
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(
  initialState: NormalizedCacheObject,
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
