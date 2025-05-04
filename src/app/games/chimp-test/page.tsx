"use client";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Banana } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { generatePath } from "./index";
import s from "./chimp.module.css";
import Link from "next/link";
interface Props {
  className?: string;
  setScreen: (screen: ScreenType) => void;
  level?: number;
  setLevel?: (level: number) => void;
}

type ScreenType = "start" | "game" | "end";

const ChimpTestPage = ({ className }: Props) => {
  const [screen, setScreen] = useState<ScreenType>("start");
  const [level, setLevel] = useState<number>(1);
  return (
    <div className={"game__screen"}>
      <Container className="flex items-center justify-center">
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
              return <EndScreen setScreen={setScreen} />;
            default:
              return null;
          }
        })()}
      </Container>
    </div>
  );
};

const StartScreen = ({ setScreen }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Banana size={125} />
      <p className="text-2xl">How monkey you are?</p>
      <Button onClick={() => setScreen("game")}>Start game</Button>
    </div>
  );
};

// GameScreen
const GameScreen = ({ setScreen, level, setLevel }: Props) => {
  const [hideBlocks, setHideBlocks] = useState<boolean>(false);
  const path = useMemo(() => generatePath(level as number), [level]);
  const [correctBlock, setCorrectBlock] = useState<number>(1);
  const [deletedBlocks, setDeletedBlocks] = useState<number[]>([]);

  const handleCorrectClick = () => {
    setCorrectBlock((prev) => prev + 1);
  };

  return (
    <div className="grid grid-cols-8 gap-2 justify-center">
      {Array.from({ length: 40 }).map((_, index) => (
        <Block
          key={index}
          index={index}
          label={path[index]}
          correctBlock={correctBlock}
          onCorrectClick={handleCorrectClick}
          setHideBlocks={setHideBlocks}
          hideBlocks={hideBlocks}
          setCorrectBlock={setCorrectBlock}
          deletedBlocks={deletedBlocks}
          setDeletedBlocks={setDeletedBlocks}
          length={Object.keys(path).length}
          setLevel={setLevel}
          level={level}
          setScreen={setScreen}
        />
      ))}
    </div>
  );
};

// Block
type BlockProps = {
  className?: string;
  index: number;
  label?: number;
  correctBlock: number;
  onCorrectClick: () => void;
  hideBlocks: boolean;
  setHideBlocks: (value: boolean) => void;
  setCorrectBlock: (value: number) => void;
  deletedBlocks: number[];
  setDeletedBlocks: (value: number[]) => void;
  length: number;
  setLevel?: (level: number) => void;
  level?: number;
  setScreen: (screen: ScreenType) => void;
};

const Block = ({
  className,
  label,
  correctBlock,
  setCorrectBlock,
  hideBlocks,
  setHideBlocks,
  deletedBlocks,
  setDeletedBlocks,
  length,
  setLevel,
  level,
  setScreen,
}: BlockProps) => {
  const clear = () => {
    setHideBlocks(false);
    setCorrectBlock(1);
    setDeletedBlocks([]);
  };

  const handleClick = () => {
    if (deletedBlocks.includes(label as number)) return;

    if (!setLevel) return null;

    if (!hideBlocks) {
      setHideBlocks(true);
    }

    // console.log(correctBlock)

    if (label === correctBlock) {
      // correct click
      setCorrectBlock(correctBlock + 1);
      setDeletedBlocks([...deletedBlocks, label]);

      //check end game
      if (deletedBlocks.length + 1 === length) {
        console.log("win");
        //next level
        // reset
        clear();
        setLevel((level as number) + 1);
      }
    } else {
      clear();
      setLevel(1);
      setScreen("end");
    }
  };

  if (label === undefined) return <div className={className}></div>;

  return (
    <div
      className={`${hideBlocks ? s.hidden__block : s.block__item} ${
        deletedBlocks.includes(label) ? s.deleted__block : ""
      }`}
      onClick={handleClick}
    >
      {hideBlocks ? "" : label}
    </div>
  );
};

const EndScreen = ({ setScreen }: Props) => {
  return (
    <div className="flex flex-col">
      <p className="text-3xl mb-5">Monkey smarter then you nigga!</p>
      <div className="flex gap-3 justify-center">
        <Link
          className="text-xl bg-fuchsia-200 p-2 rounded-md cursor-pointer hover:bg-fuchsia-300"
          href="/"
        >
          Back to home
        </Link>
        <Button onClick={() => setScreen("game")}>Play again</Button>
        <Button>Save result</Button>
      </div>
    </div>
  );
};

export default ChimpTestPage;
