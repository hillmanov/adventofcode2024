import { readContents } from "../utils/io";
import { readFile } from "fs/promises";
import p from "./native.wasm";
import { type WASMExports } from "./native.d"; 

const wasmBuffer = await readFile(p);
const wasmModule = await WebAssembly.instantiate(wasmBuffer);
const { predictNextSecretNumber, encodeSequence } = wasmModule.instance.exports as unknown as WASMExports;

async function part1(): Promise<number> {
  const secretNumbers = await getInput();
  let sum = 0;
  for(const secretNumber of secretNumbers) {
    sum += getNthSecretNumber(secretNumber, 2000);
  }
  return sum;
}

async function part2(): Promise<number> {
  const secretNumbers = await getInput();

  const sequenceToPrice = new Map<number, number>();
  for(let secretNumber of secretNumbers.values()) {
    const sequencesSeen = new Set<number>();
    const priceChanges: number[] = new Array(2000);
    let previousPrice = 0;

    for (let i = 0; i <= 2000; i++) {
      secretNumber = predictNextSecretNumber(secretNumber);
      const price = secretNumber % 10;

      priceChanges[i] = price - previousPrice;
      previousPrice = price;

      if (i >= 3) {
        const e = encodeSequence(priceChanges[i - 3], priceChanges[i - 2], priceChanges[i - 1], priceChanges[i]);
        if (sequencesSeen.has(e)) {
          continue;
        }
        sequenceToPrice.set(e, (sequenceToPrice.get(e) ?? 0) + price);
        sequencesSeen.add(e);
      }
    }
  }

  let maxPrice = -Infinity;
  for (const [,prices] of sequenceToPrice.entries()) {
    maxPrice = Math.max(maxPrice, prices);
  }

  return maxPrice;
}

function getNthSecretNumber(secretNumber: number, n: number): number {
  for (let i = 0; i < n; i++) {
    secretNumber = predictNextSecretNumber(Number(secretNumber));
  }
  return secretNumber;
}

async function getInput(): Promise<number[]> {
  const input = (await readContents(__dirname + "/input.txt")).split("\n").map((line) => Number(line));
  return input;
}

const part1Answer = 13234715490;
const part2Answer = 1490;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
