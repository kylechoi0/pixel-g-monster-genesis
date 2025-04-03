
import React, { useState, useEffect } from 'react';

const GameScreen: React.FC = () => {
  return (
    <div className="w-full h-full bg-game-dark-blue pixelated">
      <div className="w-full h-full flex items-center justify-center">
        <div className="font-pixel text-white text-xl">
          게임 화면이 준비중입니다...
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
