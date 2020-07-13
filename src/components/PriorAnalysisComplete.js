import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const disabledButtonClass =
  "inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 opacity-50 cursor-not-allowed shadow-sm sm:text-sm sm:leading-5";

const buttonClass =
  "inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5";

const PriorAnalysisComplete = ({ profile, analyse, loading }) => {
  const [copied, setCopied] = useState(false);
  const userCopyCode = `<script type="text/javascript">window.hyperlogID="${profile.user_id}";(function(){d =document;s=d.createElement("script");s.src="dist/client.js";s.async = 1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>`;
  return (
    <div className="flex w-full justify-center mt-5">
      <div class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
        <div>
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              class="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >
              Analysis Successful!
            </h3>
            <div class="mt-2">
              <p class="text-sm leading-5 text-gray-500">
                We have analysed your profile. Please follow the steps to embed
                your profile on your website!
              </p>
              <div className="bg-gray-100 mt-5 select-all text-left p-5">
                <code class="text-sm leading-5 text-gray-500">
                  {userCopyCode}
                </code>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <span class="flex w-full rounded-md shadow-sm sm:col-start-2">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(userCopyCode);
                setCopied(true);
              }}
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-teal-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              {copied ? "Copied!" : "Copy Embed Code"}
            </button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
            <button
              type="button"
              onClick={analyse}
              disabled={loading || profile.turn === 5}
              class={
                loading || profile.turn === 5
                  ? disabledButtonClass
                  : buttonClass
              }
            >
              {loading ? (
                <PulseLoader size="10" color="#ffffff" />
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
