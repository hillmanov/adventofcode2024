import { readContents } from "../utils/io";

type Key = [number, number, number, number, number];
type Lock = [number, number, number, number, number];

async function part1(): Promise<number> {
  const { keys, locks } = await getInput();
  let count = 0;
  for (const key of keys) {
    for (const lock of locks) {
      if (fit(key, lock)) {
        count++;
      }
    }
  }
  return count;
}

async function part2(): Promise<number> {
  return 1;
}

function fit(key: Key, lock: Lock): boolean {
  return key.every((keyValue, index) => keyValue + lock[index] <= 5);
}

async function getInput(): Promise<{keys: Key[], locks: Lock[]}> {
  const chunks = (await readContents(__dirname + "/input.txt")).split("\n\n").map((chunk) => chunk.trim()).map((chunk) => chunk.split("\n"));
  
  const keys: Key[] = [];
  const locks: Lock[] = [];

  for (const chunk of chunks) {
    if (chunk[0] === "#####") {
      const lock: Lock = [0, 0, 0, 0, 0];
      for (let row = 1; row < 6; row++) {
        for (let col = 0; col < 5; col++) {
          if (chunk[row][col] === "#") {
            lock[col] = lock[col] + 1;
          }
        }
      }
      locks.push(lock);
    }
    else {
      const key: Key = [0, 0, 0, 0, 0];
      for (let row = 1; row < 6; row++) {
        for (let col = 0; col < 5; col++) {
          if (chunk[row][col] === "#") {
            key[col] = key[col] + 1;
          }
        }
      }
      keys.push(key);
    }
  }
  return { keys, locks };
}

const part1Answer = 3483;
const part2Answer = 1;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
