import React from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FloatingButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  tone: string;
  onToneChange: (tone: string) => void;
}

const TONES = [
  { id: 'cool', label: '😎', emoji: '😎' },
  { id: 'warm', label: '🤗', emoji: '🤗' },
  { id: 'pickup-artist', label: '💫', emoji: '💫' }
];

export function FloatingButton({ 
  onClick, 
  isLoading = false,
  disabled = false,
  tone,
  onToneChange
}: FloatingButtonProps) {
  const { language, t } = useLanguage();
  const selectedTone = TONES.find(t => t.id === tone) || TONES[1];
  
  const nextTone = () => {
    const currentIndex = TONES.findIndex(t => t.id === tone);
    const nextIndex = (currentIndex + 1) % TONES.length;
    onToneChange(TONES[nextIndex].id);
  };

  const getToneLabel = (toneId: string) => {
    switch (toneId) {
      case 'cool':
        return language === 'en' ? 'cool' : '酷酷的';
      case 'warm':
        return language === 'en' ? 'warm' : '温暖的';
      case 'pickup-artist':
        return language === 'en' ? 'charming' : '迷人的';
      default:
        return toneId;
    }
  };

  return (
    <div className="flex items-center gap-3 min-w-[300px] max-w-[400px] w-full">
      <button
        onClick={nextTone}
        className="w-[60px] flex-shrink-0 h-[50px] bg-white text-indigo-600 rounded-full shadow-lg 
                 hover:shadow-xl transition-all duration-200
                 border border-indigo-100 hover:border-indigo-200
                 flex items-center justify-center"
      >
        <span className="text-xl">{selectedTone.emoji}</span>
      </button>

      <button
        onClick={onClick}
        disabled={isLoading || disabled}
        className="flex-1 h-[50px] bg-indigo-600 text-white rounded-full 
                 hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl
                 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed
                 disabled:hover:bg-indigo-600 disabled:hover:shadow-lg whitespace-nowrap px-6
                 animate-pulse-subtle"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <MessageSquare className="w-5 h-5 flex-shrink-0" />
        )}
        <span className="font-medium truncate">
          {isLoading ? 
            t('chat.button.generating') : 
            `${t('chat.button.getReply')} (${getToneLabel(tone)}) ${selectedTone.emoji}`}
        </span>
      </button>
    </div>
  );
}