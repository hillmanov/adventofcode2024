import { readLines } from "../utils/io";
import { 
  DIRECTION, 
  move,
  inGridBounds, 
  pointsAreEqual,
  valueAt,
  copyPoint,
  setPointTo,
  type Point, 
} from "../utils/grid";

const NO_DIRECTION = DIRECTION.U;

const directions = [DIRECTION.U, DIRECTION.R, DIRECTION.D, DIRECTION.L];

async function part1(): Promise<number> {
  const grid = (await readLines(__dirname + '/input.txt')).map(row => row.split(''));

  let currentLocation = copyPoint(getStartingLocation(grid));
  let visited = new Set<number>([encode(currentLocation, 0)]);
  let currentDirection = DIRECTION.U;
  const nextLocation = copyPoint(currentLocation);
  while (true) {
    move(nextLocation, currentDirection);
    const v = valueAt(grid, nextLocation);

    if (v === null) {
      break;
    }

    if (v === "#") {
      currentDirection = (currentDirection + 1) % directions.length;
      setPointTo(nextLocation, currentLocation);
    } else {
      setPointTo(currentLocation, nextLocation); 
    }
    visited.add(encode(currentLocation, 0))
  }

  return visited.size;
}

async function part2(): Promise<number> {
  const grid = (await readLines(__dirname + '/input.txt')).map(row => row.split(''));
  let currentLocation = copyPoint(getStartingLocation(grid));
  let path : { location: Point, direction: DIRECTION }[] = [];
  let currentDirection = DIRECTION.U;
  const nextLocation = copyPoint(currentLocation);
  const firstPreviousLocation = new Map<number, { location: Point, direction: DIRECTION }>();

  while (true) {
    move(nextLocation, currentDirection);
    const v = valueAt(grid, nextLocation);

    if (v === null) {
      break;
    }

    if (v === "#") {
      currentDirection = (currentDirection + 1) % directions.length;
      setPointTo(nextLocation, currentLocation);
      path[path.length - 1].direction = currentDirection;
    } else {

      const encodedState = encode(nextLocation, 0);
      if (!firstPreviousLocation.has(encodedState)) {
        firstPreviousLocation.set(encodedState, { location: copyPoint(currentLocation), direction: currentDirection });
      }
      setPointTo(currentLocation, nextLocation);
      path.push({ location: copyPoint(currentLocation), direction: currentDirection });
    }
  }

  const willRepeat = (startLocation: Point, startDirection: DIRECTION, obstructionLocation: Point, visited: Set<number>) => {
    let currentLocation = copyPoint(startLocation);
    let currentDirection = startDirection;
    const nextLocation = copyPoint(currentLocation);

    while (true) {
      move(nextLocation, currentDirection);
      if (!inGridBounds(nextLocation, grid)) {
        return false;
      }

      if (valueAt(grid, nextLocation) === "#" || (pointsAreEqual(nextLocation, obstructionLocation))) {
        currentDirection = (currentDirection + 1) % directions.length;
        setPointTo(nextLocation, currentLocation);
      } else {
        setPointTo(currentLocation, nextLocation);
      }
      const encodedState = encode(currentLocation, currentDirection);

      if (visited.has(encodedState)) {
        return true;
      }

      visited.add(encodedState);
    }
  }

  // Figured out what is going on. I need to start at the location that was visited the first time before the obstruction's location. Not just the previous step. 
  const obstructions = new Set<number>();
  for (let i = 0; i < path.length - 1; i++) {
    const obstruction = path[i + 1]
    const previousLocation = firstPreviousLocation.get(encode(obstruction.location, NO_DIRECTION))!;
    if (willRepeat(previousLocation.location, previousLocation.direction, obstruction.location, new Set<number>([]))) {
      obstructions.add(encode(path[i + 1].location, 0));
    }
  }

  return obstructions.size;
}

function getStartingLocation(grid: string[][]): Point {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "^") {
        return { row, col }
      }
    }
  }
  return { row: -1, col: -1 };
}

function encode(p: Point, direction: number): number {
  return p.row << 12 | p.col << 4 | direction;
}

function decode(encoded: number): { location: Point, direction: number } {
  const row = (encoded >> 12) & 0xFFFFF; 
  const col = (encoded >> 4) & 0xFF;     
  const direction = encoded & 0xF;      
  return { location: { row, col }, direction };
}

const part1Answer = 5239;
const part2Answer = 1753;

global.part2 = part2;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}

