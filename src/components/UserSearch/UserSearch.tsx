import React, { useState, useEffect } from 'react';
import { User } from '@prisma/client';
import { initializeApollo } from '../../apollo/client';
import gql from 'graphql-tag';
import { usePrevious } from '../../hooks/use-previous.hook';

export interface UserListProps {
  users: User[];
  onFilterUsers: (users: User[]) => void;
}

export const FILTERED_USERS = gql`
  query filteredUsers($contains: String) {
    filteredUsers(contains: $contains) {
      id
      email
      name
      pictureUrl
      nationality
      birthdate
    }
  }
`;

export interface getFilteredUsersProps {
  contains?: string;
}

export async function getFilteredUsers({
  contains,
}: getFilteredUsersProps): Promise<User[]> {
  // Fetch data from external API
  const apolloClient = initializeApollo();
  const users = (
    await apolloClient.query({
      query: FILTERED_USERS,
      variables: {
        contains,
      },
    })
  ).data.filteredUsers as User[];

  // Pass data to the page via props
  return users;
}

export function getContryList(users: User[]) {
  return users.reduce<string[]>((acc, user) => {
    if (!acc.includes(user.nationality)) acc.push(user.nationality);
    return acc;
  }, []);
}

export const UserSearch = ({
  users,
  onFilterUsers,
}: UserListProps): JSX.Element => {
  const [filteredParams, setFilteredParams] = useState<getFilteredUsersProps>({
    contains: '',
  });

  const previousFilteredParam = usePrevious(filteredParams);

  useEffect(() => {
    if (
      !previousFilteredParam ||
      filteredParams.contains === previousFilteredParam.contains
    )
      return;

    getFilteredUsers(filteredParams).then(onFilterUsers);
  }, [filteredParams.contains]);

  return (
    <div className="min-w-full px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b-2 border-gray-200 tractr-grey text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Filter
        </div>
        <div className="px-5 py-5 border-b border-tractr-grey text-sm">
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username-contains"
              >
                Search in user name (contains)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username-contains"
                type="text"
                placeholder="Username contains..."
                onChange={(e) =>
                  setFilteredParams({
                    ...filteredParams,
                    contains: e.target.value,
                  })
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
