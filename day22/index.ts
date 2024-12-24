import { readContents } from "../utils/io";

async function part1(): Promise<bigint> {
  const secretNumbers = await getInput();
  let sum = 0n;
  for(const secretNumber of secretNumbers) {
    sum += getNthSecretNumber(secretNumber, 2000);
  }
  return sum;
}

async function part2(): Promise<number> {
  const secretNumbers = await getInput();

  const sequenceToPrice = new Map<number, (number | null)[]>();
  for(let [index, secretNumber] of secretNumbers.entries()) {
    const priceChanges: number[] = new Array(2000);
    let previousPrice = 0;
    for (let i = 0; i <= 2000; i++) {
      secretNumber = predictNextSecretNumber(secretNumber);
      const price = Number(secretNumber % 10n);
      priceChanges[i] = price - previousPrice;
      previousPrice = price;
      if (i >= 3) {
        const e = encodeSequence(priceChanges.slice(i - 3, i + 1));
        if (!sequenceToPrice.has(e)) {
          sequenceToPrice.set(e, new Array(secretNumbers.length).fill(null));
        }
        const prices = sequenceToPrice.get(e)!;
        if (prices[index] === null) {
          prices[index] = price;
        }
        sequenceToPrice.set(e, prices)
      }
    }
  }

  let maxPrice = -Infinity;
  for (const [,prices] of sequenceToPrice.entries()) {
    if (sum(prices) > maxPrice) {
      maxPrice = sum(prices);
    }
  }

  return maxPrice;
}


function getNthSecretNumber(secretNumber: bigint, n: number): bigint {
  for (let i = 0; i < n; i++) {
    secretNumber = predictNextSecretNumber(secretNumber);
  }
  return secretNumber;
}

function sum(array: (number | null)[]): number {
  return array.filter(s => s !== null).reduce((a, b) => a + b, 0);
}

// Tried to go bitwise to speed it up. Helped a tiny amount.
function predictNextSecretNumber(secretNumber: bigint): bigint {
  const MASK = 16777215n; 
  secretNumber = ((secretNumber << 6n) ^ secretNumber) & MASK; 
  secretNumber = ((secretNumber >> 5n) ^ secretNumber) & MASK; 
  secretNumber = ((secretNumber << 11n) ^ secretNumber) & MASK; 
  return secretNumber;
}

function encodeSequence(sequence: number[]): number {
  const PRIME = 31; 
  return sequence.reduce((hash, num) => hash * PRIME + (num + 1000), 0);
}

async function getInput(): Promise<bigint[]> {
  const input = (await readContents(__dirname + "/input.txt")).split("\n").map((line) => BigInt(line));
  return input;
}

const part1Answer = 13234715490n;
const part2Answer = 1490;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
