"use client";
import { Container } from "@/components/shared/container";
import { useState } from "react";
import { StartScreen } from './components/start-screen';
import { GameScreen } from './components/game-screen';
import { EndScreen } from './components/end-screen';
export interface Props {
  className?: string;
  setScreen: (screen: ScreenType) => void;
  level?: number;
  setLevel?: (level: number) => void;
}

export type ScreenType = "start" | "game" | "end";

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
      </Container>
    </div>
  );
};


export default ChimpTestPage;
