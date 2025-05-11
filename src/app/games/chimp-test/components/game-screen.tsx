import { useMemo, useState } from 'react';
import { Props } from '../page';
import { generatePath } from '..';
import { Block } from './block';

export const GameScreen = ({ setScreen, level, setLevel }: Props) => {
  const [hideBlocks, setHideBlocks] = useState<boolean>(false);
  const path = useMemo(() => generatePath(level as number), [level]);
  const [correctBlock, setCorrectBlock] = useState<number>(1);
  const [deletedBlocks, setDeletedBlocks] = useState<number[]>([]);

  const handleCorrectClick = () => {
    setCorrectBlock((prev) => prev + 1);
  };

  return (
    <div className="grid grid-cols-8 gap-2 justify-center">
      {Array.from({ length: 40 }).map((_, index) => (
        <Block
          key={index}
          index={index}
          label={path[index]}
          correctBlock={correctBlock}
          onCorrectClick={handleCorrectClick}
          setHideBlocks={setHideBlocks}
          hideBlocks={hideBlocks}
          setCorrectBlock={setCorrectBlock}
          deletedBlocks={deletedBlocks}
          setDeletedBlocks={setDeletedBlocks}
          length={Object.keys(path).length}
          setLevel={setLevel}
          level={level}
          setScreen={setScreen}
        />
      ))}
    </div>
  );
};