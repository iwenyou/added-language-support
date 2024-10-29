import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'chat.placeholder.their': 'Their reply',
    'chat.placeholder.my': 'My reply',
    'chat.placeholder.keyword': 'give us a word or two to focus on',
    'chat.button.submit': 'Submit',
    'chat.button.getReply': 'Get reply',
    'chat.button.generating': 'Generating...',
    'chat.label.results': 'AI Generated Results',
    'chat.label.copied': 'Copied!',
    'chat.note.enterMessage': 'Note: please enter at least one message to get replies.',
    'chat.error.title': 'Error Occurred',
    'chat.button.dismiss': 'Dismiss',
    'chat.button.newChat': 'New Chat',
    'chat.button.startNewChat': 'Start a New Chat',
    'chat.label.noHistory': 'No chat histories yet',
    'chat.label.noMessages': 'No messages yet',
    'chat.label.chatHistory': 'Chat History',
    'chat.button.delete': 'Delete chat',
    'chat.label.me': 'Me: ',
    'chat.label.them': 'Them: '
  },
  zh: {
    'chat.placeholder.their': '对方回复',
    'chat.placeholder.my': '我的回复',
    'chat.placeholder.keyword': '输入关键词引导对话',
    'chat.button.submit': '提交',
    'chat.button.getReply': '获取回复',
    'chat.button.generating': '生成中...',
    'chat.label.results': 'AI 生成结果',
    'chat.label.copied': '已复制！',
    'chat.note.enterMessage': '注意：请输入至少一条消息以获取回复。',
    'chat.error.title': '发生错误',
    'chat.button.dismiss': '关闭',
    'chat.button.newChat': '新对话',
    'chat.button.startNewChat': '开始新对话',
    'chat.label.noHistory': '暂无聊天记录',
    'chat.label.noMessages': '暂无消息',
    'chat.label.chatHistory': '聊天记录',
    'chat.button.delete': '删除聊天',
    'chat.label.me': '我：',
    'chat.label.them': '对方：'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}