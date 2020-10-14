/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import md5 from "md5";
import { PulseLoader } from "react-spinners";
import Portal from "../Portal";
import { Transition } from "@headlessui/react";

const GET_MESSAGES = gql`
  {
    outsiderMessages(page: 1) {
      messages {
        id
        senderName
        senderEmail
        text
        time
        isArchived
      }
      count
    }
  }
`;

const MUTATION_ARCHIVE_MESSAGE = gql`
  mutation($id: Int!) {
    toggleArchiveOutsiderMessage(id: $id) {
      new
    }
  }
`;

const MessageSection = () => {
  const { loading, data, startPolling, stopPolling } = useQuery(GET_MESSAGES);
  const [isOpen, setIsOpen] = useState(-1);
  const [archiveMessage] = useMutation(MUTATION_ARCHIVE_MESSAGE);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) {
    return (
      <div className="flex w-full h-64 justify-center items-center">
        <PulseLoader size="20px" color="#374151" />
      </div>
    );
  }

  return (
    <div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.outsiderMessages.messages.map((message, index) => {
          if (!message.isArchived) {
            return (
              <ListItem
                key={message.id}
                archive={archiveMessage}
                index={index}
                message={message}
                setIsOpen={setIsOpen}
              />
            );
          }
        })}
      </ul>
      {isOpen !== -1 && (
        <Portal>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                show={isOpen !== -1}
              >
                <div
                  onClick={() => setIsOpen(-1)}
                  className="fixed inset-0 transition-opacity"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
              </Transition>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <Transition
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                show={isOpen !== -1}
              >
                {(ref) => (
                  <div
                    ref={ref}
                    className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                      <button
                        onClick={() => setIsOpen(-1)}
                        type="button"
                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                        aria-label="Close"
                      >
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="sm:flex sm:items-start">
                      <div>
                        <div>
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Sender Info
                          </h3>
                          <p className="max-w-2xl text-sm leading-5 text-gray-500">
                            You decide whether to reply or not :)
                          </p>
                        </div>
                        <div className="mt-5 border-t border-gray-200 pt-5">
                          <dl>
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                              <dt className="text-sm leading-5 font-medium text-gray-500">
                                Sender Name
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {
                                  data.outsiderMessages.messages[isOpen]
                                    .senderName
                                }
                              </dd>
                            </div>
                            <div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500">
                                Email address
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {
                                  data.outsiderMessages.messages[isOpen]
                                    .senderEmail
                                }
                              </dd>
                            </div>
                            <div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                              <dt className="text-sm leading-5 font-medium text-gray-500">
                                Message
                              </dt>
                              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                {data.outsiderMessages.messages[isOpen].text}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                        >
                          <svg
                            className="-ml-1 mr-3 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          Reply
                        </button>
                      </span>
                      <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <button
                          type="button"
                          onClick={() => {
                            archiveMessage({
                              variables: {
                                id: data.outsiderMessages.messages[isOpen].id,
                              },
                            });
                            setIsOpen(-1);
                          }}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-50 focus:outline-none focus:border-gray-300 focus:shadow-outline-gray active:bg-gray-200 transition ease-in-out duration-150"
                        >
                          <svg
                            className="-ml-1 mr-3 h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            />
                          </svg>
                          Archive
                        </button>
                      </span>
                    </div>
                  </div>
                )}
              </Transition>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

const ListItem = ({ message, index, setIsOpen, archive }) => {
  return (
    <>
      <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow">
        <div
          onClick={() => setIsOpen(index)}
          className="flex-1 flex flex-col p-8"
        >
          <img
            className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full"
            src={`https://www.gravatar.com/avatar/${md5(
              message.senderEmail
            )}?s=256&d=identicon`}
            alt=""
          />
          <h3 className="mt-6 text-gray-900 text-sm leading-5 font-medium">
            {message.senderName}
          </h3>
          <dl className="mt-1 flex-grow flex flex-col justify-between">
            <dt className="sr-only">Message Excerpt</dt>
            <dd className="text-gray-500 text-sm leading-5 truncate">
              {message.text}
            </dd>
          </dl>
        </div>
        <div className="border-t border-gray-200">
          <div className="-mt-px flex">
            <div className="w-0 flex-1 flex border-r border-gray-200">
              <a
                href="#"
                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="ml-3">Reply</span>
              </a>
            </div>
            <div className="-ml-px w-0 flex-1 flex">
              <a
                href="#"
                onClick={() => {
                  archive({
                    variables: {
                      id: message.id,
                    },
                  });
                  setIsOpen(-1);
                }}
                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <span className="ml-3">Archive</span>
              </a>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default MessageSection;
