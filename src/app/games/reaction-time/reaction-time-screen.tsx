"use client";
import { useEffect, useState, useRef } from "react";
import { Container } from "@/components/shared/container";
import { Timer, Hand, Accessibility } from "lucide-react";
import Link from "next/link";
import { Button } from '@/components/ui/button';

interface Props {
  className?: string;
}

type ScreenType = "start" | "waiting" | "click" | "end" | "fault";

type ScreenProps = {
  setScreen: (screen: ScreenType) => void;
  time?: number;
};

const backgroundColors = {
  start: "[#85b5ed]",
  waiting: "rose-400",
  click: "fuchsia-300",
  end: "[#85b5ed]",
  fault: "[#85b5ed]",
};

const screenStyles =
  "flex flex-col items-center justify-center py-10 gap-5 h-full cursor-pointer";

export const ReactionTimeScreen = ({ className }: Props) => {
  const [screen, setScreen] = useState<ScreenType>("start");
  const [time, setTime] = useState<number>(0);
    console.log(`bg-${backgroundColors[screen]}`);

  return (
    <div className={`${className} bg-${backgroundColors[screen]} h-[500px]`}>
      <Container>
        {(() => {
          switch (screen) {
            case "start":
              return <StartScreen setScreen={setScreen} />;
            case "waiting":
              return <WaitingScreen setScreen={setScreen} />;
            case "click":
              return <ClickScreen setScreen={setScreen} setTime={setTime} />;
            case "end":
              return <EndScreen setScreen={setScreen} time={time} />;
            case "fault":
              return <FaultScreen setScreen={setScreen} />;
            default:
              return null;
          }
        })()}
      </Container>
    </div>
  );
};

const StartScreen = ({ setScreen }: ScreenProps) => {
  return (
    <div
      className={screenStyles}
      onClick={() => {
        setScreen("waiting");
      }}
    >
      <Timer size={150} />
      <p className="text-4xl mt-5">When screens turns pink - click!</p>
      <p className="text-2xl">Click to start!</p>
    </div>
  );
};

const WaitingScreen = ({ setScreen }: ScreenProps) => {
  useEffect(() => {
    const delay = Math.floor(Math.random() * 5 + 3) * 1000;

    const timeoutId = setTimeout(() => {
      console.log("timer starts");
      setScreen("click");
    }, delay);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`${screenStyles} ${backgroundColors['waiting']}`} onClick={() => setScreen("fault")}>
      <Hand size={150} />
      <p className="text-3xl">Wait for the pink screen</p>
    </div>
  );
};

const ClickScreen = ({
  setScreen,
  setTime,
}: ScreenProps & { setTime: (time: number) => void }) => {
  const [start, setStart] = useState<number>(0);

  useEffect(() => {
    setStart(Date.now());
  }, []);

  return (
    <div
      className={`${screenStyles} bg-fuchsia-300`}
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

const EndScreen = ({ setScreen, time }: ScreenProps) => {
  return (
    <div
      className={screenStyles}
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

const FaultScreen = ({ setScreen }: ScreenProps) => {
  return (
    <div
      className={`${screenStyles} text-3xl`}
      onClick={() => setScreen("waiting")}
    >
      <Accessibility size={100}/>
      <p>You are stupid ass nigga</p>
      <p>Wait for PINK and then CLICK</p>
      <p>click to retry</p>
    </div>
  );
};
