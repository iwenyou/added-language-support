import { ChatContext, Result, ApiError } from '../types';

const API_ENDPOINT = 'https://api.example.com/chat';

export async function generateReply(context: ChatContext): Promise<Result> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: context.messages,
        name: context.name,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate reply');
    }

    const data = await response.json();
    return {
      id: Date.now().toString(),
      text: data.reply,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to generate reply');
  }
}