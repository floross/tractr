import React from 'react';
import { gql } from '@apollo/client';
import { User } from '@prisma/client';
import Link from 'next/link';

export const ALL_USERS_LIST = gql`
  query allUser {
    users {
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
}

export const UserList: React.FunctionComponent<UserListProps> = ({ users }) => {
  return (
    <div className="min-w-full px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 tractr-grey text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 tractr-grey text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 tractr-grey text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nationality
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 tractr-grey text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Birth date
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(
              ({ id, name, pictureUrl, nationality, birthdate, email }) => {
                return (
                  <Link href={`user/${id}`} key={id}>
                    <tr className="cursor-pointer hover:bg-tractr-grey">
                      <td className="px-5 py-5 border-b border-tractr-grey text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={pictureUrl}
                              alt={`Photo of ${name}`}
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-tractr-grey text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {email}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-tractr-grey text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {nationality}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-tractr-grey text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {birthdate}
                        </p>
                      </td>
                    </tr>
                  </Link>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
