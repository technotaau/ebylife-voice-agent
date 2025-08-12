// client/src/components/Home.tsx
import React from 'react';
import { MessageSquare, Star } from 'lucide-react';
import './Home.css';

interface HomeProps {
  onSelectOption: (option: 'personal-training' | 'premium-content') => void;
}

const Home: React.FC<HomeProps> = ({ onSelectOption }) => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>EbyLife AI Assistant</h1>
        <p>Your Personal Training Coach - Powered by Martin Ebner's Expertise</p>
      </div>
      
      <div className="home-content">
        <h2>Welcome to Your Training Journey</h2>
        <p>Select how you'd like to interact with your AI coach</p>
        
        <div className="option-cards">
          <div 
            className="option-card"
            onClick={() => onSelectOption('personal-training')}
          >
            <MessageSquare size={48} />
            <h3>Personal Training</h3>
            <p>Get instant guidance on exercises, form, and training programmes</p>
          </div>
          
          <div 
            className="option-card"
            onClick={() => onSelectOption('premium-content')}
          >
            <Star size={48} />
            <h3>Premium Content</h3>
            <p>Access exclusive sessions, diet plans, and personalised coaching</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;