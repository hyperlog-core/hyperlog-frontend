import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const MUTATION_SET_THEME = gql`
  mutation($theme: String!) {
    setThemeCode(new: $theme) {
      success
    }
  }
`;

const CustomizationsPage = ({ theme }) => {
  const colors = [
    { id: 1, name: "Green", short: "green" },
    { id: 2, name: "Red", short: "red" },
    { id: 3, name: "Orange", short: "orange" },
    { id: 4, name: "Pink", short: "pink" },
    { id: 5, name: "Blue", short: "blue" },
    { id: 6, name: "Indigo", short: "indigo" },
    { id: 7, name: "Purple", short: "purple" },
    { id: 8, name: "Yellow", short: "yellow" },
    { id: 9, name: "Teal", short: "teal" },
  ];

  // eslint-disable-next-line array-callback-return
  const selected = colors.find((color) => {
    if (theme === "default") {
      return colors[0];
    } else if (theme === color.short) {
      return color;
    }
  });

  const [selectedColor, setSelectedColor] = useState(selected);
  const [hovering, setHovering] = useState({ color: "" });
  const [listOpen, setListOpen] = useState(false);

  const [setTheme, { loading: isLoading }] = useMutation(MUTATION_SET_THEME, {
    onCompleted: (data) => {
      if (data.setThemeCode.success) {
      }
    },
  });

  return (
    <>
      <div
        className={`bg-gradient-to-tr from-${selectedColor.short}-100 to-${selectedColor.short}-200 shadow sm:rounded-lg`}
      >
        <div className="px-4 py-5 sm:p-6">
          <div className="text-xl font-medium text-cool-gray-700">
            Appearance
          </div>
          <div className="mt-5">
            <div className="space-y-1">
              <label
                id="listbox-label"
                className="block text-sm leading-5 font-medium text-gray-700"
              >
                Select Color
              </label>
              <div className="relative">
                <span className="inline-block w-full rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => setListOpen(!listOpen)}
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    <div className="flex items-center space-x-3">
                      {/* <!-- On: "bg-green-400", Off: "bg-gray-200" --> */}
                      <span
                        aria-label="Online"
                        className={`bg-${selectedColor.short}-400 flex-shrink-0 inline-block h-2 w-2 rounded-full`}
                      ></span>
                      <span className="block truncate">
                        {selectedColor.name}
                      </span>
                    </div>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </span>

                {listOpen && (
                  <div className="absolute mt-1 z-50 w-full rounded-md bg-white shadow-lg">
                    {/* eslint-disable-next-line jsx-a11y/aria-activedescendant-has-tabindex */}
                    <ul
                      tabIndex={selectedColor.id}
                      role="listbox"
                      aria-labelledby="listbox-label"
                      aria-activedescendant={`listbox-item-${selectedColor.id}`}
                      className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                    >
                      {colors.map((color) => (
                        <li
                          key={color.id}
                          id={`listbox-item-${color.id}`}
                          role="option"
                          aria-selected={selectedColor === color}
                          onMouseEnter={() =>
                            setHovering({ color: color.name })
                          }
                          onClick={() => {
                            setListOpen(false);
                            setSelectedColor(color);
                          }}
                          className={`${
                            hovering.color === color.name
                              ? "text-white bg-indigo-600"
                              : "text-gray-900"
                          } cursor-default select-none relative py-2 pl-3 pr-9`}
                        >
                          <div className="flex items-center space-x-3">
                            <span
                              aria-label="Online"
                              className={`bg-${color.short}-400 flex-shrink-0 inline-block h-2 w-2 rounded-full`}
                            ></span>
                            <span
                              className={`${
                                selectedColor.name === color.name
                                  ? `font-semibold`
                                  : `font-normal`
                              } block truncate`}
                            >
                              {color.name}
                            </span>
                          </div>

                          {selectedColor.name === color.name && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                              {/* <!-- Heroicon name: check --> */}
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <span className="inline-flex rounded-md shadow-sm mt-4">
              <button
                type="button"
                onClick={() => {
                  if (selectedColor.short === "green")
                    setTheme({ variables: { theme: "default" } });
                  else setTheme({ variables: { theme: selectedColor.short } });
                }}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-${selectedColor.short}-600 hover:bg-${selectedColor.short}-500 focus:outline-none focus:border-${selectedColor.short}-700 focus:shadow-outline-${selectedColor.short} active:bg-${selectedColor.short}-700 transition ease-in-out duration-150`}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                Save
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomizationsPage;
