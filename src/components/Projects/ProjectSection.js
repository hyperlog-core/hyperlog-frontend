import React, { useState } from "react";
import Portal from "../../Portal";
import NewProject from "./NewProject";

const ProjectSection = () => {
  const [newProjectOpen, setNewProjectOpen] = useState(false);

  return (
    <div>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Projects
          </h3>
          <p className="mt-2 max-w-4xl text-sm text-gray-500">
            Showcase the work that you've done to the world.
          </p>
        </div>

        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:shadow-outline-teal transition duration-150 ease-in-out"
            onClick={() => setNewProjectOpen(true)}
          >
            Create new project
          </button>
        </div>
      </div>

      <Portal>
        <NewProject isOpen={newProjectOpen} setIsOpen={setNewProjectOpen} />
      </Portal>
    </div>
  );
};

export default ProjectSection;
