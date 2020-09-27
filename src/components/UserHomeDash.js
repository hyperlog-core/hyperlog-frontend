import React, { useState } from "react";
import RepoSelectionPage from "./RepoSelectionPage";
import PulseLoader from "react-spinners/PulseLoader";
import { gql, useMutation } from "@apollo/client";
import Portal from "../Portal";
import EmbedCodeModal from "./EmbedCodeModal";

const MUTATION_SELECT_REPOS = gql`
  mutation($repos: [String!]!) {
    selectRepos(repos: $repos) {
      success
      errors
    }
  }
`;

const UserHomeDash = ({ profile }) => {
  const [editMode, setEditMode] = useState(false);
  const [mutError, setMutError] = useState(null);
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);

  const [selectRepos, { loading: mutationLoading }] = useMutation(
    MUTATION_SELECT_REPOS,
    {
      onCompleted: (data) => {
        if (data.selectRepos.errors) {
          setMutError(data.selectRepos.errors[0]);
        }
      },
      onError: (err) => console.log(err),
    }
  );

  return (
    <div>
      {mutError ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div>
              <p className="text-sm leading-5 text-red-700">{mutError}</p>
            </div>
          </div>
        </div>
      ) : null}
      <div className="bg-white shadow sm:rounded-lg mb-5">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Embed the widget on your website!
          </h3>
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-xl text-sm leading-5 text-gray-500">
              <p>
                Now that you've selected repos you want to showcase, why don't
                you just go on and embed the widget in your portfolio website?
              </p>
            </div>
            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setIsEmbedOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                >
                  Show Embed Code
                </button>
                <Portal>
                  <EmbedCodeModal
                    userId={profile.uuid}
                    isOpen={isEmbedOpen}
                    setOpen={setIsEmbedOpen}
                  />
                </Portal>
              </span>
            </div>
          </div>
        </div>
      </div>
      {!editMode && (
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
                  onClick={() =>
                    selectRepos({
                      variables: { repos: profile.selectedRepos },
                    })
                  }
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                >
                  {mutationLoading ? (
                    <PulseLoader size="10px" color="#161e2e" />
                  ) : (
                    "Analyse Repos Again"
                  )}
                </button>
              </span>
              <span className="inline-flex rounded-md shadow-sm ml-2">
                <button
                  onClick={() => setEditMode(!editMode)}
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition ease-in-out duration-150"
                >
                  Edit
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
      <RepoSelectionPage
        repos={profile.repos}
        selected={profile.selectedRepos ?? []}
        editMode={editMode}
      />
    </div>
  );
};

export default UserHomeDash;
