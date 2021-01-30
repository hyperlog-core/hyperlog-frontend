import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import Portal from "../../Portal";
import NewProject from "./NewProject";

const GET_ALL_PROJECTS = gql`
  {
    projects {
      slug
      name
      repos {
        id
        fullName
      }
      tagline
      description
      icon
    }
  }
`;

const ProjectList = () => {
  const [editProject, setEditProject] = useState(false);
  const [project, setProject] = useState(null);
  const { loading, data: projects, refetch } = useQuery(GET_ALL_PROJECTS);

  if (loading) {
    return (
      <div className="flex w-full h-64 justify-center items-center">
        <PulseLoader size="20px" color="#374151" />
      </div>
    );
  }
  return (
    <div class="bg-white shadow overflow-hidden sm:rounded-md mt-4">
      <ul class="divide-y divide-gray-200">
        {projects.projects.map((project) => (
          <li>
            <div
              class="block hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                setProject(project);
                setEditProject(true);
              }}
            >
              <div class="px-4 py-4 flex items-center sm:px-6">
                <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <div class="flex text-sm font-medium text-teal-600 truncate">
                      <p>{project.name}</p>
                    </div>
                    <div class="mt-2 flex">
                      <div class="flex items-center text-sm text-gray-500">
                        <p>{project.tagline}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ml-5 flex-shrink-0">
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Portal>
        <NewProject
          isOpen={editProject}
          setIsOpen={setEditProject}
          project={project}
          setProject={setProject}
          refetch={refetch}
        />
      </Portal>
    </div>
  );
};

export default ProjectList;
