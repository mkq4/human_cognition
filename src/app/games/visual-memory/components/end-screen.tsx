import { EndScreenButtons } from '@/components/shared/end-screen-buttons';
import { GameScreen } from '@/components/shared/game-screen';
import { VisualMemoryContext } from '@/contexts/visualMemory.context';
import { useContext } from 'react';

export const EndScreen = () => {
  const { level, setScreen, setLevel } = useContext(VisualMemoryContext);
  return (
    <GameScreen>
      <div className={"game__screen"}>
        <p className="text-3xl font-bold text-center">
          Level <br /> {level}
        </p>
        
        <EndScreenButtons
          onClickRetryButton={() => {
            setScreen("game");
            setLevel(1);
          }}
        />
      </div>
    </GameScreen>
  );
};