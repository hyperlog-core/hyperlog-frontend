import { gql, useMutation } from "@apollo/client";
import React from "react";
import { PulseLoader } from "react-spinners";

const MUTATION_NEXT_STEP = gql`
  mutation {
    nextSetupStep {
      new
    }
  }
`;

const NextStepButton = ({ setStep }) => {
  const [nextStep, { loading }] = useMutation(MUTATION_NEXT_STEP, {
    onCompleted: (data) => {
      setStep(data.nextSetupStep.new);
    },
  });

  return (
    <span class="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition ease-in-out duration-150"
        onClick={nextStep}
      >
        {!loading ? (
          <>
            Next Step
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
          </>
        ) : (
          <PulseLoader size="10px" color="#fff" />
        )}
      </button>
    </span>
  );
};

export default NextStepButton;
