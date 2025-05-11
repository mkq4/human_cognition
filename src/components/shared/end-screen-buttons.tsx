import Link from 'next/link';
import { Button } from '../ui/button';

interface Props {
    className?: string;
    onClickRetryButton?: () => void;
    onClickSaveResultButton?: () => void;
}

export const EndScreenButtons = ({ className, onClickSaveResultButton, onClickRetryButton }: Props) => {
  return (
    <div className="flex gap-3 justify-center">
      <Link
        className={`text-xl bg-fuchsia-200 p-2 rounded-md cursor-pointer hover:bg-fuchsia-300`}
        href="/"
        onClick={(e) => e.stopPropagation()}
      >
        To home
      </Link>
      <Button onClick={onClickRetryButton}>Retry</Button>
      <Button onClick={onClickSaveResultButton}>Save result</Button>
    </div>
  );
};