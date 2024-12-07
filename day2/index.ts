import { readLines } from "../utils";

async function part1(): Promise<number> {
  const lines = await getInput();

  let safeReports = 0;
  for (let line of lines) {
    if (isSafelyIncreasing(line) || isSafelyDecreasing(line)) {
      safeReports++;
    }
  }
  
  return safeReports;
}

async function part2(): Promise<number> {
  const lines = await getInput();

  let safeReports = 0;
  for (let line of lines) {
    if (isSafelyIncreasing(line) || isSafelyDecreasing(line)) {
      safeReports++;
    } else {
      for (let i = 0; i < line.length; i++) {
        const levelRemoved = line.filter((_, index) => index !== i);
        if (isSafelyIncreasing(levelRemoved) || isSafelyDecreasing(levelRemoved)) {
          safeReports++;
          break;
        }
      }
    }
  }
  
  return safeReports;
}

function isSafelyIncreasing(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i-1] - arr[i];
    if (!(diff >= 1 && diff <= 3)) {
      return false;
    }
  }
  return true;
}

function isSafelyDecreasing(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i] - arr[i - 1];
    if (!(diff >= 1 && diff <= 3)) {
      return false;
    }
  }
  return true;
}

async function getInput(): Promise<number[][]> {
  const lines = await readLines(__dirname + "/input.txt");
  const numbers = lines.map(line => {
    return line.split(" ").map(n => parseInt(n));
  });
  return numbers;
}

export {
  part1,
  part2,
}
