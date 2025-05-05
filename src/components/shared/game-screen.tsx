import React from 'react';
import { ReactNode } from 'react';

interface Props {
    className?: string;
    children: ReactNode;
}

export const GameScreen = React.forwardRef<HTMLDivElement, Props>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={`${className} game__screen`}>
      {children}
    </div>
  );
});