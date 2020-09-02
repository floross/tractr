import React from 'react';
import { GetServerSideProps } from 'next';

import { initializeApollo } from '../apollo/client';
import { Layout } from '../components/Layout/Layout';
import {
  UserSearch,
  QUERY_FILTERED_USERS,
  QUERY_ALL_NATIONALITIES,
} from '../components/UserSearch';
import { MAX_ITEM_PER_LIST } from '../constants/list.constant';

export default function UserListPage(): JSX.Element {
  return (
    <Layout>
      <UserSearch />
    </Layout>
  );
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from external API
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: QUERY_FILTERED_USERS,
    variables: { take: MAX_ITEM_PER_LIST },
  });

  await apolloClient.query({
    query: QUERY_ALL_NATIONALITIES,
  });

  // Pass data to the page via props
  return { props: { initialApolloState: apolloClient.cache.extract() } };
};
