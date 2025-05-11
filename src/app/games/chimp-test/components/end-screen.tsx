import { EndScreenButtons } from '@/components/shared/end-screen-buttons';
import { Props } from '../page';

export const EndScreen = ({ setScreen, level, setLevel }: Props) => {
  if (!setLevel) return null;

  return (
    <div className="flex flex-col">
      <p className="text-4xl mb-5 text-center">
        Level <br /> {level}
      </p>
      <p className="text-3xl mb-5">Monkey smarter then you nigga!</p>
      <EndScreenButtons
        onClickRetryButton={() => {
          setLevel(1);
          setScreen("game");
        }}
      />
    </div>
  );
};