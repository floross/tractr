import {
  makeSchema,
  objectType,
  asNexusMethod,
  stringArg,
} from '@nexus/schema';
import { GraphQLDate } from 'graphql-iso-date';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-micro';
import path from 'path';

export const GQLDate = asNexusMethod(GraphQLDate, 'date');

const prisma = new PrismaClient();

const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('email');
    t.string('username');
    t.string('password');
    t.string('salt');
    t.string('name');
    t.string('phone');
    t.string('pictureUrl');
    t.string('nationality');
    t.string('gender');
    t.date('birthdate');
  },
});

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve: () => {
        return prisma.user.findMany();
      },
    });

    t.field('user', {
      type: 'User',
      args: { id: stringArg() },
      resolve: (_, args) => {
        return prisma.user.findOne({
          where: {
            id: args.id,
          },
        });
      },
    });

    t.list.field('filteredUsers', {
      type: 'User',
      args: { contains: stringArg() },
      resolve: (_, args) => {
        return prisma.user.findMany({
          where: {
            name: {
              contains: args.contains,
              mode: 'insensitive',
            },
          },
        });
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query, User, GQLDate],
  outputs: {
    typegen: path.join(
      process.cwd(),
      'src',
      'pages',
      'api',
      'nexus-typegen.ts',
    ),
    schema: path.join(process.cwd(), 'src', 'pages', 'api', 'schema.graphql'),
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default new ApolloServer({ schema }).createHandler({
  path: '/api',
});
