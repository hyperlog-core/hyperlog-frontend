import { gql, useMutation } from "@apollo/client";
import React from "react";
import { PulseLoader } from "react-spinners";

const MUTATION_PREVIOU_STEP = gql`
  mutation {
    previousSetupStep {
      new
    }
  }
`;

const PreviousStepButton = ({ setStep }) => {
  const [previousStep, { loading }] = useMutation(MUTATION_PREVIOU_STEP, {
    onCompleted: (data) => {
      setStep(data.previousSetupStep.new);
    },
  });

  return (
    <span class="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-50 focus:outline-none focus:border-gray-300 focus:shadow-outline-gray active:bg-gray-200 transition ease-in-out duration-150"
        onClick={previousStep}
      >
        {!loading ? (
          <>
            <svg
              class="-ml-0.5 mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous Step
          </>
        ) : (
          <PulseLoader size="10px" color="#fff" />
        )}
      </button>
    </span>
  );
};

export default PreviousStepButton;
