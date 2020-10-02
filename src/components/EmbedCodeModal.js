import React, { useState } from "react";
import { Transition } from "@tailwindui/react";

const EmbedCodeModal = ({ userId, isOpen, setOpen }) => {
  const [copied, setCopied] = useState(false);
  const userCopyCode = `<script type="text/javascript">window.hyperlogID="${userId}";(function(){d =document;s=d.createElement("script");s.src="https://c.hyperlog.io/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>`;
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
          onClick={() => setOpen(false)}
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
        <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
          <div>
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
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg leading-6 font-semibold text-gray-900"
                id="modal-headline"
              >
                Embed Code
              </h3>
              <div className="mt-2">
                <p className="text-sm leading-5 text-gray-500">
                  Hey! Just embed the code below on your website just before you
                  end the <code>body</code> tag and you should be all set up
                  with Hyperlog.
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
            <span className="flex w-full rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex justify-center w-full rounded-md border border-gray-400 px-4 py-2 bg-gray-50 text-base leading-6 font-medium text-gray-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Dismiss
              </button>
            </span>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default EmbedCodeModal;
