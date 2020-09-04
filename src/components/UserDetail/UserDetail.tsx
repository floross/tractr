import React from 'react';
import { User } from '@prisma/client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBirthdayCake,
  faEnvelopeOpen,
  faLocationArrow,
  faPhone,
  faUser,
  faVenusMars,
} from '@fortawesome/free-solid-svg-icons';

export interface UserDetailProps {
  user: User;
}

export const UserDetail: React.FunctionComponent<UserDetailProps> = ({
  user,
}) => {
  return (
    <div className="w-full p-4 bg-white flex justify-center">
      <div className="w-full mt-16 sm:mt-0 sm:w-1/2 md:w-2/3 lg:w-1/3 shadow-lg rounded-lg overflow-hidden my-4 flex flex-col">
        <div className="w-full h-56 flex justify-center items-center ">
          <img
            className="w-32 h-32 object-cover object-center rounded-full"
            src={user.pictureUrl}
            alt="avatar"
          />
        </div>
        <div className="flex flex-row items-center px-6 py-3 bg-tractr-grey text-gray-700">
          <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
          <h1 className="mx-3 font-semibold text-lg">{user.name}</h1>
        </div>
        <div className="py-4 px-6">
          <h1 className="text-2xl font-semibold text-gray-700">
            {user.username}
          </h1>
          <div className="flex items-center mt-4 text-gray-700">
            <FontAwesomeIcon icon={faEnvelopeOpen} className="h-4 w-4" />
            <h1 className="px-2 text-sm">{user.email}</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700">
            <FontAwesomeIcon icon={faBirthdayCake} className="h-4 w-4" />
            <h1 className="px-2 text-sm capitalize">
              {new Date(user.birthdate).toLocaleDateString()}
            </h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700">
            <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
            <h1 className="px-2 text-sm capitalize">{user.phone}</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700">
            <FontAwesomeIcon icon={faLocationArrow} className="h-4 w-4" />
            <h1 className="px-2 text-sm capitalize">{user.nationality}</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700">
            <FontAwesomeIcon icon={faVenusMars} className="h-4 w-4" />
            <h1 className="px-2 text-sm capitalize">{user.gender}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
