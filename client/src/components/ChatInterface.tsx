// client/src/components/ChatInterface.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2, Loader, ArrowLeft } from 'lucide-react';
import apiService, { ChatMessage } from '../services/api.service';
import './ChatInterface.css';

interface ChatInterfaceProps {
  context: 'personal-training' | 'premium-content';
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ context, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: context === 'personal-training' 
        ? "Hello! I'm Martin from EbyLife. How can I help you with your strength training journey today?"
        : "Welcome to EbyLife Premium Content. I can help you with one-on-one sessions, diet plans, and online training programmes. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await apiService.sendMessage({ 
        message: input,
        context 
      });
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'en-GB';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      setIsRecording(true);
    }
  };

  const handleSpeak = async (text: string) => {
    setIsSpeaking(true);
    try {
      const audioBlob = await apiService.synthesizeSpeech(text);
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (error) {
      console.error('Speech error:', error);
      setIsSpeaking(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2>EbyLife {context === 'personal-training' ? 'Personal Training' : 'Premium Content'}</h2>
          <p>Powered by Martin Ebner's Expertise</p>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="message-content">
              {msg.content}
            </div>
            {msg.role === 'assistant' && (
              <button
                className="speak-btn"
                onClick={() => handleSpeak(msg.content)}
                disabled={isSpeaking}
              >
                <Volume2 size={16} />
              </button>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="message-content">
              <Loader className="spinning" size={20} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={context === 'personal-training' 
            ? "Ask about training, exercises, or nutrition..."
            : "Ask about premium services, diet plans, or online sessions..."}
          disabled={isLoading}
        />
        <button
          onClick={handleVoiceInput}
          className={`voice-btn ${isRecording ? 'recording' : ''}`}
        >
          <Mic size={20} />
        </button>
        <button onClick={handleSend} disabled={!input.trim() || isLoading}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;