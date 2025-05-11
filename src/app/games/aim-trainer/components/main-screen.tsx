import { GameScreen } from '@/components/shared/game-screen';
import { ScreenType } from '@/types/screen';
import { useEffect, useRef } from 'react';
import { Aim } from './aim';

interface Props {
  setScreen: (screen: ScreenType) => void;
  setStartTimer: (date: number) => void;
}

export const MainScreen = ({
  setScreen,
  setStartTimer,
}: Props) => {
  const gameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const start = new Date().getTime();
    setStartTimer(start);
    console.log(start);
  }, []);
  return (
    <GameScreen className="relative" ref={gameRef}>
      <Aim gameRef={gameRef} setScreen={setScreen} />
    </GameScreen>
  );
};