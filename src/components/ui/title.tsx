import { Brain } from "lucide-react";
import Link from 'next/link';

interface Props {
  className?: string;
}

export const Title = ({ className }: Props) => {
  return (
    <Link href="/" className='flex gap-2'>
      <Brain size={32} />
      <h1 className="font-bold text-2xl">Human Cognition</h1>
    </Link>
  );
};
