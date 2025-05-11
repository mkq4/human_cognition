import { EndScreenButtons } from '@/components/shared/end-screen-buttons';
import { Button } from '@/components/ui/button';
import { ScreenProps } from '../page';

export const ResultScreen = ({ setScreen, number, userAnswer, setLevel, level }: ScreenProps) => {

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