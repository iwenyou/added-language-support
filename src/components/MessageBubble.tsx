import React from 'react';
import { User } from 'lucide-react';
import { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      className={`flex ${
        message.user === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          message.user === 'user'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <User className="w-4 h-4" />
          <span className="text-sm font-medium">
            {message.user === 'user' ? 'You' : 'Assistant'}
          </span>
        </div>
        <p>{message.content}</p>
      </div>
    </div>
  );
}