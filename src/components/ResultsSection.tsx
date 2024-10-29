import React, { useEffect, useRef, useState } from 'react';
import { Copy, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { Toast } from './Toast';
import { useLanguage } from '../contexts/LanguageContext';

interface Result {
  id: string;
  text: string;
}

interface ResultsSectionProps {
  results: Result[];
  onCopy: (text: string) => void;
  currentResult: string;
  isLoading: boolean;
  error: string | null;
}

export function ResultsSection({ 
  results, 
  onCopy, 
  currentResult, 
  isLoading,
  error 
}: ResultsSectionProps) {
  const [showToast, setShowToast] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const streamingTextRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (currentResult && !isLoading && titleRef.current) {
      titleRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'end'
      });
    }
  }, [isLoading, currentResult]);

  useEffect(() => {
    if (streamingTextRef.current && isLoading) {
      streamingTextRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'end' 
      });
    }
  }, [currentResult, isLoading]);

  const handleCopy = (text: string) => {
    const cleanText = text.replace(/^[^\n]*\n\n/, '');
    onCopy(cleanText);
    setShowToast(true);
  };

  const extractEmojiAndText = (content: string) => {
    const [emoji, ...textParts] = content.split('\n\n');
    return {
      emoji: emoji.trim(),
      text: textParts.join('\n\n').trim()
    };
  };

  return (
    <section id="resultsSection" ref={sectionRef} className="max-w-4xl mx-auto px-4 mb-20">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div 
          ref={titleRef}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-800">{t('chat.label.results')}</h2>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-lg border border-red-200 bg-red-50">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-600">{error}</span>
            </div>
          </div>
        )}

        {isLoading && currentResult && (
          <div className="mb-4 p-4 rounded-lg border border-indigo-200 bg-indigo-50">
            <div className="flex items-center gap-2 mb-2">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              <span className="text-sm font-medium text-indigo-600">{t('chat.button.generating')}</span>
            </div>
            <div className="flex items-center gap-3">
              {extractEmojiAndText(currentResult).emoji && (
                <div className="text-2xl flex-shrink-0 leading-none">
                  {extractEmojiAndText(currentResult).emoji}
                </div>
              )}
              <div 
                ref={streamingTextRef}
                className="text-gray-700 flex-1 whitespace-pre-wrap min-h-[1.5em]"
              >
                {extractEmojiAndText(currentResult).text}
                <span className="animate-pulse">|</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {results.map((result) => {
            const { emoji, text } = extractEmojiAndText(result.text);
            return (
              <button
                key={result.id}
                onClick={() => handleCopy(result.text)}
                className="w-full text-left p-4 rounded-lg border border-gray-200 
                         hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {emoji && (
                    <div className="text-2xl flex-shrink-0 leading-none">
                      {emoji}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-gray-700 break-words whitespace-pre-wrap">{text}</span>
                      <Copy className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 
                                   transition-opacity flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Toast 
        message={t('chat.label.copied')} 
        isVisible={showToast} 
        onHide={() => setShowToast(false)} 
      />
    </section>
  );
}