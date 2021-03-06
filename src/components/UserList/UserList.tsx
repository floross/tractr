import React from 'react';
import { User } from '@prisma/client';
import Link from 'next/link';

export interface UserListProps {
  users: User[];
}

export const UserList: React.FunctionComponent<UserListProps> = ({ users }) => {
  return (
    <div className="inline-block min-w-full px-4 shadow rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal ">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 tractr-grey text-left text-md font-semibold text-gray-600 uppercase tracking-wider">
              User
            </th>
            <th className="hidden lg:table-cell px-5 py-3 border-b-2 border-gray-200 tractr-grey text-left text-md font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="hidden md:table-cell px-5 py-3 border-b-2 border-gray-200 tractr-grey text-left text-md font-semibold text-gray-600 uppercase tracking-wider">
              Nationality
            </th>
            <th className="hidden lg:table-cell px-5 py-3 border-b-2 border-gray-200 tractr-grey text-left text-md font-semibold text-gray-600 uppercase tracking-wider">
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
                    <td className="hidden lg:table-cell px-5 py-5 border-b border-tractr-grey text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {email}
                      </p>
                    </td>
                    <td className="hidden md:table-cell px-5 py-5 border-b border-tractr-grey text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {nationality}
                      </p>
                    </td>
                    <td className="hidden lg:table-cell px-5 py-5 border-b border-tractr-grey text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {new Date(birthdate).toLocaleDateString()}
                      </p>
                    </td>
                  </tr>
                </Link>
              );
            },
          )}
        </tbody>
      </table>
      {users.length === 0 && (
        <div aria-colspan={0} className="w-full text-gray-700 text-center my-2">
          No user found...
        </div>
      )}
    </div>
  );
};
