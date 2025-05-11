import { ScreenType } from '@/types/screen';
import { Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Counter } from './counter';

interface Props {
  gameRef: React.RefObject<HTMLDivElement | null>;
  setScreen: (screen: ScreenType) => void;
}

export const Aim = ({
  gameRef,
  setScreen,
}: Props) => {
  const [counter, setCounter] = useState(15);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const PADDING = 100;

  const move = () => {
    if (gameRef.current) {
      const W = gameRef.current.clientWidth;
      const H = gameRef.current.clientHeight;

      const left = Math.floor(Math.random() * (W - 2 * PADDING)) + PADDING;
      const top = Math.floor(Math.random() * (H - 2 * PADDING)) + PADDING;

      setCoords({ top, left });
    }
  };

  const handleClick = () => {
    if (counter < 2) {
      setScreen("end");
    }
    setCounter((prev) => prev - 1);
    move();
  };

  useEffect(() => {
    move();
  }, []);

  return (
    <>
      <Counter count={counter} />
      <Target
        size={100}
        style={{ top: coords.top, left: coords.left }}
        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
        onClick={handleClick}
      />
    </>
  );
};

