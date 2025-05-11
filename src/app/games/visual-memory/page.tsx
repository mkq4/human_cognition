"use client";
import {
  VisualMemoryContext,
  VisualMemoryProvider,
} from "@/contexts/visualMemory.context";
import { useContext } from "react";
import { StartScreen } from './components/start-screen';
import { MainScreen } from './components/main-screen';
import { EndScreen } from './components/end-screen';

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


export default VisualMemoryPage;
