import React, { KeyboardEvent, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ReplySectionProps {
  theirReply: string;
  myReply: string;
  onTheirReplyChange: (value: string) => void;
  onMyReplyChange: (value: string) => void;
  onSubmit: () => void;
  keyword: string;
  onKeywordChange: (value: string) => void;
}

export function ReplySection({
  theirReply,
  myReply,
  onTheirReplyChange,
  onMyReplyChange,
  onSubmit,
  keyword,
  onKeywordChange
}: ReplySectionProps) {
  const { t } = useLanguage();
  const [focusedInput, setFocusedInput] = useState<'their' | 'my' | null>(null);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && (theirReply.trim() || myReply.trim())) {
      onSubmit();
      setFocusedInput(null);
    }
  };

  const handleBlur = () => {
    if (theirReply.trim() || myReply.trim()) {
      onSubmit();
    }
    setFocusedInput(null);
  };

  return (
    <section id="replySection" className="max-w-4xl mx-auto px-4 mb-6">
      <div className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            id="theirReply"
            className={`px-4 py-3 rounded-lg border border-gray-200 
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     bg-white/80 backdrop-blur-sm transition-all duration-300 ease-in-out
                     origin-left
                     ${focusedInput === 'their' ? 'w-full' : 'w-1/2'}
                     ${focusedInput === 'my' ? 'w-0 px-0 opacity-0' : ''}`}
            value={theirReply}
            onChange={(e) => onTheirReplyChange(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setFocusedInput('their')}
            onBlur={handleBlur}
            placeholder={t('chat.placeholder.their')}
          />
          <input
            type="text"
            id="myReply"
            className={`px-4 py-3 rounded-lg border border-gray-200 
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     bg-white/80 backdrop-blur-sm transition-all duration-300 ease-in-out
                     origin-right
                     ${focusedInput === 'my' ? 'w-full' : 'w-1/2'}
                     ${focusedInput === 'their' ? 'w-0 px-0 opacity-0' : ''}`}
            value={myReply}
            onChange={(e) => onMyReplyChange(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setFocusedInput('my')}
            onBlur={handleBlur}
            placeholder={t('chat.placeholder.my')}
          />
        </div>
        
        <div className="relative">
          <input
            type="text"
            id="keywordBox"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     bg-white/80 backdrop-blur-sm transition-all duration-200
                     text-center"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder={t('chat.placeholder.keyword')}
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-400">🎯</span>
          </div>
        </div>
      </div>
    </section>
  );
}