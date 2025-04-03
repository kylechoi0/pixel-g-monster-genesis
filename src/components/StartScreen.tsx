
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StartScreen: React.FC = () => {
  const [showStart, setShowStart] = useState(false);
  const [blinkStart, setBlinkStart] = useState(false);
  const [cloudPosition1, setCloudPosition1] = useState(0);
  const [cloudPosition2, setCloudPosition2] = useState(30);
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

  // Cloud animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCloudPosition1(prev => (prev > 100 ? -20 : prev + 0.2));
      setCloudPosition2(prev => (prev > 100 ? -30 : prev + 0.15));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

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
      
      {/* Sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-game-blue to-game-dark-blue pixelated"></div>
      
      {/* Ground */}
      <div className="absolute bottom-0 w-full h-[20%] bg-game-green pixelated"></div>
      
      {/* Grass tufts */}
      <div className="absolute bottom-[20%] left-[10%] w-8 h-4 bg-game-light-green pixelated" 
           style={{ clipPath: 'polygon(0% 100%, 20% 0%, 40% 100%, 60% 0%, 80% 100%, 100% 0%, 100% 100%)' }}></div>
      <div className="absolute bottom-[20%] left-[25%] w-6 h-3 bg-game-light-green pixelated" 
           style={{ clipPath: 'polygon(0% 100%, 20% 0%, 40% 100%, 60% 0%, 80% 100%, 100% 0%, 100% 100%)' }}></div>
      <div className="absolute bottom-[20%] left-[45%] w-10 h-5 bg-game-light-green pixelated" 
           style={{ clipPath: 'polygon(0% 100%, 20% 0%, 40% 100%, 60% 0%, 80% 100%, 100% 0%, 100% 100%)' }}></div>
      <div className="absolute bottom-[20%] left-[75%] w-8 h-4 bg-game-light-green pixelated" 
           style={{ clipPath: 'polygon(0% 100%, 20% 0%, 40% 100%, 60% 0%, 80% 100%, 100% 0%, 100% 100%)' }}></div>
      
      {/* Pixel house */}
      <div className="absolute bottom-[20%] right-[15%] pixelated">
        {/* House body */}
        <div className="w-28 h-20 bg-game-orange pixelated"></div>
        {/* Roof */}
        <div className="absolute -top-10 -left-2 w-32 h-10 bg-red-800 pixelated"
             style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}></div>
        {/* Door */}
        <div className="absolute bottom-0 left-4 w-8 h-12 bg-yellow-900 pixelated"></div>
        {/* Window */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-200 pixelated"
             style={{ 
               boxShadow: 'inset 2px 0 0 rgba(0,0,0,0.3), inset 0 2px 0 rgba(0,0,0,0.3), inset -2px 0 0 rgba(0,0,0,0.3), inset 0 -2px 0 rgba(0,0,0,0.3)',
               border: '2px solid #000'
             }}></div>
        <div className="absolute top-4 right-4 w-4 h-8 bg-yellow-200 pixelated"></div>
        <div className="absolute top-4 right-8 w-4 h-8 bg-yellow-100 pixelated"></div>
      </div>
      
      {/* Moving clouds */}
      <div className="absolute top-[15%] w-24 h-12 bg-white pixelated" 
           style={{
             left: `${cloudPosition1}%`,
             clipPath: 'polygon(0% 50%, 25% 25%, 75% 25%, 100% 50%, 75% 75%, 25% 75%)'
           }}></div>
      <div className="absolute top-[30%] w-32 h-16 bg-white pixelated" 
           style={{
             left: `${cloudPosition2}%`,
             clipPath: 'polygon(0% 50%, 20% 25%, 80% 25%, 100% 50%, 80% 75%, 20% 75%)'
           }}></div>
      
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
      
      {/* Logo container - removed the background */}
      <div className="relative animate-float mb-8 z-10">
        <img 
          src="/lovable-uploads/f6e7913e-c018-43d1-ac8a-4282d127a999.png" 
          alt="52G Monster Logo" 
          className="pixelated w-[280px] md:w-[400px] h-auto relative z-10"
        />
        
        {/* Updated subtitle with pixel border */}
        <div className="mt-4 mx-auto w-fit pixel-border">
          <div className="font-pixel text-white text-sm md:text-base bg-red-600 px-4 py-1">
            52G MONSTER
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
