import React from 'react';
import gql from 'graphql-tag';
import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next';
import { User } from '@prisma/client';

import { initializeApollo } from '../../apollo/client';
import { Layout } from '../../components/Layout';
import { UserDetail, USER_DETAIL } from '../../components/UserDetail';

export const ALL_USERS_ID = gql`
  {
    users {
      id
    }
  }
`;

export default function UserDetailPage({
  user,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <Layout>
      <UserDetail user={user} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const users = (
    await apolloClient.query({
      query: ALL_USERS_ID,
    })
  ).data.users as Pick<User, 'id'>[];

  return {
    paths: users.map(({ id }) => ({
      params: {
        id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  const user = (
    await apolloClient.query({
      query: USER_DETAIL,
      variables: {
        id: params.id,
      },
    })
  ).data.user as User[];

  return { props: { user } };
};
