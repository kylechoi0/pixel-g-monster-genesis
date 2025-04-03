
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
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-game-blue overflow-hidden">
      {/* Pixel clouds */}
      <div className="absolute w-full h-full">
        <div className="absolute bottom-[20%] left-[10%] w-24 h-12 bg-white rounded-full"></div>
        <div className="absolute bottom-[30%] left-[30%] w-32 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-[15%] left-[60%] w-28 h-14 bg-white rounded-full"></div>
        <div className="absolute bottom-[25%] left-[80%] w-20 h-10 bg-white rounded-full"></div>
      </div>
      
      {/* Flying monster silhouette */}
      <div className="absolute bottom-[40%] left-[20%] w-24 h-16 bg-black pixelated" 
           style={{ 
             clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 60%, 70% 90%, 50% 70%, 30% 90%, 0% 60%, 0% 30%)'
           }}>
        {/* Sparkle effects */}
        <div className="absolute -right-1 -top-1 w-3 h-3 bg-yellow-300 animate-pulse-fade" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
        <div className="absolute -right-4 top-6 w-2 h-2 bg-yellow-300 animate-pulse-fade delay-150" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
      </div>
      
      {/* Logo container */}
      <div className="relative animate-float mb-8 mt-[-80px] z-10">
        <div className="absolute inset-0 w-full h-full bg-purple-600 opacity-20 transform translate-x-1 translate-y-1"></div>
        <img 
          src="/lovable-uploads/f6e7913e-c018-43d1-ac8a-4282d127a999.png" 
          alt="52G Monster Logo" 
          className="pixelated w-[320px] md:w-[500px] h-auto relative z-10"
        />
        
        {/* Subtitle */}
        <div className="mt-2 font-pixel text-red-600 text-sm md:text-lg tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
          POCKET MONSTERS
        </div>
      </div>
      
      {/* Press Start button */}
      {showStart && (
        <div 
          onClick={handleStart}
          className={`mt-8 cursor-pointer bg-white bg-opacity-80 px-8 py-2 border-4 border-black ${blinkStart ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
        >
          <div className="font-pixel text-black text-lg md:text-xl">
            PRESS START
          </div>
        </div>
      )}
      
      {/* Game studio logo */}
      <div className="absolute bottom-8 font-pixel text-xs md:text-sm text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,0.8)]">
        ©2024 GAME FREAK inc.
      </div>
    </div>
  );
};

export default StartScreen;
