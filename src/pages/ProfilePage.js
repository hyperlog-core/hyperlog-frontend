import React from "react";
import UserLayout from "../layout/UserLayout";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useFormik } from "formik";
import * as Yup from "yup";

const GET_CURRENT_USER_QUERY = gql`
  query {
    thisUser {
      firstName
      lastName
      email
    }
  }
`;

const MUTATION_UPDATE_USER_INFO = gql`
  mutation UpdateUser($email: String!, $firstName: String, $lastName: String) {
    updateUser(email: $email, firstName: $firstName, lastName: $lastName) {
      success
      errors
    }
  }
`;

const ProfilePage = () => {
  const history = useHistory();

  const [
    updateUser,
    { loading: mutationLoading, data: mutationData },
  ] = useMutation(MUTATION_UPDATE_USER_INFO);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(20).required("Required"),
      lastName: Yup.string().max(20).required("Required"),
      email: Yup.string().email("Invalid Email Provided").required("Required"),
    }),
    onSubmit: (values) => {
      updateUser({
        variables: values,
      });
    },
  });

  const { loading } = useQuery(GET_CURRENT_USER_QUERY, {
    onCompleted: (data) => {
      formik.setValues(data.thisUser);
    },
    onError: (_err) => history.push("/error"),
  });

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <UserLayout header={`Profile`}>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile Information
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Submit original profile information for best experience.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={formik.handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  {mutationData && !mutationLoading && mutationData.errors ? (
                    <div className="rounded-md bg-red-50 p-4 mb-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-red-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm leading-5 font-medium text-red-800">
                            Please check all the details you've submitted.
                          </h3>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium leading-5 text-gray-700"
                        >
                          First name
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            id="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`mt-1 form-input block w-full py-2 px-3 border ${
                              formik.touched.firstName &&
                              formik.errors.firstName
                                ? `border-red-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-red focus:border-red-300 text-red-900 placeholder-red-300`
                                : `border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300`
                            }  transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                          />
                          {formik.touched.firstName &&
                          formik.errors.firstName ? (
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
                      </div>
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="firstName-error"
                        >
                          {formik.errors.firstName}
                        </p>
                      ) : null}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium leading-5 text-gray-700"
                        >
                          Last name
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            id="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`mt-1 form-input block w-full py-2 px-3 border ${
                              formik.touched.lastName && formik.errors.lastName
                                ? `border-red-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-red focus:border-red-300 text-red-900 placeholder-red-300`
                                : `border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300`
                            } transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                          />
                          {formik.touched.lastName && formik.errors.lastName ? (
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
                      </div>
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="lastName-error"
                        >
                          {formik.errors.lastName}
                        </p>
                      ) : null}
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-5 text-gray-700"
                        >
                          Email address
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`mt-1 form-input block w-full py-2 px-3 border ${
                              formik.touched.email && formik.errors.email
                                ? `border-red-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-red focus:border-red-300 text-red-900 placeholder-red-300`
                                : `border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300`
                            } transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                          />
                          {formik.touched.email && formik.errors.email ? (
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
                        {formik.touched.email && formik.errors.email ? (
                          <p
                            className="mt-2 text-sm text-red-600"
                            id="email-error"
                          >
                            {formik.errors.email}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out"
                  >
                    {mutationLoading ? (
                      <PulseLoader size="8px" color="#ffffff" />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="py-5">
          <div className="border-t border-gray-200"> </div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Notifications
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Decide which communications you 'd like to receive and how.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <fieldset>
                    <legend className="text-base leading-6 font-medium text-gray-900">
                      By Email
                    </legend>
                    <div className="mt-4">
                      <div className="flex items-start">
                        <div className="absolute flex items-center h-5">
                          <input
                            id="comments"
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          />
                        </div>
                        <div className="pl-7 text-sm leading-5">
                          <label
                            htmlFor="comments"
                            className="font-medium text-gray-700"
                          >
                            Comments
                          </label>
                          <p className="text-gray-500">
                            Get notified when someones posts a comment on a
                            posting.
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-start">
                          <div className="absolute flex items-center h-5">
                            <input
                              id="candidates"
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            />
                          </div>
                          <div className="pl-7 text-sm leading-5">
                            <label
                              htmlFor="candidates"
                              className="font-medium text-gray-700"
                            >
                              Candidates
                            </label>
                            <p className="text-gray-500">
                              Get notified when a candidate applies for a job.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-start">
                          <div className="absolute flex items-center h-5">
                            <input
                              id="offers"
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            />
                          </div>
                          <div className="pl-7 text-sm leading-5">
                            <label
                              htmlFor="offers"
                              className="font-medium text-gray-700"
                            >
                              Offers
                            </label>
                            <p className="text-gray-500">
                              Get notified when a candidate accepts or rejects
                              an offer.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue focus:bg-indigo-500 active:bg-indigo-600 transition duration-150 ease-in-out">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="py-5">
          <div className="border-t border-gray-200"> </div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Danger Zone
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Please feel free to drop any feedback you have.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Delete your account
                </h3>
                <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                  <p>
                    Once you delete your account, you will lose all data
                    associated with it.
                  </p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Delete account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ProfilePage;
