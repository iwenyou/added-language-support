import React from 'react';
import { ChatMessage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatHistoryProps {
  messages: ChatMessage[];
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  const { t } = useLanguage();

  return (
    <section
      id="chatHistory"
      className="w-full max-w-4xl mx-auto px-4 mb-6 pt-6"
    >
      {messages.length === 0 && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-center">
          {t('chat.note.enterMessage')}
        </div>
      )}
      
      {messages.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.user === 'me' ? 'justify-end' : 'justify-start'} mb-4 last:mb-0`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-4 ${
                  msg.user === 'me'
                    ? 'bg-indigo-600 text-white ml-auto'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="break-words">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}