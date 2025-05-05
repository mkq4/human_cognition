"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { GameScreen } from "@/components/shared/game-screen";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Target } from "lucide-react";
import React from "react";
import Link from "next/link";
interface Props {
  className?: string;
  setScreen?: (screen: ScreenType) => void;
  children?: React.ReactNode;
  startTimer?: number;
}

type ScreenType = "start" | "main" | "end";

const AimTrainerPage = ({ className }: Props) => {
  const [screen, setScreen] = useState<ScreenType>("start");
  const [startTimer, setStartTimer] = useState<number>(0);

  console.log(screen);
  return (
    <div className="bg-[#85b5ed]">
      <Container>
        {(() => {
          switch (screen) {
            case "start":
              return <StartScreen setScreen={setScreen} />;
            case "main":
              return (
                <MainScreen
                  setScreen={setScreen}
                  setStartTimer={setStartTimer}
                />
              );
            case "end":
              return (
                <EndScreen setScreen={setScreen} startTimer={startTimer} />
              );
            default:
              return null;
          }
        })()}
      </Container>
    </div>
  );
};

const StartScreen = ({ setScreen }: Props) => {
  if (!setScreen) return null;

  return (
    <GameScreen>
      <div className="text-3xl text-center">
        <p>Aim trainer game</p>
        <p>Click on targets as fast as you can</p>
      </div>
      <Button onClick={() => setScreen("main")}>Start Game</Button>
    </GameScreen>
  );
};

const MainScreen = ({
  setScreen,
  setStartTimer,
}: {
  setScreen: (screen: ScreenType) => void;
  setStartTimer: (date: number) => void;
}) => {
  const gameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const start = new Date().getTime();
    setStartTimer(start);
    console.log(start);
  }, []);
  return (
    <GameScreen className="relative" ref={gameRef}>
      <Aim gameRef={gameRef} setScreen={setScreen} />
    </GameScreen>
  );
};

const Aim = ({
  gameRef,
  setScreen,
}: {
  gameRef: React.RefObject<HTMLDivElement | null>;
  setScreen: (screen: ScreenType) => void;
}) => {
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

const Counter = ({ count }: { count: number }) => {
  return <div className="absolute top-0 right-0 p-4 text-xl">{count}</div>;
};

const EndScreen = ({ setScreen, startTimer }: Props) => {
  if (!startTimer || !setScreen) return null;

  const result = useMemo(() => {
    const endTime = (new Date().getTime() - startTimer) / 1000;
    return endTime;
  }, [startTimer]);

  return (
    <GameScreen>
      <p className="text-3xl">{result} seconds</p>
      <div className="flex gap-3 justify-center">
        <Link
          className="text-xl bg-fuchsia-200 p-2 rounded-md cursor-pointer hover:bg-fuchsia-300"
          href="/"
        >
          Back to home
        </Link>
        <Button
          onClick={() => {
            setScreen("main");
          }}
        >
          Play again
        </Button>
        <Button>Save result</Button>
      </div>
    </GameScreen>
  );
};

export default AimTrainerPage;
