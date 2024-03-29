import { gql, useMutation } from "@apollo/client";
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import PreviousStepButton from "../components/Buttons/PreviousStepButton";
import { PulseLoader } from "react-spinners";
import Notification from "../components/Notification";
import Portal from "../Portal";
import PhoneInput from "react-phone-input-2";

const MUTATION_SET_USER_DATA = gql`
  mutation(
    $twitter: String
    $devto: String
    $tagline: String!
    $github: String
    $linkedin: String
    $dribble: String
    $facebook: String
    $stackoverflow: String
    $address: String
    $email: String!
    $phone: String
  ) {
    setSocialLinks(
      twitter: $twitter
      devto: $devto
      dribble: $dribble
      github: $github
      linkedin: $linkedin
      stackoverflow: $stackoverflow
      facebook: $facebook
    ) {
      success
    }
    setTagline(tagline: $tagline) {
      success
    }
    addContactInfo(address: $address, email: $email, phone: $phone) {
      contactInfo {
        id
      }
    }
  }
`;

const MUTATION_NEXT_STEP = gql`
  mutation {
    nextSetupStep {
      new
    }
  }
`;

const ERROR_INPUT_CLASS =
  "form-input block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red sm:text-sm sm:leading-5";

const SetUserInfoStep = ({ setStep, user, dashboard }) => {
  const social = JSON.parse(user.socialLinks);
  const [nextStep, { loading }] = useMutation(MUTATION_NEXT_STEP, {
    onCompleted: (data) => {
      setStep(data.nextSetupStep.new);
    },
  });

  const [notifShow, setNotifShow] = useState(false);

  const [setUserData, { loading: mutationLoading }] = useMutation(
    MUTATION_SET_USER_DATA,
    {
      onCompleted: (data) => {
        if (
          data.setSocialLinks.success &&
          data.setTagline.success &&
          !dashboard
        ) {
          nextStep();
        } else if (dashboard) {
          setNotifShow(true);
        }
      },
      onError: (err) => console.log(err),
    }
  );

  const formik = useFormik({
    initialValues: {
      twitter: social.twitter ?? "",
      devto: social.devto ?? "",
      github: social.github ?? "",
      facebook: social.facebook ?? "",
      linkedin: social.linkedin ?? "",
      stackoverflow: social.stackoverflow ?? "",
      tagline: user.tagline ?? "",
      address: (user.contactInfo && user.contactInfo.address) ?? "",
      phone: (user.contactInfo && user.contactInfo.phone) ?? "",
      email: (user.contactInfo && user.contactInfo.email) ?? user.email,
      dribble: social.dribble ?? "",
    },
    validationSchema: Yup.object({
      twitter: Yup.string(),
      devto: Yup.string(),
      github: Yup.string(),
      facebook: Yup.string(),
      stackoverflow: Yup.number(),
      tagline: Yup.string().max(255).required(),
      address: Yup.string().min(10),
      email: Yup.string().email().required(),
      phone: Yup.string(),
      dribble: Yup.string(),
      linkedin: Yup.string(),
    }),
    onSubmit: (values) => {
      setUserData({
        variables: { ...values },
      });
    },
  });

  return (
    <div className={`${dashboard ? "" : "mt-5"} md:mt-0 md:col-span-2`}>
      <div
        className={`${
          dashboard ? "bg-white" : "bg-gray-100 shadow"
        } overflow-hidden sm:rounded-lg`}
      >
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                <span className="text-lg font-medium text-gray-800">
                  Personal Info
                </span>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label
                    htmlFor="tagline"
                    className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Tagline
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          id="tagline"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.tagline}
                          className={
                            formik.touched.tagline && formik.errors.tagline
                              ? ERROR_INPUT_CLASS
                              : "form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          }
                          placeholder="Developer by day, Batman by night"
                        />
                        {formik.touched.tagline && formik.errors.tagline ? (
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
                    {formik.touched.tagline && formik.errors.tagline ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        Come on, you gotta have the tagline
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Address
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          id="address"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.address}
                          className={
                            formik.touched.address && formik.errors.address
                              ? ERROR_INPUT_CLASS
                              : "form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          }
                          placeholder="Not compulsory"
                        />
                        {formik.touched.address && formik.errors.address ? (
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
                    {formik.touched.address && formik.errors.address ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        Please put down a proper address. You can also leave
                        this blank.
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Contact Email
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          id="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          className={
                            formik.touched.email && formik.errors.email
                              ? ERROR_INPUT_CLASS
                              : "form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          }
                          placeholder="Contact Email, ya know?"
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
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        Pff, you gotta have the contact email
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                      <div className="mt-1 relative rounded-md shadow-sm">
                        {/* <input
                          id="phone"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phone}
                          className={
                            formik.touched.phone && formik.errors.phone
                              ? ERROR_INPUT_CLASS
                              : "form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          }
                          placeholder="Again, not compulsory"
                        /> */}
                        <PhoneInput
                          inputProps={{
                            id: "phone",
                            name: "phone",
                          }}
                          onBlur={formik.handleBlur}
                          onChange={(_phoneNumber, _country, e) =>
                            formik.handleChange(e)
                          }
                          value={formik.values.phone}
                          placeholder="Again, not compulsory"
                          disableDropdown={true}
                          specialLabel={false}
                          inputClass={
                            formik.touched.phone && formik.errors.phone
                              ? ERROR_INPUT_CLASS
                              : "form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          }
                        />
                        {formik.touched.phone && formik.errors.phone ? (
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
                    {formik.touched.phone && formik.errors.phone ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        Hey, if this is wrong, I don't think anyone's contacting
                        you.
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 shadow overflow-hidden sm:rounded-md bg-white">
              <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                <span className="text-lg font-medium text-gray-800">
                  Social Profiles
                </span>
              </div>
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="linkedin"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      LinkedIn
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        linkedin.com/in/
                      </span>
                      <input
                        id="linkedin"
                        value={formik.values.linkedin}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                        placeholder="Username"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="devto"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Dev.to
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        dev.to/
                      </span>
                      <input
                        id="devto"
                        value={formik.values.devto}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                        placeholder="Username"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="stackoverflow"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      StackOverflow
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        stackoverflow.com/users/
                      </span>
                      <input
                        id="stackoverflow"
                        type="number"
                        value={formik.values.stackoverflow}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                        placeholder="User Number"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="dribble"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Dribbble
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        dribbble.com/
                      </span>
                      <input
                        id="dribble"
                        value={formik.values.dribble}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                        placeholder="Username"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="facebook"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Facebook
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        facebook.com/
                      </span>
                      <input
                        id="facebook"
                        value={formik.values.facebook}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                        placeholder="Username"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="twitter"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Twitter
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        twitter.com/
                      </span>
                      <input
                        id="twitter"
                        value={formik.values.twitter}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                        placeholder="Username"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="github"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      GitHub
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        github.com/
                      </span>
                      <input
                        id="github"
                        value={formik.values.github}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                        placeholder="Username"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="px-4 py-3 bg--cool-gray-50 sm:px-6 flex justify-between">
                {dashboard ? (
                  <>
                    <div></div>
                    <div className="text-right">
                      <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition ease-in-out duration-150">
                        {mutationLoading || loading ? (
                          <PulseLoader size="10px" color="#fff" />
                        ) : (
                          "Save Information"
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <PreviousStepButton setStep={setStep} />
                    <div className="text-right">
                      <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition ease-in-out duration-150">
                        {mutationLoading || loading ? (
                          <PulseLoader size="10px" color="#fff" />
                        ) : (
                          <>
                            Save and Continue
                            <svg
                              className="ml-2 -mr-0.5 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              ></path>
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <Portal>
        <Notification
          primaryText="Data saved successfully"
          show={notifShow}
          toggle={setNotifShow}
        />
      </Portal>
    </div>
  );
};

export default SetUserInfoStep;
