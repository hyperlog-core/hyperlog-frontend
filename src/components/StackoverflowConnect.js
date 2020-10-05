import React from "react";
import PopupWindow from "../helpers/PopupWindow";
import stackoverflow from "../stackoverflow.svg";
import { useMutation, gql } from "@apollo/client";
import { PulseLoader } from "react-spinners";

const MUTATION_CONNECT_STACKOVERFLOW = gql`
  mutation($code: String!) {
    connectStackoverflow(code: $code) {
      success
      errors
    }
  }
`;

const StackoverflowConnect = ({ clientId, redirectUri }) => {
  redirectUri = redirectUri || "https://app.hyperlog.io";

  const [connectStackoverflow, { loading: stackOverflowLoading }] = useMutation(
    MUTATION_CONNECT_STACKOVERFLOW,
    {
      onCompleted: (data) => {
        if (data.connectStackoverflow.success) {
          console.log("StackOverflow connected successfully");
        }
      },
    }
  );

  const onSuccess = (data) => {
    if (data.code) {
      connectStackoverflow({ variables: { code: data.code } });
    } else {
      console.log(JSON.stringify(data, null, 2));
      console.log("No code found!");
    }
  };

  const onBtnClick = () => {
    const popup = PopupWindow.open(
      "stackoverflow-oauth-authorize",
      `https://stackoverflow.com/oauth?client_id=${clientId}&redirect_uri=${redirectUri}`,
      { height: 1000, width: 600 }
    );

    popup.then(
      (data) => onSuccess(data),
      (error) => console.error(error)
    );
  };

  return (
    <div className="bg-white shadow sm:rounded-lg mt-5">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="inline-flex text-lg leading-6 font-medium text-gray-900">
          <img src={stackoverflow} className="h-6" alt="Warning" />
          &nbsp;StackOverflow
        </h3>
        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
          <div className="max-w-xl text-sm leading-5 text-gray-500">
            <p>
              Do you have some StackOverflow karma you wanna showcase? We got
              you covered. Just go ahead and connect yourself with StackOverflow
              and we'll take care of the rest.
            </p>
          </div>
          <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
            <span className="relative inline-flex rounded-md shadow-sm">
              <button
                onClick={onBtnClick}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
              >
                {stackOverflowLoading ? (
                  <PulseLoader size="10px" />
                ) : (
                  <>
                    <img
                      src={stackoverflow}
                      className="h-6"
                      alt="StackOverflow logo"
                    />
                    &nbsp;Connect StackOverflow
                  </>
                )}
              </button>
              <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-400"></span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackoverflowConnect;
