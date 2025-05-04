

export function generatePath(level: number): Record<number, number> {
  const pathAmount = level + 2;
  const path: Record<number, number> = {};

  for (let i = 0; i <= pathAmount; i++) {
    
    let randomIndex = Math.floor(Math.random() * 40);
    while (Object.keys(path).includes(randomIndex.toString())) {
      randomIndex = Math.floor(Math.random() * 40);
    }
    path[randomIndex] = i + 1;
  }
  return path;
}