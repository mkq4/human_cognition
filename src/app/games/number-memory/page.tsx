"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";
import { getDelay, getNumbers } from ".";
import { LineTimer } from "@/components/ui/line-timer";
import { Container } from "@/components/shared/container";
import Link from 'next/link';
import { EndScreenButtons } from '@/components/shared/end-screen-buttons';
interface Props {
  className?: string;
}

type ScreenProps = {
  setScreen: (screen: ScreenType) => void;
  setLevel?: React.Dispatch<React.SetStateAction<number>>;
  level?: number;
  setNumber?: (number: number) => void;
  number?: number;
  setUserAnswer?: (userAnswer: number) => void;
  userAnswer?: number;
};

type ScreenType = "start" | "number" | "input" | "result";

const screenStyles =
  "flex flex-col items-center justify-center py-10 gap-5 bg-[#85b5ed] h-[500px]";

export const NumberMemoryPage = ({ className }: Props) => {
  const [screen, setScreen] = useState<ScreenType>("start");
  const [number, setNumber] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [userAnswer, setUserAnswer] = useState<number>(0);
  return (
    <div className={className}>
      {(() => {
        switch (screen) {
          case "start":
            return <StartScreen setScreen={setScreen} />;
          case "number":
            return (
              <NumberScreen
                setScreen={setScreen}
                level={level}
                setNumber={setNumber}
                number={number}
              />
            );
          case "input":
            return (
              <InputScreen
                setScreen={setScreen}
                setUserAnswer={setUserAnswer}
              />
            );
          case "result":
            return (
              <ResultScreen
                setScreen={setScreen}
                number={number}
                level={level}
                userAnswer={userAnswer}
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
    <div className={'game__screen'}>
      <h1 className="text-4xl font-bold">Number Memory Game</h1>
      <p className="text-2xl">Remember more numbers as you can</p>

      <Button className="text-xl" onClick={() => setScreen("number")}>
        Click here to start
      </Button>
    </div>
  );
};

// number screen (number)
const NumberScreen = ({ setScreen, setNumber, level, number }: ScreenProps) => {
  // timer + number
  const [timer, setTimer] = useState<number>(0);
  if (!setNumber) return null;

  //number generator
  useEffect(() => {
    // const number
    const number = getNumbers(level as number);
    const delay = getDelay(level as number);
    setTimer(delay);
    console.log("delay", delay);
    setNumber(number);

    //timeout

    const timer = setTimeout(() => {
      setScreen("input");
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={"game__screen"}>
      <p className="text-2xl">remember this shit</p>
      <p className="text-5xl select-none pointer-events-none font-bold">
        {number}
      </p>
      <LineTimer time={timer} />
    </div>
  );
};

// input screen (input)
const InputScreen = ({ setScreen, setUserAnswer }: ScreenProps) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;

    if (/^\d*$/.test(next)) {
      // idk wft is this
      setValue(next);
    }
  };

  if (!setUserAnswer) return null;

  return (
    <div className={`game__screen`}>
      <Container className="flex flex-col items-center justify-center gap-5">
        <p className="text-3xl">Input all what you remember</p>
        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          value={value}
          onChange={handleChange}
          className="w-full h-[50px] text-2xl border rounded px-5 text-center"
        />
        <Button
          onClick={() => {
            setUserAnswer(+value);
            setScreen("result");
          }}
        >
          Confirm
        </Button>
      </Container>
    </div>
  );
};
// success screen (Level, answer, user answer, next)
const ResultScreen = ({ setScreen, number, userAnswer, setLevel, level }: ScreenProps) => {

    if (!setLevel || level === undefined) return null;

    // check if user answer is correct
    const isCorrect = number === userAnswer;

  return (
    <div className={`game__screen`}>
      <p className="text-center text-2xl">
        Number <br /> {number}
      </p>
      <p className="text-center text-2xl">
        Your {!isCorrect && "stupid"} answer <br /> {userAnswer}
      </p>
      {isCorrect ? (
        <Button
          onClick={() => {
            setLevel((prev) => prev + 1);
            setScreen("number");
          }}
        >
          Next level
        </Button>
      ) : (
        <EndScreenButtons onClickRetryButton={() => {
          setLevel(1);
          setScreen("number");
        }}/>
      )}
    </div>
  );
};

export default NumberMemoryPage;
