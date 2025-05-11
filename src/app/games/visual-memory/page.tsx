"use client";
import { GameScreen } from "@/components/shared/game-screen";
import { Button } from "@/components/ui/button";
import {
  VisualMemoryContext,
  VisualMemoryProvider,
} from "@/contexts/visualMemory.context";
import { Eye } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { expandArea, getBlocks } from ".";
import Link from "next/link";
import { EndScreenButtons } from '@/components/shared/end-screen-buttons';

interface Props {
  className?: string;
}

const VisualMemoryPage = ({ className }: Props) => {
  return (
    <VisualMemoryProvider>
      <GameScreens />
    </VisualMemoryProvider>
  );
};

const GameScreens = () => {
  const { screen } = useContext(VisualMemoryContext);
  console.log(screen);
  return (
    <div>
      {(() => {
        switch (screen) {
          case "start":
            return <StartScreen />;
          case "game":
            return <MainScreen />;
          case "end":
            return <EndScreen />;
          default:
            return null;
        }
      })()}
    </div>
  );
};

const StartScreen = () => {
  const { setScreen } = useContext(VisualMemoryContext);
  return (
    <GameScreen>
      <Eye size={150} />
      <p className="text-3xl">Visual memory game</p>
      <Button onClick={() => setScreen("game")}>Start</Button>
    </GameScreen>
  );
};

const MainScreen = () => {
  return (
    <GameScreen>
      {/* // generating area */}
      <Area />
    </GameScreen>
  );
};

const Area = () => {
  console.log("area");
  const {
    blocksAmount,
    setBlocksAmount,
    level,
    setLevel,
    area,
    setArea,
    setScreen,
  } = useContext(VisualMemoryContext); // количество блоков
  const [seq, setSeq] = useState<number[]>([0]);
  const [previewSeq, setPreviewSeq] = useState<number[]>([0]);
  const blockSide = Math.floor(500 / blocksAmount - 20); // ширина блока
  const [isDisable, setIsDisable] = useState<boolean>(true);

  const handleBlockClick = (blockId: number) => {
    if (seq.includes(blockId)) {
      if (!previewSeq.includes(blockId)) {
        const nextPreviewSeq = [...previewSeq, blockId];
        setPreviewSeq(nextPreviewSeq);

        if (seq.sort().toString() === nextPreviewSeq.sort().toString()) {
          setSeq([]);
          setPreviewSeq([]);

          expandArea(level, blocksAmount, setBlocksAmount);

          setLevel(level + 1);
        }
      }
    } else {
      setSeq([]);
      setPreviewSeq([]);
      setScreen("end");
    }
  };

  useEffect(() => {
    const data = getBlocks(level, blocksAmount);
    setIsDisable(true);
    setSeq(data);
    setPreviewSeq(data);
    console.log(data);

    setTimeout(() => {
      setPreviewSeq([]);
      setIsDisable(false);
    }, 2000);
  }, [level]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${blocksAmount}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${blocksAmount}, minmax(0, 1fr))`,
      }}
      className="grid grid-cols-3 gap-3"
    >
      {Array.from({ length: blocksAmount ** 2 }).map((_, i) => {
        return (
          <div
            style={{ width: blockSide, height: blockSide }}
            className={`border-2 ${
              previewSeq.includes(i)
                ? "bg-white cursor-not-allowed hover:bg-white"
                : ""
            }
            ${
              isDisable
                ? "cursor-not-allowed"
                : "cursor-pointer hover:bg-blue-300"
            }
            `}
            onClick={() => {
              if (!isDisable) {
                handleBlockClick(i);
              }
            }}
          >
            
          </div>
        );
      })}
    </div>
  );
};

const EndScreen = () => {
  const { level, setScreen, setLevel } = useContext(VisualMemoryContext);
  return (
    <GameScreen>
      <div className={"game__screen"}>
        <p className="text-3xl font-bold text-center">
          Level <br /> {level}
        </p>
        
        <EndScreenButtons
          onClickRetryButton={() => {
            setScreen("game");
            setLevel(1);
          }}
        />
      </div>
    </GameScreen>
  );
};

export default VisualMemoryPage;
