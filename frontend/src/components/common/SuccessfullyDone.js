import React from "react";
import { Check } from "lucide-react";



function SuccessfullyDone({ message, onClose ,className }) {
  return (
    <div className={"fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200 `${className}`"}>
      <div className="bg-white rounded-2xl shadow-2xl text-center w-full max-w-md mx-4 transform transition-all scale-in-center relative top-10">
        <div className="relative ">
          {/* Gradient Background Circle */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 flex items-center justify-center shadow-lg shadow-emerald-600/20">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pt-16 pb-6">
            <h2 className="text-2xl font-bold text-slate-800 mt-4">{message}</h2>
            <p className="text-slate-600 mt-2">
              Your action was completed successfully!
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
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SuccessfullyDone };