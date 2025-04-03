
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Tile types for the map
type TileType = 'grass' | 'tree' | 'path';

const GameScreen: React.FC = () => {
  const navigate = useNavigate();
  
  // Player position
  const [playerPosition, setPlayerPosition] = useState({ x: 7, y: 7 });
  // Dialog state
  const [showDialog, setShowDialog] = useState(true);
  const [dialogText, setDialogText] = useState('이상한 나무다! 꼬꼬기 몬스터게임을 시작하겠습니까?');
  
  // Map definition (15x10 grid)
  // 0 = grass, 1 = tree, 2 = path
  const mapLayout = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,0,0,0,0,1,1,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ];
  
  // Handle keyboard movement
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    
    setPlayerPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;
      
      // Calculate new position based on key press
      if (key === 'ArrowUp') newY = Math.max(0, prev.y - 1);
      else if (key === 'ArrowDown') newY = Math.min(mapLayout.length - 1, prev.y + 1);
      else if (key === 'ArrowLeft') newX = Math.max(0, prev.x - 1);
      else if (key === 'ArrowRight') newX = Math.min(mapLayout[0].length - 1, prev.x + 1);
      else return prev; // No movement for other keys
      
      // Check if new position is on a tree tile (1)
      if (mapLayout[newY][newX] === 1) {
        // Can't move onto trees
        return prev;
      }
      
      return { x: newX, y: newY };
    });
    
    // Handle space or enter key to proceed in dialog
    if (key === ' ' || key === 'Enter') {
      if (showDialog) {
        setShowDialog(false);
      } else {
        setShowDialog(true);
      }
    }
  }, [mapLayout, showDialog]);
  
  // Set up keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  // Return to start screen
  const handleBackToMenu = () => {
    navigate('/');
  };
  
  return (
    <div className="flex flex-col h-full items-center justify-center relative bg-black p-4">
      {/* Game window with retro frame */}
      <div className="max-w-3xl w-full h-full bg-gray-800 relative flex flex-col pixel-border overflow-hidden">
        {/* Game map area */}
        <div className="flex-1 relative overflow-hidden bg-black">
          {/* Render map tiles */}
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
            <div 
              className="grid pixelated"
              style={{ 
                gridTemplateColumns: `repeat(${mapLayout[0].length}, 24px)`,
                transform: `translate(-${playerPosition.x * 24 - 150}px, -${playerPosition.y * 24 - 100}px)`,
                transition: 'transform 0.15s'
              }}
            >
              {mapLayout.map((row, y) => 
                row.map((tile, x) => (
                  <div 
                    key={`${x}-${y}`} 
                    className={`w-6 h-6 pixelated ${
                      tile === 0 ? 'bg-game-light-green' : 
                      tile === 1 ? 'bg-green-800' : 'bg-yellow-200'
                    }`}
                    style={{
                      boxShadow: tile === 1 ? 'inset 0 -4px 0 rgba(0,0,0,0.3)' : 'none'
                    }}
                  >
                    {/* Add tree details for tree tiles */}
                    {tile === 1 && (
                      <div className="w-full h-4 bg-green-700 absolute top-0 pixelated"
                           style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}></div>
                    )}
                  </div>
                ))
              )}
              
              {/* Render player */}
              <div 
                className="absolute w-6 h-6 pixelated"
                style={{ 
                  left: `${playerPosition.x * 24}px`, 
                  top: `${playerPosition.y * 24}px`,
                  backgroundImage: `url('/lovable-uploads/7627f9db-f702-463c-8474-06bc8a758acc.png')`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  imageRendering: 'pixelated'
                }}
              >
                {/* Player sprite fallback if image doesn't load properly */}
                <div className="w-4 h-4 bg-red-500 mx-auto mt-1 pixelated" 
                     style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                <div className="w-4 h-2 bg-blue-500 mx-auto pixelated"></div>
              </div>
            </div>
          </div>
          
          {/* Menu button */}
          <div className="absolute top-2 right-2 pixel-border z-20">
            <div className="bg-white p-2 font-pixel text-xs">
              <div>▶ 메</div>
              <div>뉴</div>
            </div>
          </div>
        </div>
        
        {/* Dialog box */}
        {showDialog && (
          <div className="bg-white m-2 p-2 pixel-border text-left h-24 flex flex-col">
            <div className="font-pixel text-sm mb-2">{dialogText}</div>
            <div className="ml-auto mt-auto font-pixel text-xs">▼ 계속</div>
          </div>
        )}
      </div>
      
      {/* Back button outside game frame */}
      <Button 
        variant="outline" 
        className="absolute top-2 left-2 font-pixel text-xs" 
        onClick={handleBackToMenu}
      >
        돌아가기
      </Button>
    </div>
  );
};

export default GameScreen;
