import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
      console.log("Feed Data:", res?.data);
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    // Always fetch feed when component mounts
    getFeed();
  }, []);

  if (!feed) {
    return <h1 className="flex justify-center my-10">Loading...</h1>;
  }

  if (feed.length === 0) {
    return <h1 className="flex justify-center my-10">No new users found</h1>;
  }

  return (
    <div className="flex justify-center my-30 ">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
