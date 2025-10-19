import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFeed(userId));
    } catch (err) {
      // Optional: Display error feedback for better UX
    }
  };

  return (
    <div className="flex justify-center items-center py-6 px-2">
      <div className="bg-base-300 rounded-xl shadow-lg overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg transition transform hover:scale-105">
        <figure className="bg-gradient-to-tr from-primary to-secondary flex justify-center items-center py-6">
          <img
            src={photoUrl}
            alt="photo"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </figure>
        <div className="card-body px-6 py-4">
          <h2 className="font-bold text-2xl text-primary text-center">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-sm text-gray-400 text-center mt-1">
              {age} &middot; {gender}
            </p>
          )}
          <p className="text-base text-gray-200 text-center mt-2 mb-4 min-h-[48px]">
            {about}
          </p>
          <div className="flex justify-center gap-4 my-4">
            <button
              className="btn btn-error px-6 py-2 rounded-lg text-white font-medium transition hover:brightness-90"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success px-6 py-2 rounded-lg text-white font-medium transition hover:brightness-110"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
