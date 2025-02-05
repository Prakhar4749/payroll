import React from "react";
import { MessageSquareWarning } from "lucide-react";

function NoticeDialogue({ 
  title = "Warning", 
  message, 
  onClose, 
  type = "warning",
  actionLabel = "Acknowledge",
  className 
}) {
  const colors = {
    warning: {
      gradient: "from-amber-500 via-orange-600 to-red-500",
      shadow: "shadow-orange-500/30",
      hover: "hover:from-amber-600 hover:via-orange-700 hover:to-red-600",
      ring: "focus:ring-orange-500"
    },
    info: {
      gradient: "from-indigo-400 via-blue-500 to-sky-400",
      shadow: "shadow-indigo-400/30",
      hover: "hover:from-indigo-500 hover:via-blue-600 hover:to-sky-500",
      ring: "focus:ring-indigo-400"
    }
  };

  const selectedColors = colors[type];

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm 
      animate-in fade-in duration-200 px-4 sm:px-6 ${className}`}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl text-center w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 
        transform transition-all scale-in-center"
      >
        <div className="relative">
          {/* Gradient Background Circle */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r ${selectedColors.gradient} 
              flex items-center justify-center shadow-lg ${selectedColors.shadow}`}
            >
              <MessageSquareWarning className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2} />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pt-16 pb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">{title}</h1>
            <h2 className="text-lg sm:text-xl text-slate-800 mt-3 sm:mt-4">{message}</h2>
          </div>

          {/* Button */}
          <div className="px-4 sm:px-6 pb-6">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 sm:px-6 sm:py-3 text-white font-medium rounded-xl
              bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600
              hover:from-emerald-700 hover:via-teal-700 hover:to-sky-700
              focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
              transform transition-all duration-200 hover:scale-[1.02]
              shadow-lg shadow-emerald-600/20"
            >
              {actionLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { NoticeDialogue };
