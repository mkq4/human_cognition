import { useEffect, useState } from 'react';
import { ScreenProps, screenStyles } from '../page';

export const ClickScreen = ({
  setScreen,
  setTime,
}: ScreenProps & { setTime: (time: number) => void }) => {
  const [start, setStart] = useState<number>(0);

  useEffect(() => {
    setStart(Date.now());
  }, []);

  return (
    <div
      className={screenStyles}
      onClick={() => {
        const result = Date.now() - start;
        console.log(result);
        setTime(result);
        setScreen("end");
      }}
    >
      <p className="text-3xl">Click!</p>
    </div>
  );
};