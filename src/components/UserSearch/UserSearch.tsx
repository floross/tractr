import React, { useState, useEffect } from 'react';
import { User } from '@prisma/client';
import { initializeApollo } from '../../apollo/client';
import gql from 'graphql-tag';
import { usePrevious } from '../../hooks/use-previous.hook';

export const FILTERED_USERS = gql`
  query filteredUsers(
    $contains: String
    $startDate: DateTime
    $endDate: DateTime
    $nationality: String
  ) {
    filteredUsers(
      contains: $contains
      startDate: $startDate
      endDate: $endDate
      nationality: $nationality
    ) {
      id
      email
      name
      pictureUrl
      nationality
      birthdate
    }
  }
`;

export interface UserListProps {
  users: User[];
  onUserListFiltered: (users: User[]) => void;
}

export interface getFilteredUsersProps {
  contains?: string;
  startDate?: Date;
  endDate?: Date;
  nationality?: string;
}

export async function getFilteredUsers({
  contains,
  startDate,
  endDate,
  nationality,
}: getFilteredUsersProps): Promise<User[]> {
  // Fetch data from external API
  const apolloClient = initializeApollo();
  const users = (
    await apolloClient.query({
      query: FILTERED_USERS,
      variables: {
        contains,
        startDate,
        endDate,
        nationality,
      },
    })
  ).data.filteredUsers as User[];
  return users;
}

export function getNationalitiesFromUserList(users: User[]): string[] {
  return users.reduce<string[]>((acc, user) => {
    if (!acc.includes(user.nationality)) acc.push(user.nationality);
    return acc;
  }, []);
}

export const UserSearch = ({
  users,
  onUserListFiltered,
}: UserListProps): JSX.Element => {
  // Keep a track of the filtered params and the previous one
  const [filteredParams, setFilteredParams] = useState<getFilteredUsersProps>({
    contains: '',
    startDate: null,
    endDate: null,
    nationality: '',
  });
  const previousFilteredParam = usePrevious(filteredParams);

  const nationalities = getNationalitiesFromUserList(users);

  useEffect(() => {
    console.log(filteredParams);
    if (!previousFilteredParam || filteredParams === previousFilteredParam)
      return;

    // If the filtered param have change we do execute a call to the graphql Endpoint to get the results
    getFilteredUsers(filteredParams).then((users) => {
      onUserListFiltered(users);
    });
  });

  return (
    <div className="min-w-full px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b-2 border-gray-200 tractr-grey text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Filter
        </div>
        <div className="px-5 py-5 border-b border-tractr-grey text-sm">
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
              onChange={(e) => {
                setFilteredParams({
                  ...filteredParams,
                  contains: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-4 flex flex-row flex-wrap">
            <div className="flex-1 mr-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="start-date"
              >
                Start date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="start-date"
                type="date"
                placeholder="Birthday is greater than..."
                onChange={(e) => {
                  setFilteredParams({
                    ...filteredParams,
                    startDate: new Date(e.target.value),
                  });
                }}
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="end-date"
              >
                End date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="end-date"
                type="date"
                placeholder="Birthday is lesser than..."
                onChange={(e) => {
                  setFilteredParams({
                    ...filteredParams,
                    endDate: new Date(e.target.value),
                  });
                }}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nationalities"
            >
              Select a Country
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nationalities"
              placeholder="Nationalities..."
              onChange={(e) => {
                setFilteredParams({
                  ...filteredParams,
                  nationality: e.target.value,
                });
              }}
            >
              <option value="">---None---</option>
              {nationalities.map((nationality) => (
                <option key={nationality} value={nationality}>
                  {nationality}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
