import React from 'react';
import gql from 'graphql-tag';
import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next';
import { User, PrismaClient } from '@prisma/client';

import { Layout } from '../../components/Layout';
import { UserDetail } from '../../components/UserDetail';
import { ParsedUrlQuery } from 'querystring';

export interface UserDetailProps {
  user: User;
}

export interface UserDetailParam extends ParsedUrlQuery {
  id: string;
}

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

export const getStaticPaths: GetStaticPaths<UserDetailParam> = async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    select: { id: true },
  });
  await prisma.$disconnect();
  return {
    paths: users.map(({ id }) => ({
      params: {
        id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  UserDetailProps,
  UserDetailParam
> = async ({ params }) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findOne({
    where: {
      id: params.id,
    },
  });
  await prisma.$disconnect();
  return { props: { user: JSON.parse(JSON.stringify(user)) } };
};
