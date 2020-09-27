import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const IndividualRepo = ({ isSelected, isEditing, index, repo, onClick }) => {
  const classColors = (languageName) => {
    switch (languageName) {
      case "JavaScript":
        return "bg-yellow-100 text-yellow-800";
      case "TypeScript":
      case "Go":
        return "bg-blue-100 text-blue-800";
      case "Dart":
        return "bg-teal-100 text-teal-800";
      case "Ruby":
        return "bg-red-100 text-red-800";
      case "CSS":
        return "bg-cool-gray-100 text-cool-gray-800";
      case "Python":
        return "bg-indigo-100 text-indigo-800";
      case "Elixir":
      case "PHP":
        return "bg-purple-100 text-purple-800";
      case "Vue":
        return "bg-green-100 text-green-800";
      case "Java":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <li className={index === 0 ? "" : "border-t border-gray-200"}>
      <div
        onClick={onClick}
        className={`block ${
          isSelected && isEditing
            ? "bg-gray-100 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            : "hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
        } transition duration-150 ease-in-out`}
      >
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1 flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full"
                src={repo.imageUrl}
                alt=""
              />
            </div>
            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <div
                  className={`text-sm leading-5 ${
                    isSelected && isEditing ? "font-bold" : "font-medium"
                  } text-indigo-600 truncate`}
                >
                  {repo.full_name}
                </div>
                <div
                  className={`mt-2 flex items-center text-sm leading-5 ${
                    isSelected && isEditing
                      ? "text-gray-800 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {repo.isPrivate && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-orange-100 text-orange-800">
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="-ml-0.5 mr-1.5 h-3 w-3 text-orange-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Private Repo
                    </span>
                  )}
                  &nbsp;
                  {repo.description && (
                    <>
                      {isSelected && isEditing ? (
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                          ></path>
                        </svg>
                      )}
                    </>
                  )}
                  <span className="truncate">{repo.description}</span>
                </div>
              </div>
              <div className="hidden md:block">
                <div>
                  <div className="text-sm leading-5 text-gray-900">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${classColors(
                        repo.primaryLanguage
                      )}`}
                    >
                      {repo.primaryLanguage}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    {repo.stargazers} Stargazers
                  </div>
                </div>
              </div>
            </div>
            {isSelected && isEditing ? (
              <div>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
};

const MUTATION_SELECT_REPOS = gql`
  mutation($repos: [String!]!) {
    selectRepos(repos: $repos) {
      success
      errors
    }
  }
`;

const RepoSelectionPage = ({ repos, selected, editMode, firstTime }) => {
  const history = useHistory();
  const [mutError, setMutError] = useState(null);

  var selectedIndexes = [];

  if (selected.length > 0) {
    selectedIndexes = selected.map((repo) => Object.keys(repos).indexOf(repo));
  }

  const [selectedPositions, setSelectedPositions] = useState(selectedIndexes);

  const [selectRepos, { loading: mutationLoading }] = useMutation(
    MUTATION_SELECT_REPOS,
    {
      onCompleted: (data) => {
        if (data.selectRepos.success) {
          history.go();
        } else {
          setMutError(data.selectRepos.errors[0]);
        }
      },
      onError: (err) => setMutError(err),
    }
  );

  const toggleSelection = (i) => {
    if (editMode) {
      if (selectedPositions.includes(i)) {
        setSelectedPositions(selectedPositions.filter((m) => m !== i));
      } else {
        if (selectedPositions.length === 5) {
          alert("Sorry, no more selections allowed.");
        } else {
          setSelectedPositions([...selectedPositions, i]);
        }
      }
    }
  };

  const submit = () => {
    const arr = [];
    selectedPositions.forEach((i) => {
      arr.push(repos[Object.keys(repos)[i]].full_name);
    });
    selectRepos({
      variables: { repos: arr },
    });
  };

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
      {editMode && firstTime ? (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div>
              <p className="text-sm leading-5 text-blue-700">
                Hi! Let's just start with selecting 5 repositories that you want
                to showcase. Be sure to select the ones that really reflect your
                work and skills!
              </p>
            </div>
          </div>
        </div>
      ) : null}
      {editMode ? (
        <div className="bg-white px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
            <div className="ml-4 mt-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Select 5 repositories
              </h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              {selectedPositions.length > 0 ? (
                <span className="inline-flex rounded-md shadow-sm mr-2">
                  <button
                    onClick={() => setSelectedPositions([])}
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                  >
                    Unselect all
                  </button>
                </span>
              ) : null}
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => submit()}
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition ease-in-out duration-150"
                >
                  {mutationLoading ? (
                    <PulseLoader size="10px" color="#ffffff" />
                  ) : (
                    "Proceed"
                  )}
                </button>
              </span>
            </div>
          </div>
        </div>
      ) : null}
      <ul className="rounded-md text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
        {repos &&
          // eslint-disable-next-line array-callback-return
          Object.keys(repos).map((repo, i) => {
            if (!editMode && selectedPositions.includes(i)) {
              return (
                <IndividualRepo
                  key={i}
                  index={i}
                  repo={repos[repo]}
                  isSelected={selectedPositions.includes(i)}
                  isEditing={editMode}
                  onClick={() => toggleSelection(i)}
                />
              );
            } else if (editMode) {
              return (
                <IndividualRepo
                  key={i}
                  index={i}
                  repo={repos[repo]}
                  isSelected={selectedPositions.includes(i)}
                  isEditing={editMode}
                  onClick={() => toggleSelection(i)}
                />
              );
            }
          })}
      </ul>
    </div>
  );
};

export default RepoSelectionPage;
