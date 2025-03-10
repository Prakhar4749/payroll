import React from "react";
import { XCircle } from "lucide-react";



function InvalidDialogue({ message, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl text-center w-full max-w-md mx-4 transform transition-all scale-in-center">
        <div className="relative">
          {/* Error Circle */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-600/20 ">
              <XCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pt-16 pb-6">
            <h2 className="text-2xl font-bold text-slate-800 mt-4">Invalid Action</h2>
            <p className="text-slate-600 mt-2 px-4">
              {message}
            </p>
          </div>

          {/* Button */}
          <div className="px-6 pb-6">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 text-white font-medium rounded-xl
                bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600
                hover:from-emerald-700 hover:via-teal-700 hover:to-sky-700
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                transform transition-all duration-200 hover:scale-[1.02]
                shadow-lg shadow-emerald-600/20"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { InvalidDialogue};