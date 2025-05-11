import { Button } from '@/components/ui/button';
import { ScreenProps } from '../page';

export const StartScreen = ({ setScreen }: ScreenProps) => {
  return (
    <div className={'game__screen'}>
      <h1 className="text-4xl font-bold">Number Memory Game</h1>
      <p className="text-2xl">Remember more numbers as you can</p>

      <Button className="text-xl" onClick={() => setScreen("number")}>
        Click here to start
      </Button>
    </div>
  );
};