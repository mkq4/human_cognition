import { VisualMemoryContext } from '@/contexts/visualMemory.context';
import { useContext, useEffect, useState } from 'react';
import { expandArea, getBlocks } from '..';

export const Area = () => {
  console.log("area");
  const {
    blocksAmount,
    setBlocksAmount,
    level,
    setLevel,
    area,
    setArea,
    setScreen,
  } = useContext(VisualMemoryContext); // количество блоков
  const [seq, setSeq] = useState<number[]>([0]);
  const [previewSeq, setPreviewSeq] = useState<number[]>([0]);
  const blockSide = Math.floor(500 / blocksAmount - 20); // ширина блока
  const [isDisable, setIsDisable] = useState<boolean>(true);

  const handleBlockClick = (blockId: number) => {
    if (seq.includes(blockId)) {
      if (!previewSeq.includes(blockId)) {
        const nextPreviewSeq = [...previewSeq, blockId];
        setPreviewSeq(nextPreviewSeq);

        if (seq.sort().toString() === nextPreviewSeq.sort().toString()) {
          setSeq([]);
          setPreviewSeq([]);

          expandArea(level, blocksAmount, setBlocksAmount);

          setLevel(level + 1);
        }
      }
    } else {
      setSeq([]);
      setPreviewSeq([]);
      setScreen("end");
    }
  };

  useEffect(() => {
    const data = getBlocks(level, blocksAmount);
    setIsDisable(true);
    setSeq(data);
    setPreviewSeq(data);
    console.log(data);

    setTimeout(() => {
      setPreviewSeq([]);
      setIsDisable(false);
    }, 2000);
  }, [level]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${blocksAmount}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${blocksAmount}, minmax(0, 1fr))`,
      }}
      className="grid grid-cols-3 gap-3"
    >
      {Array.from({ length: blocksAmount ** 2 }).map((_, i) => {
        return (
          <div
            style={{ width: blockSide, height: blockSide }}
            className={`border-2 ${
              previewSeq.includes(i)
                ? "bg-white cursor-not-allowed hover:bg-white"
                : ""
            }
            ${
              isDisable
                ? "cursor-not-allowed"
                : "cursor-pointer hover:bg-blue-300"
            }
            `}
            onClick={() => {
              if (!isDisable) {
                handleBlockClick(i);
              }
            }}
          >
            
          </div>
        );
      })}
    </div>
  );
};
