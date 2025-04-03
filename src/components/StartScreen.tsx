
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
      {/* Pixel art background grid */}
      <div className="absolute inset-0 w-full h-full opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
             backgroundSize: '8px 8px'
           }} />
      
      {/* Pixel clouds */}
      <div className="absolute w-full h-full pointer-events-none">
        <div className="absolute bottom-[20%] left-[10%] w-24 h-12 bg-white pixelated" style={{
          clipPath: 'polygon(0% 50%, 25% 25%, 75% 25%, 100% 50%, 75% 75%, 25% 75%)'
        }}></div>
        <div className="absolute bottom-[30%] left-[30%] w-32 h-16 bg-white pixelated" style={{
          clipPath: 'polygon(0% 50%, 20% 25%, 80% 25%, 100% 50%, 80% 75%, 20% 75%)'
        }}></div>
        <div className="absolute bottom-[15%] left-[60%] w-28 h-14 bg-white pixelated" style={{
          clipPath: 'polygon(0% 50%, 25% 25%, 75% 25%, 100% 50%, 75% 75%, 25% 75%)'
        }}></div>
      </div>
      
      {/* Flying monster silhouette */}
      <div className="absolute bottom-[40%] left-[20%] w-24 h-16 bg-black pixelated" 
           style={{ 
             clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 60%, 70% 90%, 50% 70%, 30% 90%, 0% 60%, 0% 30%)'
           }}>
        {/* Sparkle effects */}
        <div className="absolute -right-1 -top-1 w-3 h-3 bg-yellow-300 animate-pulse-fade pixelated" 
             style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
        <div className="absolute -right-4 top-6 w-2 h-2 bg-yellow-300 animate-pulse-fade delay-150 pixelated" 
             style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
      </div>
      
      {/* Logo container */}
      <div className="relative animate-float mb-8 z-10">
        <div className="absolute inset-0 w-full h-full bg-purple-600 opacity-20 transform translate-x-2 translate-y-2 pixelated"></div>
        <img 
          src="/lovable-uploads/f6e7913e-c018-43d1-ac8a-4282d127a999.png" 
          alt="52G Monster Logo" 
          className="pixelated w-[280px] md:w-[400px] h-auto relative z-10"
        />
        
        {/* Subtitle with pixel border */}
        <div className="mt-4 mx-auto w-fit pixel-border">
          <div className="font-pixel text-white text-sm md:text-base bg-red-600 px-4 py-1">
            POCKET MONSTERS
          </div>
        </div>
      </div>
      
      {/* Press Start button with pixel border */}
      {showStart && (
        <div 
          onClick={handleStart}
          className={`mt-8 cursor-pointer pixel-border ${blinkStart ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
        >
          <div className="font-pixel text-black bg-white text-sm md:text-lg px-4 py-2">
            PRESS START
          </div>
        </div>
      )}
      
      {/* Additional pixel decorations */}
      <div className="absolute top-[25%] right-[15%] w-8 h-8 bg-game-green pixelated" 
           style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
      
      <div className="absolute bottom-[10%] right-[25%] w-6 h-6 bg-game-orange pixelated" 
           style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)' }}></div>
      
      {/* Game studio logo */}
      <div className="absolute bottom-6 font-pixel text-xs text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,0.8)]">
        ©2024 GAME FREAK inc.
      </div>
    </div>
  );
};

export default StartScreen;
