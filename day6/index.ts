import { readLines, inGridBounds } from "../io";

const dir = {
  U: 0,
  R: 1,
  D: 2,
  L: 3
}

const delta = {
  [dir.U]: [-1, 0],
  [dir.R]: [0, 1],
  [dir.D]: [1, 0],
  [dir.L]: [0, -1]
}

const directions = [dir.U, dir.R, dir.D, dir.L];

async function part1(): Promise<number> {
  const grid = (await readLines(__dirname + '/input.txt')).map(row => row.split(''));

  let currentLocation = getStartingLocation(grid);
  let visited = new Set<number>([encode(currentLocation, 0)]);
  let currentDirection = dir.U;
  while (true) {
    const nextLocation = [currentLocation[0] + delta[currentDirection][0], currentLocation[1] + delta[currentDirection][1]];
    if (!inGridBounds(nextLocation[0], nextLocation[1], grid)) {
      break;
    }

    if (grid[nextLocation[0]][nextLocation[1]] === "#") {
      currentDirection = (currentDirection + 1) % directions.length;
    } else {
      currentLocation = nextLocation;
    }
    visited.add(encode(currentLocation, 0))
  }

  return visited.size;
}

async function part2(): Promise<number> {
  const grid = (await readLines(__dirname + '/input.txt')).map(row => row.split(''));
  let currentLocation = getStartingLocation(grid);
  let path : { location: number[], direction: number }[] = [];
  let currentDirection = dir.U;

  while (true) {
    const nextLocation = [currentLocation[0] + delta[currentDirection][0], currentLocation[1] + delta[currentDirection][1]];
    if (!inGridBounds(nextLocation[0], nextLocation[1], grid)) {
      break;
    }

    if (grid[nextLocation[0]][nextLocation[1]] === "#") {
      currentDirection = (currentDirection + 1) % directions.length;
    } else {
      currentLocation = nextLocation;
    }

    path.push({ location: currentLocation, direction: currentDirection });
  }

  const _startLocation = getStartingLocation(grid);
  const willRepeat = (startLocation: number[], startDirection: number, obstructionLocation: number[]) => {
    let currentLocation = _startLocation.slice();
    let currentDirection = dir.U;

    const visited = new Set<number>([encode(currentLocation, currentDirection)]);

    while (true) {
      const nextLocation = [currentLocation[0] + delta[currentDirection][0], currentLocation[1] + delta[currentDirection][1]];
      if (!inGridBounds(nextLocation[0], nextLocation[1], grid)) {
        return false;
      }

      if (grid[nextLocation[0]][nextLocation[1]] === "#" || (obstructionLocation[0] === nextLocation[0] && obstructionLocation[1] === nextLocation[1])) {
        currentDirection = (currentDirection + 1) % directions.length;
      } else {
        currentLocation = nextLocation;
      }

      if (visited.has(encode(currentLocation, currentDirection))) {
        return true;
      }

      visited.add(encode(currentLocation, currentDirection));
    }
  }

  const obstructions = new Set<number>();
  for (let i = 0; i < path.length - 1; i++) {
    if (willRepeat(path[i].location, path[i].direction, path[i + 1].location)) {
      obstructions.add(encode(path[i + 1].location, 0));
    }
  }

  return obstructions.size;
}

function getStartingLocation(grid: string[][]): number[] {
  let currentLocation: number[] = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "^") {
        currentLocation = [row, col];
        break;
      }
    }
  }
  return currentLocation;
}

function encode(location : number[], direction: number): number {
  return location[0] << 12 | location[1] << 4 | direction;
}

const part1Answer = 5239;
const part2Answer = 1753;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}

