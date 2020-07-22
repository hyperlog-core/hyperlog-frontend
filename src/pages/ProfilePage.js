import React, { useState } from "react";
import UserLayout from "../layout/UserLayout";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useFormik } from "formik";
import * as Yup from "yup";
import DeleteConfirm from "../components/DeleteConfirm";
import Notification from "../components/Notification";
import Portal from "../Portal";

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

const MUTATION_UPDATE_USER_PASSWORD = gql`
  mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(new: $newPassword, old: $oldPassword) {
      success
      errors
    }
  }
`;

const ProfilePage = () => {
  const history = useHistory();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [notification, setNotification] = useState(false);

  const [
    updateUser,
    { loading: mutationLoading, data: mutationData },
  ] = useMutation(MUTATION_UPDATE_USER_INFO, {
    onCompleted(data) {
      if (data.updateUser.success) {
        setNotification(true);
      }
    },
  });

  const [
    updatePassword,
    { loading: passwordLoading, data: passwordData },
  ] = useMutation(MUTATION_UPDATE_USER_PASSWORD, {
    onCompleted(data) {
      if (data.updatePassword.success) {
        setNotification(true);
      }
    },
  });

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

  const passFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Required"),
      newPasswod: Yup.string().min(8),
      confirmNewPassword: Yup.string().when("newPassword", {
        is: (val) => val && val.length > 0,
        then: Yup.string()
          .oneOf([Yup.ref("newPassword")], "Both passwords need to be the same")
          .required(),
      }),
    }),
    onSubmit: (values) => {
      updatePassword({
        variables: values,
      });
      passFormik.resetForm();
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
      <Notification show={notification} toggle={setNotification} />
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
                Change Password
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                It is ideal to change the password every 30 days.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={passFormik.handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  {passwordData &&
                  !passwordLoading &&
                  passwordData.updatePassword.errors ? (
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
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="oldPassword"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Old Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          id="oldPassword"
                          type="password"
                          value={passFormik.values.oldPassword}
                          onChange={passFormik.handleChange}
                          onBlur={passFormik.handleBlur}
                          className={`mt-1 form-input block w-full py-2 px-3 border ${
                            passFormik.touched.oldPassword &&
                            passFormik.errors.oldPassword
                              ? `border-red-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-red focus:border-red-300 text-red-900 placeholder-red-300`
                              : `border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300`
                          } transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                        />
                        {passFormik.touched.oldPassword &&
                        passFormik.errors.oldPassword ? (
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
                      {passFormik.touched.oldPassword &&
                      passFormik.errors.oldPassword ? (
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {passFormik.errors.oldPassword}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        New Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          id="newPassword"
                          type="password"
                          value={passFormik.values.newPassword}
                          onChange={passFormik.handleChange}
                          onBlur={passFormik.handleBlur}
                          className={`mt-1 form-input block w-full py-2 px-3 border ${
                            passFormik.touched.newPassword &&
                            passFormik.errors.newPassword
                              ? `border-red-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-red focus:border-red-300 text-red-900 placeholder-red-300`
                              : `border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300`
                          } transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                        />
                        {passFormik.touched.newPassword &&
                        passFormik.errors.newPassword ? (
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
                      {passFormik.touched.newPassword &&
                      passFormik.errors.newPassword ? (
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {passFormik.errors.newPassword}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="confirmNewPassword"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Confirm New Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          id="confirmNewPassword"
                          type="password"
                          value={passFormik.values.confirmNewPassword}
                          onChange={passFormik.handleChange}
                          onBlur={passFormik.handleBlur}
                          className={`mt-1 form-input block w-full py-2 px-3 border ${
                            passFormik.touched.confirmNewPassword &&
                            passFormik.errors.confirmNewPassword
                              ? `border-red-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-red focus:border-red-300 text-red-900 placeholder-red-300`
                              : `border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300`
                          } transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                        />
                        {passFormik.touched.confirmNewPassword &&
                        passFormik.errors.confirmNewPassword ? (
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
                      {passFormik.touched.confirmNewPassword &&
                      passFormik.errors.confirmNewPassword ? (
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {passFormik.errors.confirmNewPassword}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out"
                  >
                    {passwordLoading ? (
                      <PulseLoader size="8px" color="#ffffff" />
                    ) : (
                      "Update password"
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
                    onClick={() => setConfirmDelete(true)}
                  >
                    Delete account
                  </button>
                </div>
              </div>
            </div>
            <Portal>
              <DeleteConfirm
                isOpen={confirmDelete}
                confirm={setConfirmDelete}
              />
            </Portal>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ProfilePage;
