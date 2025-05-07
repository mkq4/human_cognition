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
  screen: screenType,
  setScreen: (screen: screenType) => void;
}

type screenType = 'start' |'game' | 'end'

export const VisualMemoryContext = createContext<IVisualMemoryContext>({
  level: 1,
  setLevel: () => {},
  area: 3,
  setArea: () => {},
  blocksAmount: 4,
  setBlocksAmount: () => {},
  blocksId: [1, 2, 3],
  setBlocksId: () => {},
  screen: 'start',
  setScreen: () => {}
});


export const VisualMemoryProvider = ({children} : {children: ReactNode}) => {
    const [level, setLevel] = useState<number>(1)
    const [area, setArea] = useState<number>(3)
    const [blocksAmount, setBlocksAmount] = useState<number>(3)
    const [blocksId, setBlocksId] = useState<number[]>([1, 2, 3]);
    const [screen, setScreen] = useState<screenType>('start')


    return (
        <>
        <VisualMemoryContext.Provider value={{level, setLevel, area, setArea, blocksAmount, setBlocksAmount, blocksId, setBlocksId, screen, setScreen}}>
            {children}
        </VisualMemoryContext.Provider>
        </>
    )
}