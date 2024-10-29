import React from 'react';
import { MessageSquare, Clock, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { ChatHistory } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface HistoryProps {
  histories: ChatHistory[];
  onStartNewChat: () => void;
  onOpenChat: (chat: ChatHistory) => void;
  onDeleteChat: (chatId: string) => void;
}

export function History({ histories, onStartNewChat, onOpenChat, onDeleteChat }: HistoryProps) {
  const { language, toggleLanguage } = useLanguage();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: language === 'en'
    }).format(new Date(date));
  };

  const formatChatName = (chat: ChatHistory) => {
    if (chat.name.trim()) return chat.name;
    
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'zh-CN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(chat.lastActive));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6 pb-24">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
            {language === 'en' ? 'Chat History' : '聊天记录'}
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="w-10 h-10 rounded-full shadow-lg hover:shadow-xl 
                       transition-all duration-300 overflow-hidden
                       border-2 border-white focus:outline-none focus:ring-2 
                       focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Toggle language"
            >
              <div className="w-full h-full flex items-center justify-center text-lg">
                {language === 'en' ? '🇺🇸' : '🇨🇳'}
              </div>
            </button>
            <button
              onClick={onStartNewChat}
              className="w-10 h-10 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 
                       transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
              aria-label={language === 'en' ? 'New Chat' : '新对话'}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {histories.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">
                {language === 'en' ? 'No chat histories yet' : '暂无聊天记录'}
              </p>
            </div>
          ) : (
            histories.map((history) => (
              <div
                key={history.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow 
                         border border-gray-100 group relative"
              >
                <button
                  onClick={() => onOpenChat(history)}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                        {formatChatName(history)}
                      </h2>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(history.lastActive)}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 
                                        transition-colors" />
                  </div>

                  <div className="space-y-2">
                    {history.messages.slice(-2).map((msg) => (
                      <div
                        key={msg.id}
                        className={`text-sm ${
                          msg.user === 'me'
                            ? 'text-indigo-600'
                            : 'text-gray-600'
                        }`}
                      >
                        <span className="font-medium">
                          {msg.user === 'me' ? 
                            (language === 'en' ? 'Me: ' : '我：') : 
                            (language === 'en' ? 'Them: ' : '对方：')}
                        </span>
                        <span className="line-clamp-1">{msg.content}</span>
                      </div>
                    ))}
                    {history.messages.length === 0 && (
                      <p className="text-sm text-gray-400 italic">
                        {language === 'en' ? 'No messages yet' : '暂无消息'}
                      </p>
                    )}
                  </div>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(history.id);
                  }}
                  className="absolute top-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100
                           hover:bg-red-50 transition-all duration-200"
                  aria-label={language === 'en' ? 'Delete chat' : '删除聊天'}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <button
          onClick={onStartNewChat}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 
                   transition-colors shadow-lg hover:shadow-xl flex items-center gap-2
                   animate-pulse-subtle"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">
            {language === 'en' ? 'Start a New Chat' : '开始新对话'}
          </span>
        </button>
      </div>
    </div>
  );
}