import React, { useState, useEffect, useRef } from 'react';
import { TopSection } from './components/TopSection';
import { ChatHistory } from './components/ChatHistory';
import { ReplySection } from './components/ReplySection';
import { ResultsSection } from './components/ResultsSection';
import { FloatingButton } from './components/FloatingButton';
import { History } from './pages/History';
import { ChatMessage, ChatHistory as ChatHistoryType } from './types';
import { generateChatReply } from './services/openai';
import { LanguageProvider } from './contexts/LanguageContext';

interface Result {
  id: string;
  text: string;
}

function App() {
  const [showHistory, setShowHistory] = useState(true);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chatHistories, setChatHistories] = useState<ChatHistoryType[]>(() => {
    const saved = localStorage.getItem('chatHistories');
    return saved ? JSON.parse(saved) : [];
  });
  const [name, setName] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [theirReply, setTheirReply] = useState('');
  const [myReply, setMyReply] = useState('');
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<string>('warm');

  const replySectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('chatHistories', JSON.stringify(chatHistories));
  }, [chatHistories]);

  useEffect(() => {
    if (!showHistory && messages.length > 0) {
      const chatId = currentChatId || Date.now().toString();
      const chatName = name.trim() || new Date().toLocaleDateString();
      
      const updatedChat: ChatHistoryType = {
        id: chatId,
        name: chatName,
        messages,
        lastActive: new Date(),
        results
      };

      setChatHistories(prev => {
        const existing = prev.findIndex(chat => chat.id === chatId);
        if (existing !== -1) {
          const updated = [...prev];
          updated[existing] = updatedChat;
          return updated;
        }
        return [updatedChat, ...prev];
      });

      setCurrentChatId(chatId);
    }
  }, [messages, name, currentChatId, showHistory, results]);

  useEffect(() => {
    if (replySectionRef.current) {
      replySectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [messages, currentResult]);

  const handleStartNewChat = () => {
    setError(null);
    setCurrentChatId(null);
    setName('');
    setMessages([]);
    setResults([]);
    setShowHistory(false);
  };

  const handleOpenChat = (chatHistory: ChatHistoryType) => {
    setError(null);
    setCurrentChatId(chatHistory.id);
    setName(chatHistory.name);
    setMessages(chatHistory.messages);
    setResults(chatHistory.results || []);
    setShowHistory(false);
  };

  const handleBack = () => {
    setShowHistory(true);
  };

  const handleSubmitReplies = () => {
    if (theirReply.trim()) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: theirReply,
        timestamp: new Date(),
        user: 'them'
      }]);
      setTheirReply('');
    }
    if (myReply.trim()) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: myReply,
        timestamp: new Date(),
        user: 'me'
      }]);
      setMyReply('');
    }
  };

  const handleGetReply = async () => {
    if (messages.length === 0) {
      setError('Please add some messages to the conversation first');
      return;
    }
    
    setIsLoading(true);
    setCurrentResult('');
    setError(null);
    
    try {
      const lastMessage = messages[messages.length - 1]?.content;
      const summarizedHistory = messages
        .slice(-5)
        .map(msg => `${msg.user}: ${msg.content}`)
        .join('\n');

      const response = await generateChatReply(
        {
          session_id: currentChatId || Date.now().toString(),
          tone: selectedTone,
          last_message: lastMessage,
          summarized_history: summarizedHistory,
          keyword: keyword
        },
        (chunk, isComplete) => {
          setCurrentResult(chunk);
          if (isComplete) {
            const newResult = {
              id: Date.now().toString(),
              text: chunk
            };
            setResults(prev => [newResult, ...prev]);
            setIsLoading(false);
          }
        }
      );
    } catch (error) {
      console.error('Failed to get reply:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate reply');
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <LanguageProvider>
      {showHistory ? (
        <History 
          histories={chatHistories}
          onStartNewChat={handleStartNewChat}
          onOpenChat={handleOpenChat}
          onDeleteChat={(chatId) => {
            setChatHistories(prev => prev.filter(chat => chat.id !== chatId));
          }}
        />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 pb-20">
          <TopSection
            name={name}
            onNameChange={setName}
            onBack={handleBack}
          />
          <div ref={replySectionRef}>
            <ChatHistory messages={messages} />
            <ReplySection
              theirReply={theirReply}
              myReply={myReply}
              onTheirReplyChange={setTheirReply}
              onMyReplyChange={setMyReply}
              onSubmit={handleSubmitReplies}
              keyword={keyword}
              onKeywordChange={setKeyword}
            />
          </div>
          <ResultsSection 
            results={results} 
            onCopy={copyToClipboard}
            currentResult={currentResult}
            isLoading={isLoading}
            error={error}
          />
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
            <FloatingButton 
              onClick={handleGetReply} 
              isLoading={isLoading} 
              disabled={messages.length === 0}
              tone={selectedTone}
              onToneChange={setSelectedTone}
            />
          </div>
        </div>
      )}
    </LanguageProvider>
  );
}

export default App;