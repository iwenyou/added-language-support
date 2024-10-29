import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { ChatContext } from '../types';
import { generateSystemPrompt, formatUserContext } from './prompts';

export const TONE_EMOJIS = {
  cool: '😎',
  warm: '🤗',
  'pickup-artist': '💫'
} as const;

export const CHAT_CONFIG = {
  model: "gpt-4",
  temperature: 0.7,
  stream: true
} as const;

export function formatSystemMessage(context: ChatContext): ChatCompletionMessageParam {
  return {
    role: "system",
    content: generateSystemPrompt(context)
  };
}

export function formatChatMessages(context: ChatContext): ChatCompletionMessageParam[] {
  const messages: ChatCompletionMessageParam[] = [
    formatSystemMessage(context)
  ];

  // Add chat history messages, treating both 'them' and 'me' as user messages
  if (context.summarized_history) {
    const historyMessages = context.summarized_history.split('\n').map(line => {
      const [speaker, content] = line.split(': ');
      return {
        role: 'user',
        content: `${speaker}: ${content}`
      } as ChatCompletionMessageParam;
    });
    messages.push(...historyMessages);
  }

  // Add the last message if it exists
  if (context.last_message) {
    messages.push({
      role: 'user',
      content: formatUserContext(context)
    });
  }

  return messages;
}