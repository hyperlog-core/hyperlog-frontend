import { Listbox, Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { fetchUserRepositories } from "../../utils/fetchUserRepositories";

const ReposInput = ({ selectedRepos, setSelectedRepos }) => {
  const userStored = JSON.parse(localStorage.getItem("user"));
  const [repos, setRepos] = useState([]);
  const [repoFetched, setRepoFetched] = useState(false);
  useEffect(() => {
    if (!repoFetched) {
      fetchUserRepositories(userStored.profiles[0].accessToken, []).then(
        (data) => {
          setRepos(data);
          setRepoFetched(true);
        }
      );
    }
  });

  const handleSelectRepos = (repo) => {
    setSelectedRepos((oldRepos) => [...oldRepos, repo]);
  };

  const removeSelectedRepo = (repo) => {
    setSelectedRepos((oldRepos) => oldRepos.filter((item) => item !== repo));
  };

  return (
    <div>
      <Listbox
        as="div"
        className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5"
        value="Select Repos"
        onChange={handleSelectRepos}
      >
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
              Link Repositories
            </Listbox.Label>
            <div class="sm:col-span-2">
              <div className="relative">
                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
                  <span class="w-full inline-flex truncate">
                    <span className="block truncate">Select Repositories</span>
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Listbox.Button>
              </div>

              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute mt-1 w-auto rounded-md bg-white shadow-lg"
              >
                <Listbox.Options
                  static
                  className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                  {Object.keys(repos).map((repo) => {
                    if (selectedRepos.includes(repo)) return null;
                    return (
                      <Listbox.Option key={repo} value={repo}>
                        {({ active }) => (
                          <div
                            className={`${
                              active
                                ? "text-white bg-teal-600"
                                : "text-gray-900"
                            } cursor-default select-none relative py-2 pl-8 pr-4`}
                          >
                            <span className="font-normal block truncate">
                              {repo}
                            </span>
                          </div>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {repoFetched ? (
        <ul class="space-y-3 mx-3 mb-3">
          {selectedRepos.map((repo) => (
            <li class="bg-teal-50 border border-teal-400 overflow-hidden rounded-md px-6 py-4">
              <div class="flex-1 flex items-center justify-between rounded-r-md truncate">
                <div class="flex-1 px-4 py-2 text-sm truncate">
                  <span class="flex">
                    {repos[repo].isFork && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 mr-2"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="12" cy="18" r="2" />
                        <circle cx="7" cy="6" r="2" />
                        <circle cx="17" cy="6" r="2" />
                        <path d="M7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2v-2" />
                        <line x1="12" y1="12" x2="12" y2="16" />
                      </svg>
                    )}
                    {repos[repo].isPrivate && (
                      <svg
                        class="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        ></path>
                      </svg>
                    )}
                    <a
                      href={repos[repo].homepageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-gray-900 font-medium hover:text-gray-600"
                    >
                      {repos[repo].nameWithOwner}
                    </a>
                    {repos[repo].primaryLanguage && (
                      <span class="inline-flex items-center px-2.5 py-0.5 ml-2 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                        {repos[repo].primaryLanguage.name}
                      </span>
                    )}
                  </span>
                  <p class="text-gray-500">{repos[repo].description}</p>
                </div>
                <div class="flex-shrink-0 pr-2">
                  <button
                    class="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    onClick={() => removeSelectedRepo(repo)}
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div class="flex align-middle justify-center">
          <MoonLoader size="16px" color="#000" />
        </div>
      )}
    </div>
  );
};

export default ReposInput;
