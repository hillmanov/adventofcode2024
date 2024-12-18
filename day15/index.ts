import { readContents } from "../utils/io";
import { 
  type Point,
  DIRECTION,
  walkGrid,
  inGridBounds,
  valueAt,
  go,
} from "../utils/grid";

const instructionDirection: {[key: string]: DIRECTION} = {
  "^": DIRECTION.U,
  "v": DIRECTION.D,
  "<": DIRECTION.L,
  ">": DIRECTION.R,
}

type grid = string[][];
type instruction = string;

async function part1(): Promise<number> {
  const {map, instructions, start} = await getInput();

  function attemptMove(from: Point, direction: DIRECTION): boolean {
    const dest = go(from, direction);
    const destThing = valueAt(map, dest);

    if (!inGridBounds(map, dest) || destThing === "#") {
      return false;
    }

    if (destThing === '.') {
      map[dest.row][dest.col] = map[from.row][from.col];
      map[from.row][from.col] = '.';
      return true;
    }

    if (destThing === 'O') {
      if (attemptMove(dest, direction)) {
        return attemptMove(from, direction);
      }
    }

    return false;
  }

  let robot = start;
  for (const instruction of instructions) {
    const direction = instructionDirection[instruction];
    if (attemptMove(robot, direction)) {
      robot = go(robot, direction);
    }
  }

  let sum = 0;
  walkGrid(map, (value, point) => {
    if (value === "O") {
      sum += ((point.row * 100) + point.col);
    }
  });

  return sum;
}

async function part2(): Promise<number> {
  let {map, instructions} = await getInput();

  map = map.map(row => {
    return row.flatMap(cell => {
      switch (cell) {
        case "#":
          return ["#","#"];
        case "O":
          return ["[", "]"]
        case ".":
          return [".", "."];
        case "@":
          return ["@", "."];
      }
    });
  }) as grid;

  let start: Point = {col: -1, row: -1};
  walkGrid(map, (value, point) => {
    if (value === "@") {
      start = point;
      return false;
    }
  });

  const canMoveBox = (leftEdge: Point, rightEdge: Point, direction: DIRECTION.U | DIRECTION.D): boolean => {
    const leftEdgeDest = go(leftEdge, direction);
    const rightEdgeDest = go(rightEdge, direction);
    const leftEdgeDestThing = valueAt(map, leftEdgeDest);
    const rightEdgeDestThing = valueAt(map, rightEdgeDest);

    if (!inGridBounds(map, leftEdgeDest) || leftEdgeDestThing === "#" || !inGridBounds(map, rightEdgeDest) || rightEdgeDestThing === "#") {
      return false;
    }

    if (leftEdgeDestThing === '.' && rightEdgeDestThing === '.') {
      return true;
    }

    if (leftEdgeDestThing === '[' && rightEdgeDestThing === ']') {
      return canMoveBox(leftEdgeDest, rightEdgeDest, direction);
    }

    let canMove = true;
    if (leftEdgeDestThing === ']') {
      canMove = canMove && canMoveBox(go(leftEdgeDest, DIRECTION.L), leftEdgeDest, direction);
    }
    if (rightEdgeDestThing === '[') {
      canMove = canMove && canMoveBox(rightEdgeDest, go(rightEdgeDest, DIRECTION.R), direction);
    }

    return canMove;
  }
  
  function moveBox(leftEdge: Point, rightEdge: Point, direction: DIRECTION.U | DIRECTION.D): boolean {
    const leftEdgeDest = go(leftEdge, direction);
    const rightEdgeDest = go(rightEdge, direction);
    const leftEdgeDestThing = valueAt(map, leftEdgeDest);
    const rightEdgeDestThing = valueAt(map, rightEdgeDest);

    if (leftEdgeDestThing === '.' && rightEdgeDestThing === '.') {
      map[leftEdgeDest.row][leftEdgeDest.col] = map[leftEdge.row][leftEdge.col];
      map[leftEdge.row][leftEdge.col] = '.';

      map[rightEdgeDest.row][rightEdgeDest.col] = map[rightEdge.row][rightEdge.col];
      map[rightEdge.row][rightEdge.col] = '.';
    }
    if (leftEdgeDestThing === '[' && rightEdgeDestThing === ']') {
      return moveBox(leftEdgeDest, rightEdgeDest, direction);
    }
    if (leftEdgeDestThing === ']') {
      moveBox(go(leftEdgeDest, DIRECTION.L), leftEdgeDest, direction);
    }
    if (rightEdgeDestThing === '[') {
      moveBox(rightEdgeDest, go(rightEdgeDest, DIRECTION.R), direction);
    }

    return true;
  }

  function attemptMove(from: Point, direction: DIRECTION): boolean {
    const dest = go(from, direction);
    const destThing = valueAt(map, dest);

    if (!inGridBounds(map, dest) || destThing === "#") {
      return false;
    }

    if (destThing === '.') {
      map[dest.row][dest.col] = map[from.row][from.col];
      map[from.row][from.col] = '.';
      return true;
    }

    if (destThing === '[' || destThing === ']') {
      switch (direction) {
        case DIRECTION.L:
        case DIRECTION.R:
          if (attemptMove(dest, direction)) {
            return attemptMove(from, direction);
          }
          break;
        case DIRECTION.U:
        case DIRECTION.D:
          if (destThing === '[') {
            if (canMoveBox(dest, go(dest, DIRECTION.R), direction)) {
              moveBox(dest, go(dest, DIRECTION.R), direction);
              return attemptMove(from, direction);
            }
          } else if (destThing === ']') {
            if (canMoveBox(go(dest, DIRECTION.L), dest, direction)) {
              moveBox(go(dest, DIRECTION.L), dest, direction);
              return attemptMove(from, direction);
            }
          }
          return false;
      }
    }
    return false;
  }

  let robot = start;
  for (const instruction of instructions) {
    const direction = instructionDirection[instruction];
    if (attemptMove(robot, direction)) {
      robot = go(robot, direction);
    }
  }

  let sum = 0;
  walkGrid(map, (value, point) => {
    if (value === "[") {
      sum += ((point.row * 100) + point.col);
    }
  });

  return sum;
}

async function getInput(): Promise<{map: grid, instructions: instruction[], start: Point}> {
  const contents = await readContents(__dirname + "/input.txt");
  const [mapChunk, instructionsChunk] = contents.split("\n\n");
  const map = mapChunk.split("\n").map(row => row.split(""));
  let start: Point = {col: -1, row: -1};

  walkGrid(map, (value, point) => {
    if (value === "@") {
      start = point;
      return false;
    }
  })
  const instructions = instructionsChunk.split("\n").flatMap(line => line.split(""));

  return {map, instructions, start};
}

const part1Answer = 1360570;
const part2Answer = 1381446;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}

