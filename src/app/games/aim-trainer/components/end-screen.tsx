import { useMemo } from 'react';
import { ScreenType } from '@/types/screen';
import { GameScreen } from '@/components/shared/game-screen';
import { EndScreenButtons } from '@/components/shared/end-screen-buttons';

interface Props {
  setScreen?: (screen: ScreenType) => void;
  startTimer?: number;
}

export const EndScreen = ({ setScreen, startTimer }: Props) => {
  if (!startTimer || !setScreen) return null;

  const result = useMemo(() => {
    const endTime = (new Date().getTime() - startTimer) / 1000;
    return endTime;
  }, [startTimer]);

  return (
    <GameScreen>
      <p className="text-3xl cursor-pointer">{result} seconds</p>
      <EndScreenButtons onClickRetryButton={() => setScreen('main')}/>
    </GameScreen> 
  );
};