import { GameScreen } from '@/components/shared/game-screen';
import { Button } from '@/components/ui/button';
import { ScreenType } from '@/types/screen';

interface Props {
    setScreen: (screen: ScreenType) => void; 
}

export const StartScreen = ({ setScreen }: Props) => {
  if (!setScreen) return null;

  return (
    <GameScreen>
      <div className="text-3xl text-center">
        <p>Aim trainer game</p>
        <p>Click on targets as fast as you can</p>
      </div>
      <Button onClick={() => setScreen("main")}>Start Game</Button>
    </GameScreen>
  );
};