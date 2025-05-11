// Мне страшно это говно рефакторить

"use client";
import { useEffect, useRef, useState } from "react";
import { Combine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateSeq } from "./index";
import Link from "next/link";
import { EndScreenButtons } from '@/components/shared/end-screen-buttons';

type ScreenType = "start" | "game" | "end";

interface ScreenProps {
  className?: string;
  setScreen: (screen: ScreenType) => void;
  setLevel?: (level: number) => void;
  level?: number;
}

const SequenceMemoryPage = ({ className }: ScreenProps) => {
  const [screen, setScreen] = useState<ScreenType>("start");
  const [level, setLevel] = useState<number>(1);

  return (
    <div className={`${className} game__screen`}>
      {(() => {
        switch (screen) {
          case "start":
            return <StartScreen setScreen={setScreen} />;
          case "game":
            return (
              <GameScreen
                setScreen={setScreen}
                level={level}
                setLevel={setLevel}
              />
            );
          case "end":
            return (
              <EndScreen
                setScreen={setScreen}
                level={level}
                setLevel={setLevel}
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};

const StartScreen = ({ setScreen }: ScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Combine size={150} />
      <p className="text-3xl font-bold">Sequence Memory Game</p>
      <p className="text-xl">Memorize the sequence of blocks</p>
      <Button onClick={() => setScreen("game")}>Start game</Button>
    </div>
  );
};

const GameScreen = ({ setScreen, level, setLevel }: ScreenProps) => {
  if (!level || setLevel === undefined) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Area level={level} setLevel={setLevel} setScreen={setScreen} />
    </div>
  );
};

const Area = ({
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

const ShowArea = ({
  seq,
  setShowArea,
}: {
  seq: number[];
  setShowArea: (value: boolean) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    setCurrentIndex(0);
    setActiveId(null);
  }, [seq]);

  useEffect(() => {
    if (currentIndex >= seq.length) {
      setShowArea(false);
      return;
    }

    const id = seq[currentIndex];
    setActiveId(id);

    const hideTimer = setTimeout(() => {
      setActiveId(null);
    }, 500);

    const nextTimer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [currentIndex, seq, setShowArea]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, id) => (
        <div
          key={id}
          className={`
            w-[120px] h-[120px] rounded 
            transition-colors duration-300 ease-in-out
            ${activeId === id ? "bg-blue-50" : "bg-[#6399d6]"}
          `}
        />
      ))}
    </div>
  );
};

const EndScreen = ({ setScreen, setLevel, level }: ScreenProps) => {
  if (setLevel === undefined) return null;

  return (
    <div className={'game__screen'}>
      <p className="text-3xl font-bold text-center">
        Level <br /> {level}
      </p>
      <EndScreenButtons onClickRetryButton={() => {
        setScreen("game");
        setLevel(1);
      }}/>
    </div>
  );
};

export default SequenceMemoryPage;
