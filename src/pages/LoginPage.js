import React, { useState } from "react";
import logo from "../logo.svg";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { loginUser } from "../utils/auth";
import PulseLoader from "react-spinners/PulseLoader";
import GitHubLogin from "react-github-login";
import Portal from "../Portal";
import ForgotPass from "../components/ForgotPass";
import Notification from "../components/Notification";

const LoginPage = () => {
  const MUTATION_LOGIN_USER = gql`
    mutation($username: String!, $password: String!) {
      login(username: $username, password: $password) {
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

  const [error, setError] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [notification, setNotification] = useState(false);

  let history = useHistory();
  const [
    userLogin,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(MUTATION_LOGIN_USER, {
    onCompleted: (data) => {
      loginUser(data.login.token, data.login.user, formik.values.remember);
      history.push("/home");
    },
    onError: (err) => console.log(err),
  });

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
          history.push("/home");
        } else {
          setError(true);
        }
      },
      onError: (err) => console.log(err),
    }
  );

  const NORMAL_INPUT_CLASS =
    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5";
  const ERROR_INPUT_CLASS =
    "appearance-none block w-full px-3 py-2 border border-red-300 rounded-md text-red-900 placeholder-red-300 focus:outline-none focus:border-red-300 focus:shadow-outline-red transition duration-150 ease-in-out sm:text-sm sm:leading-5";

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      remember: Yup.boolean(),
    }),
    onSubmit: (values) => {
      userLogin({
        variables: { username: values.username, password: values.password },
      });
    },
  });

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div>
            <img className="h-12 w-auto" src={logo} alt="Hyperlog" />
            <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8">
            <div>
              <div>
                {error && (
                  <div className="rounded-md bg-red-50 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-400"
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
                      <div className="ml-3">
                        <p className="text-sm leading-5 font-normal text-red-800">
                          Login with your password and associate the account
                          with GitHub.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <span className="w-full inline-flex rounded-md shadow-sm">
                  <GitHubLogin
                    clientId={process.env.REACT_APP_GITHUB_AUTH_APP_ID}
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

              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm leading-5">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
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
                          fill-rule="evenodd"
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
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <label
                    htmlhtmlFor="username"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      onBlur={formik.handleBlur}
                      required
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
                      {formik.errors.username}
                    </p>
                  ) : null}
                </div>

                <div className="mt-6">
                  <label
                    htmlhtmlFor="password"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="password"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      required
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
                    <p
                      className="mt-2 text-sm text-red-600"
                      id="password-error"
                    >
                      {formik.errors.password}
                    </p>
                  ) : null}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      checked={formik.values.remember}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      htmlhtmlFor="remember"
                      className="ml-2 block text-sm leading-5 text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm leading-5">
                    <button
                      onClick={() => setForgotPass(true)}
                      className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out"
                    >
                      {mutationLoading ? (
                        <PulseLoader color="#ffffff" size="10px" />
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </span>
                </div>
              </form>

              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm leading-5">
                  <span className="px-2 bg-white text-gray-500">
                    Not a Member Yet?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <Link
                    to="/"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-50 focus:outline-none focus:border-gray-300 focus:shadow-outline-gray active:bg-gray-200 transition ease-in-out duration-150"
                  >
                    Register
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1528660544347-95a93c58e424?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=steve-halama-Yhc7YGZlz3g-unsplash.jpg&w=1920"
          alt=""
        />
      </div>
      <Portal>
        <ForgotPass
          isOpen={forgotPass}
          setIsOpen={setForgotPass}
          showNotification={setNotification}
        />
        <Notification
          primaryText="Link sent to registered email"
          secondaryText="We've successfully sent the mail to your registered mail. Please check all folders."
          show={notification}
          toggle={setNotification}
        />
      </Portal>
    </div>
  );
};

export default LoginPage;
