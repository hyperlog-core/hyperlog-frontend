import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const ProfileInfo = ({ profile, analyse, loading }) => {
  if (profile.status === "running") {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            We're analysing your profile. It might take a while
          </h3>
          <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
            <p>
              We've started the analysis of your profile. This process takes a
              little while, so why don't you go grab a coffee, or do some other
              work till then. We'll notify you on your email once done.
            </p>
          </div>
        </div>
      </div>
    );
  } else if (profile.turn === 0) {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Do your first analysis
          </h3>
          <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
            <p>
              It seems like this is your first time here. Let's get started with
              the first ever analysis of your profile.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-teal-400 hover:bg-teal-500 focus:outline-none focus:border-teal-200 focus:shadow-outline-teal active:bg-teal-300 active:text-gray-100 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              onClick={analyse}
              disabled={loading}
            >
              {loading ? (
                <PulseLoader size="10" color="#ffffff" />
              ) : (
                "Start Analysis"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  } else if (profile.turn > 0) {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="bg-white px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
            <div className="ml-4 mt-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Profile Analysis
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                We have analysed your profile. Please follow the steps to embed
                your profile on your website!
              </p>
            </div>
            <div className="ml-4 mt-4 flex-shrink-0">
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={analyse}
                  disabled={loading}
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-400 hover:bg-teal-500 focus:outline-none focus:border-teal-200 focus:shadow-outline-teal active:bg-teal-300 active:text-gray-100 transition ease-in-out duration-150"
                >
                  Analyse Profile Again
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-lg text-center leading-6 font-medium text-gray-900">
            <PulseLoader size="20px" color="#374151" />
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileInfo;
