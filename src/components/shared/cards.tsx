import { ICard } from '@/types/card';
import { Timer, Combine, Target, FileDigit, BookUp, Banana, Eye } from "lucide-react";
import { Card } from '../ui/card';
import { Container } from './container';

interface Props {
    className?: string;
}

const cards: ICard[] = [
  {
    title: "reaction time",
    description: "Test your reaction time with this simple game.",
    image: <Timer size={50} />,
    link: "games/reaction-time",
  },
  {
    title: "sequence memory",
    description: "Test your memory with this simple game.",
    image: <Combine size={50} />,
    link: "games/sequence-memory",
  },
  {
    title: "aim trainer",
    description: "Test your aim with this simple game.",
    image: <Target size={50} />,
    link: "games/aim-trainer",
  },
  {
    title: "number memory",
    description: "Test your memory with this simple game.",
    image: <FileDigit size={50} />,
    link: "games/number-memory",
  },
  {
    title: "chimp test",
    description: "Test your memory with this simple game.",
    image: <Banana size={50} />,
    link: "games/chimp-test",
  },
  {
    title: "visual memory",
    description: "Test your memory with this simple game.",
    image: <Eye size={50} />,
    link: "games/visual-memory",
  },
];


export const Cards = ({ className }: Props) => {
  return (
    <div className={className}>
      <Container>
        <div className="grid grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <Card card={card} key={index}/>
          ))}
        </div>
      </Container>
    </div>
  );
};