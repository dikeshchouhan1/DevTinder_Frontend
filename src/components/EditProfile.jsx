import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "Failed to save profile.");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-start gap-4 md:gap-6 p-4 w-full max-w-4xl my-20 mx-auto">

        {/* Small Form Card */}
        <div className="w-full sm:w-[80%] md:w-[35%] bg-gray-900 rounded-xl shadow-lg border border-gray-700 p-4 sm:p-5">
          <h2 className="text-center text-lg sm:text-xl font-semibold mb-3 text-primary">
            Edit Profile
          </h2>

          <div className="space-y-2">
            {[
              { label: "First Name", value: firstName, setter: setFirstName },
              { label: "Last Name", value: lastName, setter: setLastName },
              { label: "Photo URL", value: photoUrl, setter: setphotoUrl },
              { label: "Gender", value: gender, setter: setGender },
              { label: "Age", value: age, setter: setAge },
              { label: "About", value: about, setter: setAbout },
            ].map(({ label, value, setter }) => (
              <div key={label}>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className="input input-bordered w-full bg-gray-800 border-gray-600 focus:border-primary focus:outline-none rounded-md text-xs sm:text-sm p-2"
                />
              </div>
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-center mt-2 text-xs sm:text-sm font-medium">
              {error}
            </p>
          )}

          <button
            className="btn btn-primary w-full mt-3 py-2 text-sm rounded-md hover:bg-primary-focus transition"
            onClick={saveProfile}
          >
            Save
          </button>
        </div>

        {/* Preview Card */}
        <div className="w-full sm:w-[80%] md:w-[55%] flex justify-center">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
            className="w-full max-w-xs sm:max-w-sm"
          />
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="alert alert-success shadow-lg text-sm py-2 px-4 rounded-lg">
            ✅ Profile saved successfully!
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
