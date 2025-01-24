import React from "react";

export default function SuccessfullyDone({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-md transform transition-all scale-105">
        <div className="flex justify-center mb-4">
          {/* New attractive SVG checkmark icon */}
          <svg
            className="w-24 h-24 text-green-500 animate-pulse"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12 2a10 10 0 100 20 10 10 0 000-20zM9.293 11.707a1 1 0 011.414 0L11 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">{message}</h2>
        <p className="text-gray-600 mt-2">
          Your action was completed successfully!
        </p>
        <button
          className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md focus:outline-none transition-all"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}
