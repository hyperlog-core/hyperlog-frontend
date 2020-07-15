import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import GridLoader from "react-spinners/GridLoader";

const disabledButtonClass =
  "inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 opacity-50 cursor-not-allowed shadow-sm sm:text-sm sm:leading-5";

const buttonClass =
  "inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5";

const PriorAnalysisComplete = ({ profile, analyse, loading }) => {
  const [copied, setCopied] = useState(false);
  const userCopyCode = `<script type="text/javascript">window.hyperlogID="${profile.user_id}";(function(){d =document;s=d.createElement("script");s.src="https://c.hyperlog.io/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>`;
  return (
    <div className="flex w-full justify-center mt-5">
      <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
        <div>
          {profile.status === "running" ? (
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-teal-100">
              <GridLoader size="4px" margin="2" color="#047481" />
            </div>
          ) : (
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-teal-100">
              <svg
                className="h-6 w-6 text-teal-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
          <div className="mt-3 text-center sm:mt-5">
            <h3
              className="text-lg leading-6 font-semibold text-gray-900"
              id="modal-headline"
            >
              {profile.status === "running"
                ? "We're analysing your profile"
                : "Analysis Successful!"}
            </h3>
            <div className="mt-2">
              <p className="text-sm leading-5 text-gray-500">
                {profile.status === "running"
                  ? "We have started the analysis of your profile. Why don't you just copy and paste the code below on your site. We'll embed your profile as soon as it is completed analysing."
                  : "We have analysed your profile. Please follow the steps to embed your profile on your website!"}
              </p>
              <div className="bg-gray-100 mt-5 select-all text-left p-5">
                <code className="text-sm leading-5 text-gray-600 break-all">
                  {userCopyCode}
                </code>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <span className="flex w-full rounded-md shadow-sm sm:col-start-2">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(userCopyCode);
                setCopied(true);
              }}
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-teal-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              {copied ? "Copied!" : "Copy Embed Code"}
            </button>
          </span>
          <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
            <button
              type="button"
              onClick={analyse}
              disabled={
                loading || profile.turn === 5 || profile.status === "running"
              }
              className={
                loading || profile.turn === 5 || profile.status === "running"
                  ? disabledButtonClass
                  : buttonClass
              }
            >
              {loading || profile.status === "running" ? (
                <PulseLoader size="10px" />
              ) : (
                `Analyse Again (${5 - profile.turn})`
              )}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriorAnalysisComplete;
