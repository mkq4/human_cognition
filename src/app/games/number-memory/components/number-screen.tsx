import { LineTimer } from '@/components/ui/line-timer';
import { useEffect, useState } from 'react';
import { getDelay, getNumbers } from '..';
import { ScreenProps } from '../page';

export const NumberScreen = ({ setScreen, setNumber, level, number }: ScreenProps) => {
  // timer + number
  const [timer, setTimer] = useState<number>(0);
  if (!setNumber) return null;

  //number generator
  useEffect(() => {
    // const number
    const number = getNumbers(level as number);
    const delay = getDelay(level as number);
    setTimer(delay);
    console.log("delay", delay);
    setNumber(number);

    //timeout

    const timer = setTimeout(() => {
      setScreen("input");
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={"game__screen"}>
      <p className="text-2xl">remember this shit</p>
      <p className="text-5xl select-none pointer-events-none font-bold">
        {number}
      </p>
      <LineTimer time={timer} />
    </div>
  );
};