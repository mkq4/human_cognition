import { GameScreen } from '@/components/shared/game-screen';
import { Area } from './area';

export const MainScreen = () => {
  return (
    <GameScreen>
      {/* // generating area */}
      <Area />
    </GameScreen>
  );
};