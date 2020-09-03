import {
  makeSchema,
  objectType,
  asNexusMethod,
  stringArg,
  arg,
} from '@nexus/schema';
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';
import { PrismaClient, FindManyUserArgs } from '@prisma/client';
import { ApolloServer } from 'apollo-server-micro';
import path from 'path';
import { NexusArgDef, intArg } from '@nexus/schema/dist/definitions/args';

export const GQLDate = asNexusMethod(GraphQLDate, 'date', 'Date');
export const GQLDateTime = asNexusMethod(GraphQLDateTime, 'datetime', 'Date');

export const dateArg = (opts = {}): NexusArgDef<'Date'> =>
  arg({ ...opts, type: 'Date' });
export const dateTimeArg = (opts = {}): NexusArgDef<'DateTime'> =>
  arg({ ...opts, type: 'DateTime' });

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

const UserSearchResult = objectType({
  name: 'UserSearchResult',
  definition(t) {
    t.list.field('users', { type: 'User' });
    t.field('count', { type: 'Int' });
    t.field('cursor', { type: 'String', nullable: true });
  },
});

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('getAllNationalities', {
      type: 'String',
      resolve: async () => {
        return (
          await prisma.user.findMany({
            distinct: 'nationality',
            select: { nationality: true },
          })
        ).reduce<string[]>((acc, user) => {
          acc.push(user.nationality);
          return acc;
        }, []);
      },
    });

    t.field('getFilteredUsers', {
      type: 'UserSearchResult',
      args: {
        contains: stringArg(),
        startDate: dateTimeArg(),
        endDate: dateTimeArg(),
        nationality: stringArg(),
        cursor: stringArg(),
        take: intArg(),
      },

      resolve: async (
        _,
        { contains, startDate, endDate, nationality, cursor, take },
      ) => {
        let findManyArgs = {};

        // Construct the AND filtering
        const AND = [];
        if (contains && contains !== '')
          AND.push({
            name: {
              contains,
              mode: 'insensitive',
            },
          });
        if (startDate)
          AND.push({
            birthdate: {
              gte: startDate,
            },
          });
        if (endDate)
          AND.push({
            birthdate: {
              lte: endDate,
            },
          });
        if (nationality && nationality !== '')
          AND.push({
            nationality: nationality,
          });

        if (AND.length > 0) findManyArgs = { ...findManyArgs, where: { AND } };

        const findManyArgsWithTake: FindManyUserArgs = { ...findManyArgs };

        // Build the cursor positional
        if (take) {
          findManyArgsWithTake.take = take;
          if (cursor) {
            findManyArgsWithTake.cursor = { id: cursor };
            findManyArgsWithTake.skip = 1;
          }
        }

        return Promise.all([
          await prisma.user.findMany(findManyArgsWithTake),
          await prisma.user.count(findManyArgs),
        ]).then(([users, count]) => ({
          users,
          count,
          cursor: users.slice(-1).pop()?.id,
        }));
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query, User, UserSearchResult, GQLDate, GQLDateTime],
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
