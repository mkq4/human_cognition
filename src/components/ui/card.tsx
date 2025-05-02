import { ICard } from '@/types/card';
import Link from 'next/link';

interface Props {
    className?: string;
    card: ICard;
}

export const Card = ({ className, card }: Props) => {
  return (
    <div className={`${className}`}>
      <div className="flex flex-col items-center justify-between p-6 bg-white rounded-lg shadow-md gap-2 h-full">
        {card.image}
        <h2 className="text-xl font-semibold">{card.title}</h2>
        <p className="text-gray-600 text-center mb-4">{card.description}</p>
        <Link
          href={card.link}
          className="text-l bg-blue-200 p-2 rounded-md cursor-pointer hover:bg-blue-300 mt-auto"
        >
          Play Now
        </Link>
      </div>
    </div>
  );
};