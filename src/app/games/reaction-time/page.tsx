"use client";
import { useState } from "react";
import { Container } from "@/components/shared/container";

import { StartScreen } from "./components/start-screen";
import { WaitingScreen } from "./components/waiting-screen";
import { ClickScreen } from "./components/click-screen";
import { EndScreen } from "./components/end-screen";
import { FaultScreen } from "./components/fault-screen";

interface Props {
  className?: string;
}

export const screenStyles =
  "flex flex-col items-center justify-center py-10 gap-5 h-full cursor-pointer";

type ScreenType = "start" | "waiting" | "click" | "end" | "fault";

export type ScreenProps = {
  setScreen: (screen: ScreenType) => void;
  time?: number;
};

interface Props {
  className?: string;
}

const backgroundColors = {
  start: "#85b5ed",
  waiting: "#ff637e",
  click: "#f3a8ff",
  end: "#85b5ed",
  fault: "#85b5ed",
};



const ReactionTimePage = ({ className }: Props) => {
  const [screen, setScreen] = useState<ScreenType>("start");
  const [time, setTime] = useState<number>(0);
  console.log(`bg-${backgroundColors[screen]}`);

  return (
    <div
      className={`${className} bg-${backgroundColors[screen]} h-[500px]`}
      style={{ backgroundColor: backgroundColors[screen] }}
    >
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

export default ReactionTimePage;
