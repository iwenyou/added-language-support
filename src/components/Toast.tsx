import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
}

export function Toast({ message, isVisible, onHide }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 transition-all">
      <div className="bg-gray-900 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 transform animate-fade-in">
        <Check className="w-5 h-5 text-green-400" />
        <span className="text-base font-medium">{message}</span>
      </div>
    </div>
  );
}