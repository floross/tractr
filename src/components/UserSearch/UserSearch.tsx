import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, NetworkStatus } from '@apollo/react-hooks';
import { User } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndoAlt, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { MAX_ITEM_PER_LIST } from '../../constants/list.constant';
import { UserList } from '../UserList';
import {
  DOCKER_SERVER_URL,
  SERVERLESS_URL,
} from '../../constants/servers.constant';

export const QUERY_FILTERED_USERS = gql`
  query getFilteredUsers(
    $contains: String
    $startDate: DateTime
    $endDate: DateTime
    $nationality: String
    $cursor: String
    $take: Int
  ) {
    getFilteredUsers(
      contains: $contains
      startDate: $startDate
      endDate: $endDate
      nationality: $nationality
      cursor: $cursor
      take: $take
    ) {
      users {
        id
        email
        name
        pictureUrl
        nationality
        birthdate
      }
      count
      cursor
    }
  }
`;

export const QUERY_ALL_NATIONALITIES = gql`
  query getAllNationalities {
    getAllNationalities
  }
`;

export interface FilteredUsersProps {
  contains?: string;
  startDate?: string;
  endDate?: string;
  nationality?: string;
}

export interface FilteredUsersQueryResults {
  getFilteredUsers: {
    users: User[];
    count: number;
    cursor: string;
  };
}

export interface FilteredUsersQueryVariables {
  contains?: string;
  startDate?: Date;
  endDate?: Date;
  nationality?: string;
  cursor?: string;
  take?: number;
}

export const DEFAULT_FILTERED_PARAMS: FilteredUsersProps = {
  contains: '',
  startDate: '',
  endDate: '',
  nationality: '',
};

export function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void {
  // When keyboard press enter remove keyboard focus (Close the keyboard on the phone)
  if (e.keyCode === 13) {
    e.currentTarget.blur();
  }
}

export type SERVER_SOURCES = 'serverless' | 'docker';

export function resetFilters(
  setFilteredParams: React.Dispatch<React.SetStateAction<FilteredUsersProps>>,
  setServerSource: React.Dispatch<React.SetStateAction<SERVER_SOURCES>>,
): void {
  setFilteredParams(DEFAULT_FILTERED_PARAMS);
  setServerSource('serverless');
}

export const UserSearch = (): JSX.Element => {
  // Keep a track of the filtered params and the previous one
  const [filteredParams, setFilteredParams] = useState<FilteredUsersProps>(
    DEFAULT_FILTERED_PARAMS,
  );

  const nationalities = useQuery(QUERY_ALL_NATIONALITIES).data
    ?.getAllNationalities;

  const [serverSource, setServerSource] = useState<SERVER_SOURCES>(
    'serverless',
  );

  const { loading, error, data, fetchMore, networkStatus } = useQuery<
    FilteredUsersQueryResults,
    FilteredUsersQueryVariables
  >(QUERY_FILTERED_USERS, {
    variables: {
      contains: filteredParams.contains,
      startDate:
        filteredParams.startDate !== ''
          ? new Date(filteredParams.startDate)
          : null,
      endDate:
        filteredParams.endDate !== '' ? new Date(filteredParams.endDate) : null,
      nationality: filteredParams.nationality,
      take: MAX_ITEM_PER_LIST,
    },
    notifyOnNetworkStatusChange: true,
    context: {
      serverSource,
    },
  });

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  // setFilteredUserCursor();
  const results = data?.getFilteredUsers;
  const users = results?.users || [];
  const totalUsers = results?.count;
  const cursor = results?.cursor;

  const isMoreUserToFetch = users?.length < totalUsers;

  if (error)
    return (
      <div className="min-w-full px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden p-4">
          Error during fetching users...
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-w-full px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full px-4 shadow rounded-lg overflow-hidden">
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
              value={filteredParams.contains}
              onChange={(e) => {
                setFilteredParams({
                  ...filteredParams,
                  contains: e.target.value,
                });
              }}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="mb-4 flex flex-row flex-wrap">
            <div className="flex-1 mr-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="start-date"
              >
                Date of birth after...
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="start-date"
                type="date"
                placeholder="Date of birth after...."
                value={filteredParams.startDate}
                onChange={(e) => {
                  setFilteredParams({
                    ...filteredParams,
                    startDate: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="end-date"
              >
                Date of birth before...
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="end-date"
                type="date"
                placeholder="Date of birth before..."
                value={filteredParams.endDate}
                onChange={(e) => {
                  setFilteredParams({
                    ...filteredParams,
                    endDate: e.target.value,
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
              value={filteredParams.nationality}
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

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select the server source
            </label>

            <div className="flex flex-row flex-wrap">
              <div className="flex-1 mr-2">
                <input
                  className="form-radio mr-4 cursor-pointer"
                  id="server-source-serverless"
                  type="radio"
                  value="serverless"
                  checked={serverSource === 'serverless'}
                  onChange={() => setServerSource('serverless')}
                />
                <label
                  htmlFor="server-source-serverless"
                  className="cursor-pointer"
                >
                  Serverless ({SERVERLESS_URL})
                </label>
              </div>
            </div>
            <div className="flex flex-row flex-wrap ">
              <div className="flex-1 mr-2">
                <input
                  className="form-radio mr-4 cursor-pointer"
                  id="server-source-docker"
                  type="radio"
                  value="docker"
                  checked={serverSource === 'docker'}
                  onChange={() => setServerSource('docker')}
                />
                <label
                  htmlFor="server-source-docker"
                  className="cursor-pointer"
                >
                  Docker ({DOCKER_SERVER_URL})
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4 flex justify-end">
            <button
              className=" bg-white hover:bg-tractr-grey text-black font-bold py-2 px-4 rounded shadow"
              onClick={() => resetFilters(setFilteredParams, setServerSource)}
            >
              <FontAwesomeIcon className="h-4 w-4" icon={faUndoAlt} /> Reset
            </button>
          </div>
        </div>
      </div>
      {loading && !loadingMorePosts ? (
        <div className="w-full text-center my-2">Loading users...</div>
      ) : (
        <UserList users={users} />
      )}
      {isMoreUserToFetch && (
        <div className="min-w-full flex justify-center items-center h-16">
          <button
            className="bg-white hover:bg-tractr-grey text-black font-bold py-2 px-4 rounded shadow"
            disabled={loadingMorePosts}
            onClick={() =>
              fetchMore({
                variables: {
                  contains: filteredParams.contains,
                  startDate: new Date(filteredParams.startDate),
                  endDate: new Date(filteredParams.endDate),
                  nationality: filteredParams.nationality,
                  cursor,
                  take: MAX_ITEM_PER_LIST,
                },
              })
            }
          >
            <FontAwesomeIcon className="h-4 w-4" icon={faCaretDown} /> Load more
          </button>
        </div>
      )}
    </div>
  );
};
