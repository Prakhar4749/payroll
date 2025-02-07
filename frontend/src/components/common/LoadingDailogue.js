import React from 'react';
import { FileText, Loader2, Shield } from 'lucide-react';



export function LoadingDialogue({ message = 'Preparing your payslip...', isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl animate-slide-up">
        <div className="flex flex-col items-center">
          {/* Icon container with glow effect */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-full">
                <FileText className="w-12 h-12" />
              </div>
              <div className="absolute -bottom-2 -right-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/50 rounded-full blur"></div>
                  <div className="relative bg-white rounded-full p-2 shadow-lg">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
            {message}
          </h3>
          
          <div className="space-y-4 w-full">
            {/* Progress bar */}
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-progress" />
            </div>

            {/* Status message */}
            <p className="text-sm text-gray-500 text-center">
              This may take a few moments
            </p>

            {/* Security badge */}
            <div className="flex items-center justify-center gap-2 bg-green-50 py-2 px-4 rounded-full mx-auto w-fit">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-700">
                Secure Download
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}