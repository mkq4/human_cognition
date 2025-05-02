import { Brain } from 'lucide-react';
import { Container } from './container';
import { Button } from '../ui/button';

interface Props {
    className?: string;
}

export const GetStartedScreen = ({ className }: Props) => {
  return (
    <div className={`${className} bg-[#85b5ed]`}>
        <Container>
            <div className="flex flex-col items-center py-10 gap-5">
                <Brain size={150}/>
                <h1 className='text-2xl font-bold uppercase mt-5'>Human Cognition</h1>
                <span className='text-xl'>Train your brain nigga</span>
                <Button>Get started</Button>
            </div>
        </Container>
    </div>
  );
};