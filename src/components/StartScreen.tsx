
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StartScreen: React.FC = () => {
  const [showStart, setShowStart] = useState(false);
  const [blinkStart, setBlinkStart] = useState(false);
  const navigate = useNavigate();

  // Logo animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStart(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Blinking "Press Start" text effect
  useEffect(() => {
    if (!showStart) return;
    
    const interval = setInterval(() => {
      setBlinkStart(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, [showStart]);

  const handleStart = () => {
    navigate('/game');
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleStart();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-game-blue">
      {/* Background pattern - pixelated grid */}
      <div className="absolute inset-0 w-full h-full opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
             backgroundSize: '20px 20px'
           }} />
      
      {/* Logo container with animation */}
      <div className="relative animate-float mb-8 mt-[-80px]">
        <img 
          src="/lovable-uploads/f6e7913e-c018-43d1-ac8a-4282d127a999.png" 
          alt="52G Monster Logo" 
          className="pixelated w-[320px] md:w-[500px] h-auto"
        />
      </div>
      
      {/* Press Start button */}
      {showStart && (
        <div 
          onClick={handleStart}
          className={`mt-12 cursor-pointer ${blinkStart ? 'opacity-100' : 'opacity-30'} transition-opacity`}
        >
          <div className="font-pixel text-white text-lg md:text-2xl pixel-text">
            Press Start
          </div>
        </div>
      )}
      
      {/* Decorative pixel monsters */}
      <div className="absolute bottom-8 left-8 pixelated w-16 h-16 bg-game-orange" 
           style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)' }} />
      
      <div className="absolute top-12 right-12 pixelated w-12 h-12 bg-game-green" 
           style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
      
      <div className="absolute bottom-12 right-16 pixelated w-10 h-10 animate-pulse-fade bg-game-orange" />
      
      {/* Copyright text */}
      <div className="absolute bottom-4 text-white text-xs font-pixel opacity-70">
        © 2024 52G MONSTER
      </div>
    </div>
  );
};

export default StartScreen;
