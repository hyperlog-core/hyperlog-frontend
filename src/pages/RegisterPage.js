import React, { useState } from "react";
import logo from "../logo.svg";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import PulseLoader from "react-spinners/PulseLoader";
import { loginUser } from "../utils/auth";
import GitHubLogin from "react-github-login";

const RegisterPage = () => {
  let history = useHistory();

  const MUTATION_USER_REGISTRATION = gql`
    mutation(
      $email: String!
      $f_name: String!
      $l_name: String!
      $password: String!
      $username: String!
    ) {
      register(
        email: $email
        firstName: $f_name
        lastName: $l_name
        password: $password
        username: $username
      ) {
        success
        errors
        login {
          token
          user {
            id
            email
            firstName
            lastName
            profiles {
              id
            }
          }
        }
      }
    }
  `;

  const MUTATION_VALIDATE_EMAIL = gql`
    mutation($email: String!) {
      isEmailValid(email: $email) {
        success
        errors
      }
    }
  `;

  const MUTATION_VALIDATE_USERNAME = gql`
    mutation($username: String!) {
      isUsernameValid(username: $username) {
        success
        errors
      }
    }
  `;

  const MUTATION_LOGIN_GITHUB = gql`
    mutation($code: String!) {
      loginWithGithub(code: $code) {
        success
        errors
        token
        user {
          id
          email
          firstName
          lastName
          newUser
          username
          profiles {
            id
          }
        }
      }
    }
  `;

  const [
    registerUser,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation(MUTATION_USER_REGISTRATION, {
    onCompleted: (data) => {
      loginUser(data.register.login.token, data.register.login.user, false);
      history.push("/dashboard");
    },
    onError: (err) => console.log(err),
  });

  const [error, setError] = useState(false);

  const [loginWithGithub, { loading: ghLoading }] = useMutation(
    MUTATION_LOGIN_GITHUB,
    {
      onCompleted: (data) => {
        if (data.loginWithGithub.success) {
          loginUser(
            data.loginWithGithub.token,
            data.loginWithGithub.user,
            false
          );
          history.push("/dashboard");
        } else {
          setError(true);
        }
      },
      onError: (err) => console.log(err),
    }
  );

  const [
    validateEmail,
    {
      loading: emailValidationLoading,
      error: emailValidationError,
      data: emailValidationData,
    },
  ] = useMutation(MUTATION_VALIDATE_EMAIL, {
    onError: (err) => console.log(err),
  });

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

  const NORMAL_INPUT_CLASS =
    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5";
  const ERROR_INPUT_CLASS =
    "appearance-none block w-full px-3 py-2 border border-red-300 rounded-md text-red-900 placeholder-red-300  focus:outline-none focus:border-red-300 focus:shadow-outline-red transition duration-150 ease-in-out sm:text-sm sm:leading-5";

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(20).required("Required"),
      lastName: Yup.string().max(20).required("Required"),
      username: Yup.string().max(15).required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .required("Required")
        .when("password", {
          is: (val) => val && val.length > 0,
          then: Yup.string()
            .oneOf([Yup.ref("password")], "Both passwords need to be the same")
            .required("Required"),
        }),
      email: Yup.string().email("Invalid Email Provided").required("Required"),
    }),
    onSubmit: (values) => {
      registerUser({
        variables: {
          email: values.email,
          f_name: values.firstName,
          l_name: values.lastName,
          password: values.password,
          username: values.username,
        },
      });
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src={logo} alt="Hyperlog" />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create a new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <div>
              {error && (
                <div class="rounded-md bg-red-50 p-4 mb-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg
                        class="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm leading-5 font-normal text-red-800">
                        Login with your password and associate the account with
                        GitHub.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <span class="w-full inline-flex rounded-md shadow-sm">
                <GitHubLogin
                  clientId="42782b0ad960d7bae699"
                  redirectUri=""
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                  onSuccess={(data) =>
                    loginWithGithub({ variables: { code: data["code"] } })
                  }
                  onFailure={(e) => console.log(e)}
                  children={
                    ghLoading ? (
                      <PulseLoader size="10px" />
                    ) : (
                      <>
                        <svg
                          className="-ml-1 mr-3 w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Login with Github
                      </>
                    )
                  }
                />
              </span>
            </div>

            <div class="mt-6 relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm leading-5">
                <span class="px-2 bg-white text-gray-500">
                  Or do manual labour
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            {mutationError ? (
              <div className="rounded-md bg-red-50 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm leading-5 font-medium text-red-800">
                      Invalid Credentials Provided
                    </h3>
                  </div>
                </div>
              </div>
            ) : null}

            {mutationData && mutationData.register.errors ? (
              <div className="rounded-md bg-red-50 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm leading-5 font-medium text-red-800">
                      There were {mutationData.register.errors.length} errors
                      with your submission
                    </h3>
                    <div className="mt-2 text-sm leading-5 text-red-700">
                      <ul className="list-disc pl-5">
                        {mutationData.register.errors.forEach((err) => (
                          <li className="mt-1">{err}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <form onSubmit={formik.handleSubmit}>
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
                    type="email"
                    required
                    onChange={formik.handleChange}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      validateEmail({
                        variables: { email: e.currentTarget.value },
                      });
                    }}
                    value={formik.values.email}
                    className={
                      (formik.touched.email && formik.errors.email) ||
                      (emailValidationData &&
                        !emailValidationData.isEmailValid.success)
                        ? ERROR_INPUT_CLASS
                        : NORMAL_INPUT_CLASS
                    }
                  />
                  {emailValidationLoading && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <PulseLoader size="10px" />
                    </div>
                  )}
                  {emailValidationData &&
                    emailValidationData.isEmailValid.success && (
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
                  {(formik.touched.email && formik.errors.email) ||
                  (emailValidationData &&
                    !emailValidationData.isEmailValid.success) ? (
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
                {(formik.touched.email && formik.errors.email) ||
                (emailValidationData &&
                  (!emailValidationData.isEmailValid.success ||
                    emailValidationError)) ? (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    {formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : emailValidationData.isEmailValid.errors}
                  </p>
                ) : null}
              </div>

              <div className="mt-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1 rounded-md shadow-sm flex">
                  <div className="w-1/2 relative flex-1 min-w-0">
                    <input
                      placeholder="First Name"
                      id="firstName"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      aria-label="First Name"
                      className={
                        formik.touched.firstName && formik.errors.firstName
                          ? "appearance-none relative px-3 py-2 block w-full rounded-none rounded-bl-md rounded-tl-md border border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:border-red-300 focus:shadow-outline-red transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          : "appearance-none relative px-3 py-2 block w-full rounded-none rounded-bl-md rounded-tl-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      }
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
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
                  <div className="-ml-px relative flex-1 min-w-0">
                    <input
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                      aria-label="Last Name"
                      className={
                        formik.touched.firstName && formik.errors.firstName
                          ? "appearance-none relative px-3 py-2 block w-full rounded-none rounded-br-md rounded-tr-md border border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:border-red-300 focus:shadow-outline-red transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          : "appearance-none relative px-3 py-2 block w-full rounded-none rounded-br-md rounded-tr-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      }
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
              </div>

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
                    onBlur={(e) => {
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
                  <p className="mt-2 text-sm text-red-600" id="username-error">
                    {formik.touched.username && formik.errors.username
                      ? formik.errors.username
                      : usernameValidationData.isUsernameValid.errors}
                  </p>
                ) : null}
              </div>

              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    type="password"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={
                      formik.touched.password && formik.errors.password
                        ? ERROR_INPUT_CLASS
                        : NORMAL_INPUT_CLASS
                    }
                  />
                  {formik.touched.password && formik.errors.password ? (
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
                {formik.touched.password && formik.errors.password ? (
                  <p className="mt-2 text-sm text-red-600" id="password-error">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>

              <div className="mt-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    className={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? ERROR_INPUT_CLASS
                        : NORMAL_INPUT_CLASS
                    }
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
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
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <p className="mt-2 text-sm text-red-600" id="password-error">
                    {formik.errors.confirmPassword}
                  </p>
                ) : null}
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    {mutationLoading ? (
                      <PulseLoader size="10px" color="#ffffff" />
                    ) : (
                      "Register"
                    )}
                  </button>
                </span>
              </div>
            </form>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm leading-5">
                <span className="px-2 bg-white text-gray-500">
                  Already have an Account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <Link
                  to="/login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-50 focus:outline-none focus:border-gray-300 focus:shadow-outline-gray active:bg-gray-200 transition ease-in-out duration-150"
                >
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
