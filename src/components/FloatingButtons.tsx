import React from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';

interface FloatingButtonsProps {
  onGetReply: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function FloatingButtons({ onGetReply, onSubmit, isLoading = false }: FloatingButtonsProps) {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
      <button
        id="get_result"
        onClick={onGetReply}
        disabled={isLoading}
        className="sticky-button px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 
                 text-white hover:from-purple-700 hover:to-indigo-700 active:from-purple-800 
                 active:to-indigo-800 focus:ring-4 focus:ring-purple-300 transition-all 
                 flex items-center gap-2.5 shadow-lg hover:shadow-xl disabled:opacity-70 
                 disabled:cursor-not-allowed font-medium text-sm"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <MessageSquare className="w-4 h-4" />
        )}
        <span>{isLoading ? 'Generating...' : 'Get reply'}</span>
      </button>
    </div>
  );
}