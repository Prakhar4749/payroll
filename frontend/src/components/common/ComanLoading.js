import React from 'react';
import img from "../../assets/images/loading.gif"

export default ({ toshow, message = 'Loading...', gifUrl = img }) => {
  if (!toshow) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50 animate-fade-in">
      <div className=" animate-slide-up">
        <div className="flex flex-col items-center space-y-4">
          {/* GIF container */}
          <div className="relative mb-6">
            <img
              src={gifUrl}
              alt="Loading..."
              className=" w-40 h-40 sm:w-60 sm:h-60 object-contain "
            />
          </div>

          {/* Message */}
          <h3 className="text-2xl font-bold text-gray-800 text-center">
            {message}
          </h3>

          {/* Optional Progress Bar */}
          {/* <div className="w-full">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-progress" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
