import React from "react";

const ComingSoon = ({ username }) => {
  return (
    <div className="bg-gradient-to-b from-green-700 to-green-900 rounded-lg shadow-lg">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
          <span className="block">Coming Soon</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-green-200">
          We're still working on some of the features and we promise to deliver
          these features as soon as possible. But you can visit your portfolio
          right now at{" "}
          <a
            href={`https://${username}.hyperlog.dev`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {username}.hyperlog.dev
          </a>
        </p>
        <a
          href={`https://${username}.hyperlog.dev`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3
          border border-transparent text-base leading-6 font-medium rounded-md
          text-green-600 bg-white hover:text-green-500 hover:bg-green-50
          transition duration-150 ease-in-out sm:w-auto"
        >
          Visit your portfolio
        </a>
      </div>
    </div>
  );
};

export default ComingSoon;
