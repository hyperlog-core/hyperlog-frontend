import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useHistory } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const MUTATION_NEXT_STEP = gql`
  mutation {
    nextSetupStep {
      new
    }
  }
`;

const MUTATION_COMPLETE_SETUP = gql`
  mutation {
    completeSetup {
      success
    }
  }
`;

const NextStepButton = ({ setStep, disabled, completeSetup }) => {
  const history = useHistory();
  const [nextStep, { loading }] = useMutation(MUTATION_NEXT_STEP, {
    onCompleted: (data) => {
      setStep(data.nextSetupStep.new);
    },
  });

  const [completeSetupMut, { loading: mutationLoading }] = useMutation(
    MUTATION_COMPLETE_SETUP,
    {
      onCompleted: (data) => {
        if (data.completeSetup.success) {
          history.push("/dashboard");
        }
      },
    }
  );

  return (
    <span className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className={
          disabled
            ? "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-100 bg-teal-600 opacity-25 cursor-not-allowed"
            : "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition ease-in-out duration-150"
        }
        onClick={() => {
          if (!disabled && !completeSetup) nextStep();
          else if (!disabled) completeSetupMut();
        }}
      >
        {!loading || !mutationLoading ? (
          <>
            {completeSetup ? "Complete Setup" : "Next Step"}
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
        ) : (
          <PulseLoader size="10px" color="#fff" />
        )}
      </button>
    </span>
  );
};

export default NextStepButton;
