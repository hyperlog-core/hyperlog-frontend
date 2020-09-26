import React from "react";
import PreviousStepButton from "../components/Buttons/PreviousStepButton";

const SetUserInfoStep = ({ setStep }) => {
  return (
    <div class="mt-5 md:mt-0 md:col-span-2">
      <form action="#" method="POST">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="border-b border-gray-200 px-4 py-5 sm:px-6">
            <span class="text-lg font-medium text-gray-800">Personal Info</span>
          </div>
          <div class="px-4 py-5 sm:p-6">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <label
                for="tagline"
                class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
              >
                Tagline
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input
                    id="tagline"
                    class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    placeholder="Developer by day, Batman by night"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 shadow overflow-hidden sm:rounded-md">
          <div class="border-b border-gray-200 px-4 py-5 sm:px-6">
            <span class="text-lg font-medium text-gray-800">
              Social Profiles
            </span>
          </div>
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="linkedin"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  LinkedIn
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    linkedin.com/in/
                  </span>
                  <input
                    id="linkedin"
                    class="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="devto"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Dev.to
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    dev.to/
                  </span>
                  <input
                    id="devto"
                    class="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="stackoverflow"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  StackOverflow
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    stackoverflow.com/users/
                  </span>
                  <input
                    id="stackoverflow"
                    class="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                    placeholder="User Number"
                  />
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="dribbble"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Dribbble
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    dribbble.com/
                  </span>
                  <input
                    id="dribbble"
                    class="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="facebook"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Facebook
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    facebook.com/
                  </span>
                  <input
                    id="facebook"
                    class="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="twitter"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Twitter
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    twitter.com/
                  </span>
                  <input
                    id="twitter"
                    class="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="github"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  GitHub
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    github.com/
                  </span>
                  <input
                    id="github"
                    class="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                    placeholder="Username"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="px-4 py-3 bg--cool-gray-50 sm:px-6 flex justify-between">
            <PreviousStepButton setStep={setStep} />
            <div class="text-right">
              <button class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition ease-in-out duration-150">
                Save and Continue
                <svg
                  class="ml-2 -mr-0.5 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SetUserInfoStep;
