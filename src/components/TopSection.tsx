import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TopSectionProps {
  name: string;
  onNameChange: (name: string) => void;
  onBack: () => void;
}

export function TopSection({ name, onNameChange, onBack }: TopSectionProps) {
  return (
    <section 
      id="topSection" 
      className="sticky top-0 z-50 bg-gradient-to-br from-indigo-50 to-purple-50"
    >
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center">
          <button
            id="backButton"
            onClick={onBack}
            className="absolute left-4 p-2 hover:bg-white/50 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="w-full flex justify-center">
            <input
              type="text"
              id="nameInput"
              className="w-64 px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm
                       border border-gray-200 shadow-sm
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       transition-all duration-200 text-center placeholder:text-gray-400
                       text-gray-800"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Enter Name"
              maxLength={50}
            />
          </div>
        </div>
      </div>
    </section>
  );
}