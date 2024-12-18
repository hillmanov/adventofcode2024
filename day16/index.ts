import { readLines } from "../utils/io";
import {
  inGridBounds,
  go,
  walkGrid,
  pointsAreEqual,
  valueAt,
  type Point,
  encode,
  encodeWithDirection,
  DIRECTION,
  ORTHOGONAL_DIRECTIONS,
} from "../utils/grid";
import PriorityQueue  from "../utils/priorityQueue";

type maze = string[][];

interface Node {
  point: Point;
  costFromStart: number;
  heuristic: number;
  totalCost: number;
  parent: Node | null;
  direction: DIRECTION;
}

const heuristic = (a: Point, b: Point): number => {
  return Math.abs(a.col - b.col) + Math.abs(a.row - b.row);
}

async function part1(): Promise<number> {
  const maze = await getInput();
  const {start, end} = getStartAndEnd(maze);

  const findCheapestPath = (): number | null => {
    const open = new PriorityQueue<Node>((a, b) => a.totalCost - b.totalCost);
    const startNode: Node = {
      point: start,
      costFromStart: 0,                 // g(n)
      heuristic: heuristic(start, end), // h(n)
      totalCost: heuristic(start, end), // f(n)
      parent: null,
      direction: DIRECTION.R,
    }

    open.push(startNode);

    const visited: Map<number, number> = new Map(); // encoded point to costFromStart

    while (!open.isEmpty()) {
      const current = open.pop()!;

      if (pointsAreEqual(current.point, end)) {
        return current.costFromStart;
      }

      const key = encodeWithDirection(current.point, current.direction);
      if (visited.get(key) ?? Infinity <= current.costFromStart) {
        continue;
      }

      visited.set(encodeWithDirection(current.point, current.direction), current.costFromStart);

      const neighbors: { point: Point, direction: DIRECTION }[] = ORTHOGONAL_DIRECTIONS
      .map((direction) => ({ point: go(current.point, direction), direction }))
      .filter(({point}) => {
        return inGridBounds(maze, point) && valueAt(maze, point) !== "#";
      });

      for (const neighbor of neighbors) {
        let cost = current.costFromStart + 1;
        if (current.direction !== neighbor.direction) {
          cost += 1000;
        }

        const key = encodeWithDirection(neighbor.point, neighbor.direction);
        if (visited.get(key) ?? Infinity <= cost) {
          continue;
        }

        open.push({
          point: neighbor.point,
          costFromStart: cost,
          heuristic: heuristic(neighbor.point, end),
          totalCost: cost + heuristic(neighbor.point, end),
          parent: current,
          direction: neighbor.direction,
        })
      }
    }
    return null;
  }

  const path = findCheapestPath();
  if (!path) {
    return 0;
  }

  return path;
}

async function part2(): Promise<number> {
  const maze = await getInput();
  const {start, end} = getStartAndEnd(maze);

  return 0;
}

function dumpPath(path: path, maze: maze): void {
  for (let row = 0; row < maze.length; row++) {
    let rowString = "";
    for (let col = 0; col < maze[row].length; col++) {
      let found = false;
      if (!found) {
        rowString += maze[row][col];
      }
    }
    console.log(rowString);
  }

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
