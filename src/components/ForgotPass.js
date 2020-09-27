import React from "react";
import Transition from "../helpers/Transition";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";

const ForgotPass = ({ isOpen, setIsOpen, showNotification }) => {
  const MUTATION_RESET_PASSWORD = gql`
    mutation($username: String!) {
      sendResetPasswordMail(username: $username) {
        success
        errors
      }
    }
  `;

  const NORMAL_INPUT_CLASS =
    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5";
  const ERROR_INPUT_CLASS =
    "appearance-none block w-full px-3 py-2 border border-red-300 rounded-md text-red-900 placeholder-red-300  focus:outline-none focus:border-red-300 focus:shadow-outline-red transition duration-150 ease-in-out sm:text-sm sm:leading-5";

  const [resetPassword] = useMutation(MUTATION_RESET_PASSWORD, {
    onCompleted: () => {
      setIsOpen(false);
      showNotification(true);
    },
    onError: (err) => console.log(err),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(15).required("Required"),
    }),
    onSubmit: (values) => {
      resetPassword({
        variables: values,
      });
    },
  });

  return (
    <div
      className={
        isOpen
          ? "fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center"
          : ""
      }
    >
      <Transition
        show={isOpen}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 transition-opacity"
          onClick={() => setIsOpen(false)}
        >
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
                  Enter your username
                </h3>
                <div className="mt-2">
                  <div className="mt-6">
                    <label
                      htmlFor="username"
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
                        value={formik.values.username}
                        className={
                          formik.touched.username && formik.errors.username
                            ? ERROR_INPUT_CLASS
                            : NORMAL_INPUT_CLASS
                        }
                      />
                      {formik.touched.username && formik.errors.username ? (
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
                    {formik.touched.username && formik.errors.username ? (
                      <p
                        className="mt-2 text-sm text-red-600"
                        id="username-error"
                      >
                        {formik.touched.username && formik.errors.username
                          ? formik.errors.username
                          : ""}
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
                  className={`inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5`}
                >
                  Send Password Reset Mail
                </button>
              </span>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  );
};

export default ForgotPass;
