import React from "react";
import Transition from "../helpers/Transition";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import PulseLoader from "react-spinners/PulseLoader";

const SetUsernameModal = ({ isOpen, username }) => {
  const MUTATION_VALIDATE_USERNAME = gql`
    mutation($username: String!) {
      isUsernameValid(username: $username) {
        success
        errors
      }
    }
  `;

  const MUTATION_CHANGE_USERNAME = gql`
    mutation($username: String!) {
      changeUsername(new: $username) {
        success
        errors
      }
    }
  `;

  const NORMAL_INPUT_CLASS =
    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5";
  const ERROR_INPUT_CLASS =
    "appearance-none block w-full px-3 py-2 border border-red-300 rounded-md text-red-900 placeholder-red-300  focus:outline-none focus:border-red-300 focus:shadow-outline-red transition duration-150 ease-in-out sm:text-sm sm:leading-5";

  const [
    validateUsername,
    {
      loading: usernameValidationLoading,
      error: usernameValidationError,
      data: usernameValidationData,
    },
  ] = useMutation(MUTATION_VALIDATE_USERNAME, {
    onError: (err) => console.log(err),
  });

  const [changeUsername] = useMutation(MUTATION_CHANGE_USERNAME, {
    onError: (err) => console.log(err),
  });

  const formik = useFormik({
    initialValues: {
      username,
    },
    validationSchema: Yup.object({
      username: Yup.string().max(15).required("Required"),
    }),
    onSubmit: (values) => {
      changeUsername({
        variables: values,
      });
    },
  });

  return (
    <div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
      <Transition
        show={isOpen}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
      </Transition>

      <Transition
        show={isOpen}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="text-center">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Set New Username
                </h3>
                <div className="mt-2">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm leading-5 text-yellow-700">
                          You cannot change username later.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlhtmlFor="username"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Username
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="username"
                        type="text"
                        required
                        onChange={formik.handleChange}
                        onKeyPress={(e) => {
                          formik.handleBlur(e);
                          validateUsername({
                            variables: { username: e.currentTarget.value },
                          });
                        }}
                        value={formik.values.username}
                        className={
                          (formik.touched.username && formik.errors.username) ||
                          (usernameValidationData &&
                            !usernameValidationData.isUsernameValid.success)
                            ? ERROR_INPUT_CLASS
                            : NORMAL_INPUT_CLASS
                        }
                      />
                      {usernameValidationLoading && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <PulseLoader size="10px" />
                        </div>
                      )}
                      {usernameValidationData &&
                        usernameValidationData.isUsernameValid.success && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-5 w-5 text-green-500"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        )}
                      {(formik.touched.username && formik.errors.username) ||
                      (usernameValidationData &&
                        (!usernameValidationData.isUsernameValid.success ||
                          usernameValidationError)) ? (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : null}
                    </div>
                    {(formik.touched.username && formik.errors.username) ||
                    (usernameValidationData &&
                      !usernameValidationData.isUsernameValid.success) ? (
                      <p
                        className="mt-2 text-sm text-red-600"
                        id="username-error"
                      >
                        {formik.touched.username && formik.errors.username
                          ? formik.errors.username
                          : usernameValidationData.isUsernameValid.errors}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <span className="flex w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  disabled={
                    (usernameValidationData &&
                      !usernameValidationData.isUsernameValid.success) ||
                    formik.errors.username
                      ? true
                      : false
                  }
                  className={`inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm ${
                    (usernameValidationData &&
                      !usernameValidationData.isUsernameValid.success) ||
                    formik.errors.username
                      ? "bg-indigo-400 cursor-default"
                      : "bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  }`}
                >
                  Set Username
                </button>
              </span>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  );
};

export default SetUsernameModal;
