import React from 'react';

export default ({ toshow, message = 'Loading...', gifUrl = "https://i0.wp.com/motiongraphicsphoebe.wordpress.com/wp-content/uploads/2018/10/8ee212dac057d412972e0c8cc164deee.gif?w=545&h=409&ssl=1" }) => {
  if (!toshow) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-xl animate-slide-up">
        <div className="flex flex-col items-center space-y-4">
          {/* GIF container */}
          <div className="relative mb-6">
            <img
              src={gifUrl}
              alt="Loading..."
              className="w-60 h-60 object-contain animate-pulse"
            />
          </div>

          {/* Message */}
          <h3 className="text-xl font-semibold text-gray-800 text-center">
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
