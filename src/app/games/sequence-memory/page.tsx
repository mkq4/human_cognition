// Мне страшно это говно рефакторить

"use client";
import { useState } from "react";
import { StartScreen } from './components/start-screen';
import { GameScreen } from './components/game-screen';
import { EndScreen } from './components/end-screen';

export type ScreenType = "start" | "game" | "end";

export interface ScreenProps {
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

export default SequenceMemoryPage;
