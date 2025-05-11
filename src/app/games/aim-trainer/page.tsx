"use client";
import { useState } from "react";
import { Container } from "@/components/shared/container";
import React from "react";
import { StartScreen } from './components/start-screen';
import { MainScreen } from './components/main-screen';
import { EndScreen } from './components/end-screen';
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


export default AimTrainerPage;
