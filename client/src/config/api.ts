// client/src/config/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  chat: `${API_BASE_URL}/chat/message`,
  synthesize: `${API_BASE_URL}/voice/synthesize`,
  voices: `${API_BASE_URL}/voice/voices`,
  health: `${API_BASE_URL}/health`,
};

export default API_BASE_URL;