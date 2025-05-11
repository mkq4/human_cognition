
import { useEffect, useRef, useState } from 'react';
import { generateSeq } from '..';
import { ShowArea } from './show-area';
import { ScreenType } from '../page';

export const Area = ({
  level,
  setLevel,
  setScreen,
}: {
  level: number;
  setLevel: (level: number) => void;
  setScreen: (screen: ScreenType) => void;
}) => {
  const [seq, setSeq] = useState<number[]>([]);
  const seqIndex = useRef<number>(0); // for seq indexing
  const [showArea, setShowArea] = useState<boolean>(true);
  const [activeClickId, setActiveClickId] = useState<number | null>(null);

  const handleBlockClick = (blockId: number) => {
    console.log("block clicked", blockId);
    const correct = seq[seqIndex.current];

    if (blockId === correct) {
      console.log("correct answer");
      //check if last
      setActiveClickId(blockId);
      setTimeout(() => {
        setActiveClickId(null);
      }, 1000);

      if (seqIndex.current === seq.length - 1) {
        setTimeout(() => {
          setLevel(level + 1);
        }, 500);
        return;
      }

      seqIndex.current += 1;

    } else {
      seqIndex.current = 0;
      setScreen("end");
    }
  };

  useEffect(() => {
    //generating new seq with next level
    const res = generateSeq(level, seq);
    setSeq(res);
    console.log(res);

    // index - 0
    seqIndex.current = 0;
    setShowArea(true);
  }, [level]);

  if (showArea) {
    return <ShowArea seq={seq} setShowArea={setShowArea} />;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, i) => {
        // generate 9 blocks
        return (
          <div
            key={i}
            className={`rounded-l w-[120px] h-[120px] transition-colors duration-300 
          ${activeClickId === i ? "bg-white" : "bg-[#6399d6]"} 
          cursor-pointer`}
            onClick={() => handleBlockClick(i)}
          >
          </div>
        );
      })}
    </div>
  );
};