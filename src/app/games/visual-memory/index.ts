export function getBlocks(level: number, areaSide: number): number[] {
  const seq: number[] = [];
  
  const blocksAmount = level + 2;

  for (let i = 0; i < blocksAmount; i++) {
    let randomNumber = Math.floor(Math.random() * areaSide ** 2);
    while (seq.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * areaSide ** 2);
    }

    seq.push(randomNumber);
  }

  return seq;
}

export function expandArea (
  level: number, 
  blocksAmount: number,
  setBlocksAmount: (value: number) => void
  ) {
    if (level + 2 >= blocksAmount ** 2 / 2) {
      setBlocksAmount(blocksAmount + 1)
    }
}