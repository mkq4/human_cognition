import { useState } from 'react';
import { ScreenProps } from '../page';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';

export const InputScreen = ({ setScreen, setUserAnswer }: ScreenProps) => {
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