import OpenAI from 'openai';
import { ChatContext } from '../types';
import { TONE_EMOJIS, CHAT_CONFIG, formatChatMessages } from './chatConfig';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateChatReply(
  context: ChatContext,
  onChunk?: (chunk: string, isComplete: boolean) => void
): Promise<string> {
  try {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const messages = formatChatMessages(context);

    console.log('OpenAI API Request:', {
      messages,
      timestamp: new Date().toISOString()
    });

    const completion = await openai.chat.completions.create({
      messages,
      ...CHAT_CONFIG
    });

    let fullResponse = '';
    const toneEmoji = TONE_EMOJIS[context.tone as keyof typeof TONE_EMOJIS] || '🤗';
    let isFirstChunk = true;

    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        if (isFirstChunk) {
          // Add emoji at the start of the response
          fullResponse = `${toneEmoji}\n\n`;
          onChunk?.(fullResponse, false);
          isFirstChunk = false;
        }
        
        // Stream each character individually
        for (const char of content) {
          fullResponse += char;
          onChunk?.(fullResponse, false);
          // Add a small delay for a more natural typing effect
          await new Promise(resolve => setTimeout(resolve, 30));
        }
      }
    }

    // Signal completion
    onChunk?.(fullResponse, true);

    console.log('Assistant response:', {
      contentLength: fullResponse.length,
      preview: fullResponse.substring(0, 100) + '...'
    });

    return fullResponse;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}