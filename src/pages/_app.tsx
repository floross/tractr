import '../styles/index.css';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import { AppPropsType } from 'next/dist/next-server/lib/utils';

export default function App({
  Component,
  pageProps,
}: AppPropsType): JSX.Element {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
