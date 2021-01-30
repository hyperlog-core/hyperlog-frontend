import { gql, useMutation } from "@apollo/client";
import { Transition } from "@headlessui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import ReposInput from "./ReposInput";
import MoonLoader from "react-spinners/MoonLoader";

const MUTATION_ADD_NEW_PROJECT = gql`
  mutation(
    $name: String!
    $description: String!
    $repos: [String!]!
    $tagline: String!
  ) {
    addProject(
      name: $name
      description: $description
      repos: $repos
      tagline: $tagline
    ) {
      project {
        slug
      }
      messages
    }
  }
`;

const NewProject = ({ isOpen, setIsOpen }) => {
  const ERROR_CLASS_INPUT =
    "block w-full shadow-sm sm:text-sm focus:ring-red-500 focus:border-red-500 border-red-300 rounded-md";
  const NORMAL_CLASS_INPUT =
    "block w-full shadow-sm sm:text-sm focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md";

  const [selectedRepos, setSelectedRepos] = useState([]);

  const [addNewProject, { loading }] = useMutation(MUTATION_ADD_NEW_PROJECT, {
    onCompleted: () => {
      setIsOpen(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      tagline: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      tagline: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (selectedRepos.length > 0) {
        console.log(selectedRepos);
        addNewProject({
          variables: {
            ...values,
            repos: selectedRepos,
          },
        });
      }
      return false;
    },
  });

  return (
    <Transition show={isOpen}>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            show={isOpen}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
          </Transition.Child>

          <section
            className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16"
            aria-labelledby="slide-over-heading"
          >
            <Transition.Child
              show={isOpen}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              {(ref) => (
                <div ref={ref} className="w-screen max-w-2xl">
                  <form
                    onSubmit={formik.handleSubmit}
                    className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll"
                  >
                    <div className="flex-1">
                      <div className="px-4 py-6 bg-gradient-to-br from-teal-600 to-teal-400 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <h2
                              id="slide-over-heading"
                              className="text-lg font-medium text-gray-100"
                            >
                              New project
                            </h2>
                            <p className="text-sm text-white">
                              Get started by filling in the information below to
                              create your new project.
                            </p>
                          </div>
                          <div className="h-7 flex items-center">
                            <button
                              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                        <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                          <div>
                            <label
                              for="name"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              Project name
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              onChange={formik.handleChange}
                              value={formik.values.name}
                              type="text"
                              name="name"
                              id="name"
                              className={
                                formik.errors.name && formik.touched.name
                                  ? ERROR_CLASS_INPUT
                                  : NORMAL_CLASS_INPUT
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                          <div>
                            <label
                              for="tagline"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              Tagline
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              onChange={formik.handleChange}
                              value={formik.values.tagline}
                              type="text"
                              name="tagline"
                              id="tagline"
                              className={
                                formik.errors.tagline && formik.touched.tagline
                                  ? ERROR_CLASS_INPUT
                                  : NORMAL_CLASS_INPUT
                              }
                            />
                          </div>
                        </div>

                        <ReposInput
                          selectedRepos={selectedRepos}
                          setSelectedRepos={setSelectedRepos}
                        />

                        <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                          <div>
                            <label
                              for="description"
                              className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                            >
                              Description
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <textarea
                              onChange={formik.handleChange}
                              value={formik.values.description}
                              id="description"
                              name="description"
                              rows="3"
                              className={
                                formik.errors.description &&
                                formik.touched.description
                                  ? ERROR_CLASS_INPUT
                                  : NORMAL_CLASS_INPUT
                              }
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                      <div className="space-x-3 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            formik.resetForm();
                            setSelectedRepos([]);
                            setIsOpen(false);
                          }}
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 focus:outline-none ${
                            selectedRepos.length !== 0
                              ? "hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                              : "opacity-50"
                          }`}
                        >
                          {!loading ? (
                            <>
                              <MoonLoader size="16px" color="#ffffff" />
                              &nbsp; Creating
                            </>
                          ) : (
                            "Create"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </Transition.Child>
          </section>
        </div>
      </div>
    </Transition>
  );
};

export default NewProject;
