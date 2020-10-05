import React from "react";

const ComingSoon = () => {
  return (
    <div className="bg-green-700 rounded-lg shadow-lg">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
          <span className="block">Coming Soon</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-green-200">
          We're still working on some of the features and we promise to deliver
          these features as soon as possible. Stay tuned.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
