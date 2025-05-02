import { Container } from './container';

interface Props {
    className?: string;
}

export const Footer = ({ className }: Props) => {
  return (
    <div className={`${className}`}>
        <Container>
            <div className="text-2xl text-center">
                github.com/mkq4
            </div>
        </Container>      
    </div>
  );
};