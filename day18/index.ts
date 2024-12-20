import { readContents } from "../utils/io";
import {
  type Point as BasePoint,
  go,
  ORTHOGONAL_DIRECTIONS,
  pointsAreEqual,
  inGridBounds,
  valueAt,
  encode,
} from "../utils/grid";
import PriorityQueue from "../utils/priorityQueue";

interface QueueElement {
  point: Point;
  cost: number;
}

type Point = BasePoint;

const memSpaceSize = 70;
type MemSpace = string[][];

async function part1(): Promise<number> {
  const bytePoints = await getInput();
  const memSpace = buildMemSpace(bytePoints.slice(0, 1024));
  const start = { row: 0, col: 0 };
  const end = { row: memSpaceSize, col: memSpaceSize };
  const lowestSteps = djikstra(start, end, memSpace);

  return lowestSteps ?? -1;
}

async function part2(): Promise<string> {
  const bytePoints = await getInput();
  const start = { row: 0, col: 0 };
  const end = { row: memSpaceSize, col: memSpaceSize};

  let left = 1024;
  let right = bytePoints.length - 1;
  let badByteIndex = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let memSpace = buildMemSpace(bytePoints.slice(0, mid));
    const steps = djikstra(start, end, memSpace);
    if (steps === null) {
      badByteIndex = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  const badByte = bytePoints[badByteIndex - 1];
  return `${badByte.col},${badByte.row}`;
}

async function getInput(): Promise<Point[]> {
  const input = await readContents(__dirname + "/input.txt");
  return input.split("\n").map((line) => {
    const [col, row] = line.split(",").map((n) => parseInt(n));
    return { row, col };
  });
}

function djikstra(start: Point, end: Point, memSpace: MemSpace): number | null {
  const pq = new PriorityQueue<QueueElement>((a, b) => a.cost - b.cost);
  const distance = new Map<number, number>();

  distance.set(encode(start), 0);
  pq.push({point: start, cost: 0 });

  while (!pq.isEmpty()) {
    const current = pq.pop()!;
    const { point, cost } = current;

    if (pointsAreEqual(point, end)) {
      return cost;
    }

    for (const dir of ORTHOGONAL_DIRECTIONS) {
      const neighbor = go(point, dir);
      if (inGridBounds(memSpace, neighbor) && valueAt(memSpace, neighbor) !== "#") {
        let newCost = cost + 1;
        if (newCost < (distance.get(encode(neighbor)) || Infinity)) {
          distance.set(encode(neighbor), newCost);
          pq.push({ point: neighbor, cost: newCost });
        }
      }
    }
  }
  return null;
}

function buildMemSpace(bytePoints: Point[]): MemSpace {
  const memSpace: MemSpace = Array.from({ length: memSpaceSize + 1 }, () => Array(memSpaceSize + 1).fill('.'));
  for (const bytePoint of bytePoints) {
    memSpace[bytePoint.row][bytePoint.col] = '#';
  }

  return memSpace;
}

const part1Answer = 298;
const part2Answer = '52,32';

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
