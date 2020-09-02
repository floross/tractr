import React from 'react';
import gql from 'graphql-tag';
import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next';
import { User, PrismaClient } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { Layout } from '../../components/Layout';
import { UserDetail } from '../../components/UserDetail';
import { ParsedUrlQuery } from 'querystring';
import Link from 'next/link';

export const ALL_USERS_ID = gql`
  {
    users {
      id
    }
  }
`;

export interface UserDetailProps {
  user: User;
}

export interface UserDetailParam extends ParsedUrlQuery {
  id: string;
}

export default function UserDetailPage({
  user,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <Layout>
      <div className="relative w-full h-full flex justify-center items-center flex-col">
        <Link href="/">
          <button className="sm:absolute top-0 left-0 relative mt-4 ml-4 bg-white hover:bg-tractr-grey text-black font-bold py-2 px-4 rounded shadow">
            <FontAwesomeIcon icon={faArrowLeft} /> Home
          </button>
        </Link>
        <UserDetail user={user} />
      </div>
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
