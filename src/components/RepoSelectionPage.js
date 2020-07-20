import React, { useState } from "react";

const IndividualRepo = ({ isSelected, index, repo, onClick }) => {
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
        class={`block ${
          isSelected
            ? "bg-gray-100 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            : "hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
        } transition duration-150 ease-in-out`}
      >
        <div class="flex items-center px-4 py-4 sm:px-6">
          <div class="min-w-0 flex-1 flex items-center">
            <div class="flex-shrink-0">
              <img class="h-12 w-12 rounded-full" src={repo.imageUrl} alt="" />
            </div>
            <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <div
                  class={`text-sm leading-5 ${
                    isSelected ? "font-bold" : "font-medium"
                  } text-indigo-600 truncate`}
                >
                  {repo.full_name}
                </div>
                {repo.description ? (
                  <div
                    class={`mt-2 flex items-center text-sm leading-5 ${
                      isSelected ? "text-gray-800 font-medium" : "text-gray-500"
                    }`}
                  >
                    <svg
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="truncate">{repo.description}</span>
                  </div>
                ) : null}
              </div>
              <div class="hidden md:block">
                <div>
                  <div class="text-sm leading-5 text-gray-900">
                    <span
                      class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${classColors(
                        repo.primaryLanguage
                      )}`}
                    >
                      {repo.primaryLanguage}
                    </span>
                  </div>
                  <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    {repo.stargazers} Stargazers
                  </div>
                </div>
              </div>
            </div>
            {isSelected ? (
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

const RepoSelectionPage = ({ repos }) => {
  const [selectedPositions, setSelectedPositions] = useState([]);

  const toggleSelection = (i) => {
    if (selectedPositions.includes(i)) {
      setSelectedPositions(selectedPositions.filter((m) => m !== i));
    } else {
      if (selectedPositions.length === 5) {
        alert("Sorry, no more selections allowed.");
      } else {
        setSelectedPositions([...selectedPositions, i]);
      }
    }
  };

  console.log(repos);

  return (
    <ul className="rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
      {Object.keys(repos).map((repo, i) => {
        return (
          <IndividualRepo
            key={i}
            index={i}
            repo={repos[repo]}
            isSelected={selectedPositions.includes(i)}
            onClick={() => toggleSelection(i)}
          />
        );
      })}
    </ul>
  );
};

export default RepoSelectionPage;
