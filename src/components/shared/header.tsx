import { HeaderAuth } from '../ui/header-auth';
import { Title } from '../ui/title';
import { Container } from './container';

interface Props {
    className?: string;
}

export const Header = ({ className }: Props) => {
  return (
    <div className={`${className}`}>
      <Container>
        <div className="flex h-[80px] items-center justify-between">
          <Title />
          <HeaderAuth />
        </div>
      </Container>
    </div>
  );
};