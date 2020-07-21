import React, { useState } from "react";
import RepoSelectionPage from "./RepoSelectionPage";
import PulseLoader from "react-spinners/PulseLoader";

const UserHomeDash = ({ profile }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div>
      <div className="bg-white px-4 pb-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Your showcase
            </h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <span className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setEditMode(!editMode)}
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700"
              >
                Edit
              </button>
            </span>
          </div>
        </div>
      </div>
      <RepoSelectionPage
        repos={profile.repos}
        selected={profile.selectedRepos ?? []}
        editMode={editMode}
      />
    </div>
  );
};

export default UserHomeDash;
