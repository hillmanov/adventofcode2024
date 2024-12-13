import { readContents } from "../utils/io";
import { times } from "../utils/iterate";

type stone = number;
type output = [stone, stone] | [stone];

async function part1(): Promise<number> {
  let stones = await getInput();
  let stoneTransformations = buildStoneTransformations(stones);
  return getStoneCountAfterBlinks(stones, stoneTransformations, 25);
}

async function part2(): Promise<number> {
  let stones = await getInput();
  let map = buildStoneTransformations(stones);
  return getStoneCountAfterBlinks(stones, map, 75);
}

function getStoneCountAfterBlinks(stones: stone[], stoneTransformations: Map<stone, output>, blinks: number): number {
  let currentStoneCounts = new Map<stone, number>(stones.map((stone) => [stone, 1]));

  times(blinks, () => {
    const nextStoneCounts = new Map<stone, number>();

    for (let [stone, count] of currentStoneCounts) {
      const output = stoneTransformations.get(stone)!;
      for (let i = 0; i < output.length; i++) {
        const nextStone = output[i];
        nextStoneCounts.set(nextStone, (nextStoneCounts.get(nextStone) || 0) + count);
      }
    }

    currentStoneCounts = nextStoneCounts;
  });

  let totalStones = 0;
  for (let count of currentStoneCounts.values()) {
    totalStones += count;
  }

  return totalStones;
}

function buildStoneTransformations(stones: stone[]): Map<stone, output> {
  const stoneTransformations = new Map<stone, output>();

  function transform(stone: stone) {
    if (stoneTransformations.has(stone)) {
      return
    }
    if (stone === 0) {
       stoneTransformations.set(0, [1]);
       transform(1);
    } else if (evenDigits(stone)) {
      const [left, right] = split(stone);
      stoneTransformations.set(stone, [left, right]);
      transform(left)
      transform(right);
    } else {
      const transformed = stone * 2024;
      stoneTransformations.set(stone, [transformed]);
      return transform(transformed);
    }
  }

  for (let stone of stones) {
    transform(stone);
  }

  return stoneTransformations;
}

async function getInput(): Promise<stone[]> {
  return (await readContents(__dirname + '/input.txt')).split(' ').map(Number);
}

function evenDigits(n: stone): boolean {
  return String(n).length % 2 === 0;
}

function split(n: stone): stone[] {
  const s = String(n);
  const halfway = s.length / 2;
  return [Number(s.slice(0, halfway)), Number(s.slice(halfway))];
}

const part1Answer = 216042;
const part2Answer = 255758646442399;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}

