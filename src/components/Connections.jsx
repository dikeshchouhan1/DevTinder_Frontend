import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice.js";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchConnections = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      setError("Failed to load connections.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <span className="loading loading-spinner text-primary"></span>
        <h2 className="mt-4 text-lg text-white">Loading Connections...</h2>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <h1 className="text-red-500 text-xl">{error}</h1>
      </div>
    );

  if (!connections || connections.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <h1 className="text-2xl text-gray-400">No Connections Found</h1>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8">
      <h1 className="font-bold text-white text-3xl md:text-4xl text-center mb-12">Connections</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
          return (
            <div
              key={_id}
              className="flex flex-col md:flex-row items-center md:items-start p-5 md:p-6 rounded-2xl shadow-lg bg-base-200 hover:shadow-2xl transition-transform transform hover:scale-105 duration-200 ease-in-out"
            >
              <img
                src={photoUrl}
                alt="photo"
                className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-primary object-cover"
              />

              <div className="flex-1 text-center md:text-left mt-4 md:mt-0 md:ml-6">
                <h2 className="font-semibold text-xl text-primary mb-1">{firstName} {lastName}</h2>
                {(age || gender) && (
                  <p className="text-sm text-gray-400 mb-2">
                    {age ? age : ""}{age && gender ? " · " : ""}{gender ? gender : ""}
                  </p>
                )}
                <p className="text-gray-300 text-sm md:text-base">{about}</p>
              </div>

              <Link to={"/chat/" + _id} className="mt-4 md:mt-0 w-full md:w-auto md:ml-4 flex-shrink-0">
                <button className="btn btn-primary w-full md:w-auto px-6 py-2 rounded-lg hover:bg-primary-dark transition">
                  Chat
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
