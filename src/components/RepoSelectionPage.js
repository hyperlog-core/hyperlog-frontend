import React, { useState } from "react";

const IndividualRepo = ({ isSelected, repo }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${
        isHovered ? "text-white bg-indigo-600" : "text-gray-900"
      } cursor-default select-none relative py-2 pl-3 pr-9`}
    >
      <div className="flex items-center space-x-3">
        <img
          src={repo.imageUrl}
          alt=""
          className="flex-shrink-0 h-6 w-6 rounded-full"
        />
        <span
          className={`${
            isSelected ? "font-semibold" : "font-normal"
          } block truncate`}
        >
          {repo.full_name}
        </span>
      </div>

      {isSelected ? (
        <span
          className={`${
            isHovered ? "text-white" : "text-indigo-600"
          } absolute inset-y-0 right-0 flex items-center pr-4`}
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      ) : null}
    </li>
  );
};

const RepoSelectionPage = ({ repos }) => {
  const [selectedPositions, setSelectedPositions] = useState([]);

  console.log(repos);

  return (
    <ul className="rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
      {Object.keys(repos).map((repo, i) => {
        return (
          <IndividualRepo
            key={i}
            repo={repos[repo]}
            isSelected={selectedPositions.includes(i)}
          />
        );
      })}
    </ul>
  );
};

export default RepoSelectionPage;
