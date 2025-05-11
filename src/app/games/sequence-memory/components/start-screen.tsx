import { Combine } from 'lucide-react';
import { ScreenProps } from '../page';
import { Button } from '@/components/ui/button';

export const StartScreen = ({ setScreen }: ScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Combine size={150} />
      <p className="text-3xl font-bold">Sequence Memory Game</p>
      <p className="text-xl">Memorize the sequence of blocks</p>
      <Button onClick={() => setScreen("game")}>Start game</Button>
    </div>
  );
};