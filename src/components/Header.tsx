import React from 'react';
import { MessageCircle } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center gap-3">
        <MessageCircle className="w-6 h-6 text-indigo-600" />
        <h1 className="text-xl font-semibold text-gray-800">Chat App</h1>
      </div>
    </header>
  );
}