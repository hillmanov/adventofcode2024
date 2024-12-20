import { readLines } from "../utils/io";
import {
  type Point,
  go,
  inGridBounds,
  pointsAreEqual,
  walkGrid,
  valueAt,
  encodeWithDirection,
  DIRECTION,
  ORTHOGONAL_DIRECTIONS,
} from "../utils/grid";
import PriorityQueue  from "../utils/priorityQueue";

type maze = string[][];

async function part1(): Promise<number> {
  const maze = await getInput();
  const {start, end} = getStartAndEnd(maze);

  return djikstra(start, end, maze) ?? -1;
}

async function part2(): Promise<number> {
  const maze = await getInput();
  const {start, end} = getStartAndEnd(maze);
  let lowestScore = djikstra(start, end, maze) ?? -1;

  return lowestScore;
}

interface QueueElement {
  point: Point;
  cost: number;
  direction: DIRECTION
}

function djikstra(start: Point, end: Point, maze: maze): number | null {
  const pq = new PriorityQueue<QueueElement>((a, b) => a.cost - b.cost);
  const distance = new Map<number, number>();

  for (const dir of ORTHOGONAL_DIRECTIONS) {
    distance.set(encodeWithDirection(start, dir), Infinity);
  }
  distance.set(encodeWithDirection(start, DIRECTION.R), 0);

  pq.push({point: start, cost: 0, direction: DIRECTION.R});
  while (!pq.isEmpty()) {
    const current = pq.pop()!;
    const { point, cost, direction } = current;

    if (pointsAreEqual(point, end)) {
      return cost;
    }

    for (const dir of ORTHOGONAL_DIRECTIONS) {
      const neighbor = go(point, dir);

      if (inGridBounds(maze, neighbor) && valueAt(maze, neighbor) !== "#") {
        let newCost = cost + 1;
        if (direction !== dir) {
          newCost += 1000;
        }
          
        const distanceValue = distance.get(encodeWithDirection(neighbor, dir));
        if (distanceValue === undefined || newCost < distanceValue) {
          distance.set(encodeWithDirection(neighbor, dir), newCost);
          pq.push({ point: neighbor, cost: newCost, direction: dir });
        }

      }
    }
  }
  return null;
}

function getStartAndEnd(maze: maze): {start: Point, end: Point} {
  let start: Point | null = null;
  let end: Point | null = null;

  walkGrid( maze, (value, point) => {
    if (value === "S") {
      start = point;
    } else if (value === "E") {
      end = point;
    }
  });

  if (!start || !end) {
    throw new Error("No start or end found");
  }
  return {start, end};
}

async function getInput(): Promise<maze> {
  const lines = await readLines(__dirname + "/input.txt");
  return lines.map((line) => line.split(""));
}

const part1Answer = 73404;
const part2Answer = null;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
