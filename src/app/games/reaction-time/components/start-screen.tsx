import { Timer } from 'lucide-react';
import { ScreenProps, screenStyles } from '../page';

export const StartScreen = ({ setScreen }: ScreenProps) => {
  return (
    <div
      className={`${screenStyles} cursor-pointer`}
      onClick={() => {
        setScreen("waiting");
      }}
    >
      <Timer size={150} />
      <p className="text-4xl mt-5">When screens turns pink - click!</p>
      <p className="text-2xl">Click to start!</p>
    </div>
  );
};
