// client/src/services/api.service.ts
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  context?: string;
}

class ApiService {
  async sendMessage(request: ChatRequest): Promise<string> {
    try {
      const response = await axios.post(API_ENDPOINTS.chat, request);
      return response.data.response;
    } catch (error) {
      console.error('Chat API error:', error);
      throw new Error('Failed to get response');
    }
  }

  async synthesizeSpeech(text: string): Promise<Blob> {
    try {
      const response = await axios.post(
        API_ENDPOINTS.synthesize,
        { text },
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      console.error('Voice synthesis error:', error);
      throw new Error('Failed to synthesize speech');
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await axios.get(API_ENDPOINTS.health);
      return response.data.status === 'OK';
    } catch (error) {
      return false;
    }
  }
}

export default new ApiService();