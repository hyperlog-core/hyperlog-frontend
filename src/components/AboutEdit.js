import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import Editor from "rich-markdown-editor";

const MUTATION_SET_NEW_ABOUT = gql`
  mutation($about: String!) {
    setAboutInfo(new: $about) {
      success
    }
  }
`;

const AboutEdit = ({ user }) => {
  let [aboutField, setAboutField] = useState(
    user.about !== ""
      ? user.about
      : "This is your about page. You can use markdown to pen down the content here."
  );

  const [setAboutMutation, { loading }] = useMutation(MUTATION_SET_NEW_ABOUT);

  return (
    <div className="md:mt-0 md:col-span-2">
      <h1 className="font-bold">About Page Content</h1>
      <div className="mt-3 p-8 border-2 border-gray-200 rounded-md">
        <Editor
          defaultValue={aboutField}
          onChange={(getValue) => {
            setAboutField(getValue());
          }}
        />
      </div>
      <div className="mt-3">
        <button
          type="button"
          onClick={() => {
            setAboutMutation({
              variables: {
                about: aboutField,
              },
            });
          }}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:shadow-outline-teal"
        >
          {loading ? (
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              className="-ml-1 mr-3 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"></path>
            </svg>
          )}
          Save
        </button>
      </div>
    </div>
  );
};

export default AboutEdit;
