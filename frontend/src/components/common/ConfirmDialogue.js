import React from "react";
import { AlertCircle } from "lucide-react";


function ConfirmDialogue({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl text-center w-full max-w-md mx-4 transform transition-all scale-in-center">
        <div className="relative">
          {/* Warning Circle */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-600/20">
              <AlertCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pt-16 pb-6">
            <h2 className="text-2xl font-bold text-slate-800 mt-4">Confirm Action</h2>
            <p className="text-slate-600 mt-2">
              {message}
            </p>
          </div>

          {/* Buttons */}
          <div className="px-6 pb-6 flex gap-4">
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 text-white font-medium rounded-xl
                bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600
                hover:from-emerald-700 hover:via-teal-700 hover:to-sky-700
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                transform transition-all duration-200 hover:scale-[1.02]
                shadow-lg shadow-emerald-600/20"
            >
              Confirm
            </button>
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3 text-slate-700 font-medium rounded-xl
                bg-slate-100 hover:bg-slate-200
                focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
                transform transition-all duration-200 hover:scale-[1.02]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ConfirmDialogue};