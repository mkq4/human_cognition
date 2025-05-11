import { Banana } from 'lucide-react';
import { Props } from '../page';
import { Button } from '@/components/ui/button';

export const StartScreen = ({ setScreen }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Banana size={125} />
      <p className="text-2xl">How monkey you are?</p>
      <Button onClick={() => setScreen("game")}>Start game</Button>
    </div>
  );
};
