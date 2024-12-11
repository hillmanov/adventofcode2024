import { readLines } from "../utils/io";
import {
  DIRECTION,
  go,
  encode,
  valueAt,
  type Point,
} from "../utils/grid";

const PEAK = 9;

async function part1(): Promise<number> {
  const topographicMap = await getInput();
  const startingPositions = getStartingPositions(topographicMap);

  const climb = (p: Point, currentHeight: number, peaks: Set<number>): void => {
    const height = valueAt(topographicMap, p);
    
    if (height === null || height !== currentHeight + 1) {
      return;
    }

    if (height === PEAK) {
      peaks.add(encode(p));
    }
    
    climb(go(p, DIRECTION.U), height, peaks);
    climb(go(p, DIRECTION.D), height, peaks);
    climb(go(p, DIRECTION.L), height, peaks);
    climb(go(p, DIRECTION.R), height, peaks);
  }

  let s = 0;
  for (let startingPosition of startingPositions) {
    const peaks = new Set<number>();
    climb(startingPosition, -1, peaks);
    s += peaks.size;
  }

  return s;
}

async function part2(): Promise<number> {
  const topographicMap = await getInput();
  const startingPositions = getStartingPositions(topographicMap);
  const successfulPaths: number[][] = [];

  const climb = (p: Point, currentHeight: number, path: number[]): void => {
    const height = valueAt(topographicMap, p);
    
    if (height === null || height !== currentHeight + 1) {
      return;
    }

    path.push(encode(p));
    if (height === PEAK) {
      successfulPaths.push(path);
      return
    }
    
    climb(go(p, DIRECTION.U), height, path.slice());
    climb(go(p, DIRECTION.D), height, path.slice());
    climb(go(p, DIRECTION.L), height, path.slice());
    climb(go(p, DIRECTION.R), height, path.slice());
  }

  for (let startingPosition of startingPositions) {
    const path: number[] = [];
    climb(startingPosition, -1, path);
  }
  
  const uniquePaths = successfulPaths.map(hashPath);

  return uniquePaths.length;
}

function hashPath(path: number[]): number {
  return path.reduce((hash, p) => (hash * 31 + p), 0); // Random prime number to help reduce collisions
}

function getStartingPositions(topographicMap: number[][]): Point[] {
  return topographicMap.map((_, row) => topographicMap[row].map((_, col) => topographicMap[row][col] === 0 ? { row, col } : null)).flat().filter((p) => p !== null);
}

async function getInput(): Promise<number[][]> {
  return (await readLines(__dirname + "/input.txt")).map((l) => l.split('').map(Number));
}

const part1Answer = 607;
const part2Answer = 1384;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
