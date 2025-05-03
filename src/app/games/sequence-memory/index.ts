export function generateSeq(level: number, seq: number[]): number[] {
    
    if (!seq) {
      const random = Math.floor(Math.random() * 9); // 1 - 9 random
      return [random];
    }

    while (seq.length < level) {
        const random = Math.floor(Math.random() * 9); // 1 - 9 random
            seq.push(random);
    }
    return seq;
}