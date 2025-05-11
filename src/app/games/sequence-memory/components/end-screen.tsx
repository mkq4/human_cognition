import { EndScreenButtons } from '@/components/shared/end-screen-buttons';
import { ScreenProps } from '../page';

export const EndScreen = ({ setScreen, setLevel, level }: ScreenProps) => {
  if (setLevel === undefined) return null;

  return (
    <div className={'game__screen'}>
      <p className="text-3xl font-bold text-center">
        Level <br /> {level}
      </p>
      <EndScreenButtons onClickRetryButton={() => {
        setScreen("game");
        setLevel(1);
      }}/>
    </div>
  );
};