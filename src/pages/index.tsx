import React, { useState } from 'react';
import { User } from '@prisma/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { initializeApollo } from '../apollo/client';
import { Layout } from '../components/Layout/Layout';
import {
  UserList,
  ALL_USERS_LIST,
  UserListProps,
} from '../components/UserList';
import { UserSearch } from '../components/UserSearch';

export default function UserListPage({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [userFiltered, setState] = useState(users);
  return (
    <Layout>
      <UserSearch users={users} onUserListFiltered={setState} />
      <UserList users={userFiltered} />
    </Layout>
  );
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps<UserListProps> = async () => {
  // Fetch data from external API
  const apolloClient = initializeApollo();
  const users = (
    await apolloClient.query({
      query: ALL_USERS_LIST,
    })
  ).data.users as User[];

  // Pass data to the page via props
  return { props: { users } };
};
