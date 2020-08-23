import React, { useState } from "react";
import PopupWindow from "../helpers/PopupWindow";
import { useMutation, gql } from "@apollo/client";

const MUTATION_CONNECT_STACKOVERFLOW = gql`
  mutation($code: String!) {
    connectStackoverflow(code: $code) {
      success
      errors
    }
  }
`;

const StackoverflowConnect = ({
  buttonText,
  children,
  className,
  clientId,
  redirectUri,
}) => {
  buttonText = buttonText || "Connect StackOverflow";
  redirectUri = redirectUri || "https://app.hyperlog.io";

  const [mutError, setMutError] = useState(null);

  const [
    connectStackoverflow,
    { loading: stackOverflowLoading, error: stackOverflowError },
  ] = useMutation(MUTATION_CONNECT_STACKOVERFLOW, {
    onCompleted: (data) => {
      if (!data.connectStackoverflow.success) {
        setMutError(data.connectStackoverflow.errors[0]);
      } else {
        console.log("StackOverflow connected successfully");
      }
    },
  });

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

  const attrs = { onClick: onBtnClick };

  if (className) {
    attrs.className = className;
  }

  return (
    <div>
      {mutError || stackOverflowError ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div>
              <p className="text-sm leading-5 text-red-700">
                {mutError || stackOverflowError}
              </p>
            </div>
          </div>
        </div>
      ) : null}
      <button {...attrs}>
        {stackOverflowLoading ? "Loading!!" : children || buttonText}
      </button>
    </div>
  );
};

export default StackoverflowConnect;
