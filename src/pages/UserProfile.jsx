import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
          <div className="mb-6">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-32 h-32 rounded-full mx-auto object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl mx-auto">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
          <p className="text-gray-600 mb-4">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
