import { useEffect } from 'react';
import { ScreenProps, screenStyles } from '../page';
import { Hand } from 'lucide-react';

export const WaitingScreen = ({ setScreen }: ScreenProps) => {
  useEffect(() => {
    const delay = Math.floor(Math.random() * 5 + 3) * 1000;
    // const delay = Math.floor(Math.random() * 5 + 3) * 1000000;

    const timeoutId = setTimeout(() => {
      console.log("timer starts");
      setScreen("click");
    }, delay);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`${screenStyles}`} onClick={() => setScreen("fault")}>
      <Hand size={150} />
      <p className="text-3xl">Wait for the pink screen</p>
    </div>
  );
};
