// client/src/App.tsx
import React, { useState } from 'react';
import Home from './components/Home';
import ChatInterface from './components/ChatInterface';
import './App.css';

type Screen = 'home' | 'personal-training' | 'premium-content';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const handleSelectOption = (option: 'personal-training' | 'premium-content') => {
    setCurrentScreen(option);
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  return (
    <div className="App">
      {currentScreen === 'home' ? (
        <Home onSelectOption={handleSelectOption} />
      ) : (
        <ChatInterface 
          context={currentScreen as 'personal-training' | 'premium-content'} 
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;