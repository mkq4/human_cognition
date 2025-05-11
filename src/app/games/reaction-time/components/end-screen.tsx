import { Button } from '@/components/ui/button';
import { ScreenProps } from '../page';
import Link from 'next/link';

export const EndScreen = ({ setScreen, time }: ScreenProps) => {
  return (
    <div
      className="game__screen"
      onClick={() => {
        setScreen("waiting");
      }}
    >
      <p className="text-2xl">Your result is</p>
      <p className="text-3xl">{time} ms</p>

      <p className="text-xl">click to retry</p>

      <Button
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Save the result
      </Button>

      <Link
        href="/"
        className="text-xl bg-fuchsia-200 p-2 rounded-md cursor-pointer hover:bg-fuchsia-300"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Back to main page
      </Link>
    </div>
  );
};
