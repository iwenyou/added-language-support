export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  user: 'me' | 'them';
}

export interface Result {
  id: string;
  text: string;
}

export interface ChatHistory {
  id: string;
  name: string;
  messages: ChatMessage[];
  lastActive: Date;
  results?: Result[];
}

export interface ChatContext {
  session_id: string;
  tone?: string;
  last_message?: string;
  summarized_history?: string;
  keyword?: string;
}