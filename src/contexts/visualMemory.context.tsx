'use client'
import { createContext, ReactNode, useState } from 'react';

// interface IVisualMemoryContext {
//   level: number;
//   area: number; // example - 3 (3x3)
//   blocksAmount: number;
//   blocksId: number[];
// }


interface IVisualMemoryContext {
  level: number;
  setLevel: (level: number) => void;
  area: number; // example - 3 (3x3)
  setArea: (area: number) => void;
  blocksAmount: number;
  setBlocksAmount: (blocks: number) => void;
  blocksId: number[];
  setBlocksId: (blocksId: number[]) => void;
}


export const VisualMemoryContext = createContext<IVisualMemoryContext>({
  level: 1,
  setLevel: () => {},
  area: 3,
  setArea: () => {},
  blocksAmount: 3,
  setBlocksAmount: () => {},
  blocksId: [1, 2, 3],
  setBlocksId: () => {}
});


export const VisualMemoryProvider = ({children} : {children: ReactNode}) => {
    const [level, setLevel] = useState<number>(1)
    const [area, setArea] = useState<number>(3)
    const [blocksAmount, setBlocksAmount] = useState<number>(3)
    const [blocksId, setBlocksId] = useState<number[]>([1, 2, 3]);


    return (
        <>
        <VisualMemoryContext.Provider value={{level, setLevel, area, setArea, blocksAmount, setBlocksAmount, blocksId, setBlocksId}}>
            {children}
        </VisualMemoryContext.Provider>
        </>
    )
}