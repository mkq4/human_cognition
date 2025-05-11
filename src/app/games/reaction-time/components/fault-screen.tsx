import { Accessibility } from 'lucide-react';
import { ScreenProps } from '../page';

export const FaultScreen = ({ setScreen }: ScreenProps) => {
  return (
    <div
      className={`text-3xl cursor-pointer game__screen`}
      onClick={() => setScreen("waiting")}
    >
      <Accessibility size={100} />
      <p>You are stupid ass nigga</p>
      <p>Wait for PINK and then CLICK</p>
      <p>click to retry</p>
    </div>
  );
};
