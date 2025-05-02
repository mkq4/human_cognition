// generate numbers in dependence of game level
export function getNumbers(level: number): number {
    console.log("level", level);
    let number = "";

    // generate a random number between 1 and 9
    for (let i = 0; i < (level as number); i++) {
        const randomNumber = Math.floor(Math.random() * 9 + 1);
        console.log(randomNumber);
        number += randomNumber.toString();
    }

    return +number;
}

//generate delay for remembering numbers
/*
T(n) = T₀ + k * n^1.5
T(n) — All time for remembering n numbers
T₀ — Based name for remembering 1 number (2 sec)
k — Complexity ratio
n — amount of numbers
*/

export function getDelay(level: number): number {
  const base = 2000;
  const coef = 500;
  return base + coef * Math.pow(level, 1.5);
}