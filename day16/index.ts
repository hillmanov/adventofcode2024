import { readLines } from "../utils/io";
import {
  type Point,
  go,
  inGridBounds,
  pointsAreEqual,
  walkGrid,
  valueAt,
  encode,
  encodeWithDirection,
  DIRECTION,
  ORTHOGONAL_DIRECTIONS,
} from "../utils/grid";
import PriorityQueue  from "../utils/priorityQueue";

type maze = string[][];

async function part1(): Promise<number> {
  const maze = await getInput();
  const {start, end} = getStartAndEnd(maze);
  let { lowestCost }  = djikstra(start, end, maze);

  return lowestCost
}

async function part2(): Promise<number> {
  const maze = await getInput();
  const {start, end} = getStartAndEnd(maze);
  let { lowestCost, pointCosts } = djikstra(start, end, maze, true);

  const visited = new Set<number>();
  const track = (currentPoint: Point, currentCost: number) => {
    visited.add(encode(currentPoint));
    if (pointsAreEqual(currentPoint, start)) {
      return
    }

    for (const goDirection of ORTHOGONAL_DIRECTIONS) {
      const nextPoint = go(currentPoint, goDirection); 
      let nextCost = currentCost - 1;
      let nextCostWithTurn = nextCost - 1000;
      
      for(const nextDirection of ORTHOGONAL_DIRECTIONS) {
        const encodedNext = encodeWithDirection(nextPoint, nextDirection);

        if ((pointCosts.get(encodedNext)) === nextCost) {
          track(nextPoint, nextCost);
        } 
        if ((pointCosts.get(encodedNext)) === nextCostWithTurn) {
          track(nextPoint, nextCostWithTurn);
        }
      }
    }
  }

  track(end, lowestCost);

  return visited.size;
}

interface QueueElement {
  point: Point;
  cost: number;
  direction: DIRECTION
}

function djikstra(start: Point, end: Point, maze: maze, findAllPaths: boolean = false): { lowestCost: number, pointCosts: Map<number, number> } {
  const pq = new PriorityQueue<QueueElement>((a, b) => a.cost - b.cost);
  const costs = new Map<number, number>();

  for (const dir of ORTHOGONAL_DIRECTIONS) {
    costs.set(encodeWithDirection(start, dir), Infinity);
  }
  costs.set(encodeWithDirection(start, DIRECTION.R), 0);

  pq.push({point: start, cost: 0, direction: DIRECTION.R});
  let lowestCost = -1;
  while (!pq.isEmpty()) {
    const current = pq.pop()!;
    const { point, cost, direction } = current;

    if (pointsAreEqual(point, end)) {
      if (findAllPaths) {
        lowestCost = cost;
        continue;
      } else {
        lowestCost = cost;
        return { lowestCost: cost, pointCosts: costs };
      }
    }

    for (const dir of ORTHOGONAL_DIRECTIONS) {
      const neighbor = go(point, dir);

      if (inGridBounds(maze, neighbor) && valueAt(maze, neighbor) !== "#") {
        let newCost = cost + 1;
        if (direction !== dir) {
          newCost += 1000;
        }
          
        const distanceValue = costs.get(encodeWithDirection(neighbor, dir));
        if (findAllPaths) {
          if (newCost <= (distanceValue ?? Infinity)) {
            costs.set(encodeWithDirection(neighbor, dir), newCost);
            pq.push({ point: neighbor, cost: newCost, direction: dir });
          }
        } else {
          if (newCost < (distanceValue ?? Infinity)) {
            costs.set(encodeWithDirection(neighbor, dir), newCost);
            pq.push({ point: neighbor, cost: newCost, direction: dir });
          }
        }
      }
    }
  }
  return { lowestCost, pointCosts: costs };
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
const part2Answer = 449;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
