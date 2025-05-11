import s from '../chimp.module.css'
import { ScreenType } from '../page';

type BlockProps = {
  className?: string;
  index: number;
  label?: number;
  correctBlock: number;
  onCorrectClick: () => void;
  hideBlocks: boolean;
  setHideBlocks: (value: boolean) => void;
  setCorrectBlock: (value: number) => void;
  deletedBlocks: number[];
  setDeletedBlocks: (value: number[]) => void;
  length: number;
  setLevel?: (level: number) => void;
  level?: number;
  setScreen: (screen: ScreenType) => void;
};

export const Block = ({
  className,
  label,
  correctBlock,
  setCorrectBlock,
  hideBlocks,
  setHideBlocks,
  deletedBlocks,
  setDeletedBlocks,
  length,
  setLevel,
  level,
  setScreen,
}: BlockProps) => {
  const clear = () => {
    setHideBlocks(false);
    setCorrectBlock(1);
    setDeletedBlocks([]);
  };

  const handleClick = () => {
    // console.log("handleClick")
    if (deletedBlocks.includes(label as number)) return;

    if (!setLevel) return null;

    if (!hideBlocks) {
      setHideBlocks(true);
    }

    // console.log(correctBlock)

    if (label === correctBlock) {
      // correct click
      setCorrectBlock(correctBlock + 1);
      setDeletedBlocks([...deletedBlocks, label]);

      //check end game
      if (deletedBlocks.length + 1 === length) {
        console.log("win");
        //next level
        // reset
        clear();
        setLevel((level as number) + 1);
      }
    } else {
      clear();
      // setLevel(1);
      setScreen("end");
    }
  };

  if (label === undefined) return <div className={className}></div>;

  return (
    <div
      className={`${hideBlocks ? s.hidden__block : s.block__item} ${
        deletedBlocks.includes(label) ? s.deleted__block : ""
      }`}
      onClick={handleClick}
    >
      {hideBlocks ? "" : label}
    </div>
  );
};
