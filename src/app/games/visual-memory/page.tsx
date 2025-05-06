'use client'
import { Button } from '@/components/ui/button';
import { VisualMemoryContext, VisualMemoryProvider } from '@/contexts/visualMemory.context';
import { useContext } from 'react';

interface Props {
    className?: string;
}


const VisualMemoryPage = ({ className }: Props) => {
    
  return (
    <VisualMemoryProvider>
      <InnerContent className={className} />
    </VisualMemoryProvider>
  );
};

const InnerContent = ({ className }: Props) => {
    console.log("render")
  const { level, setLevel } = useContext(VisualMemoryContext);

  return <div className={className}>
    {level}
    <Button onClick={() => setLevel(level + 1)}>setLevel + 1</Button>
    </div>;
};




export default VisualMemoryPage