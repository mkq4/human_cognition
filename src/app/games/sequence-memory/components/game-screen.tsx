import { ScreenProps } from '../page';
import { Area } from './area';

export const GameScreen = ({ setScreen, level, setLevel }: ScreenProps) => {
  if (!level || setLevel === undefined) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Area level={level} setLevel={setLevel} setScreen={setScreen} />
    </div>
  );
};