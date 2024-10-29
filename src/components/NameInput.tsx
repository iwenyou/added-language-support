import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface NameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function NameInput({ value, onChange }: NameInputProps) {
  return (
    <header 
      id="topSection" 
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
    >
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-5">
        <div className="flex items-center">
          <button
            id="backButton"
            className="absolute left-4 p-2 sm:p-2.5 hover:bg-gray-100 rounded-full 
                     transition-colors duration-200 focus:outline-none focus:ring-2 
                     focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="w-full max-w-sm mx-auto">
            <div className="relative">
              <input
                type="text"
                id="nameInput"
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 
                         shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                         transition-all duration-200 placeholder-gray-400
                         text-gray-800 text-base"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter Name"
                aria-label="Enter your name"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-400 text-sm">
                  {value.length > 0 ? `${value.length}/50` : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}