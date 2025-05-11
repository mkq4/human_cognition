import { GameScreen } from '@/components/shared/game-screen';
import { Button } from '@/components/ui/button';
import { VisualMemoryContext } from '@/contexts/visualMemory.context';
import { Eye } from 'lucide-react';
import { useContext } from 'react';

export const StartScreen = () => {
  const { setScreen } = useContext(VisualMemoryContext);
  return (
    <GameScreen>
      <Eye size={150} />
      <p className="text-3xl">Visual memory game</p>
      <Button onClick={() => setScreen("game")}>Start</Button>
    </GameScreen>
  );
};
