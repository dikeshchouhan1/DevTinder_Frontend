import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewsRequest = async (status, _id) => {
    try {
      await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, { withCredentials: true });
      dispatch(removeRequest(_id));
    } catch (err) { }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
      dispatch(addRequest(res.data.data));
    } catch (err) { }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return null;
  if (requests.length === 0)
    return (
      <h1 className="flex justify-center items-center my-10 text-lg text-gray-500 dark:text-gray-300">
        No Connection Found
      </h1>
    );

  return (
    <div className="flex flex-col items-center my-30 min-h-screen px-2 sm:px-4">
      <h1 className="font-bold text-3xl text-white mb-8 bg-gradient-to-r from-blue-700 to-violet-600 p-4 rounded-2xl shadow-lg">
        Connection Requests
      </h1>
      <div className="w-full flex flex-col gap-6">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
          return (
            <div
              key={_id}
              className="bg-base-300 dark:bg-gray-800 shadow-lg rounded-lg p-5 flex flex-col md:flex-row justify-between items-center mx-auto w-full max-w-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <img
                src={photoUrl}
                alt="photo"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
              />
              <div className="flex-1 text-left mx-3 mt-4 md:mt-0">
                <h2 className="font-bold text-xl text-blue-600 dark:text-blue-400">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {age} {gender}
                  </p>
                )}
                <p className="text-base text-gray-700 dark:text-gray-200 mt-1">{about}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0 md:ml-4">
                <button
                  className="btn btn-primary bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
                  onClick={() => reviewsRequest('rejected', request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
                  onClick={() => reviewsRequest('accepted', request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
