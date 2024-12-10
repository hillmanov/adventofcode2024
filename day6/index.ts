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
  let visited = new Set<string>([currentLocation.toString()]);
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
    visited.add(currentLocation.toString());
  }

  return visited.size;
}

async function part2(): Promise<number> {
  const grid = (await readLines(__dirname + '/input.txt')).map(row => row.split(''));

  let currentLocation = getStartingLocation(grid);
  let visited = new Set<string>([currentLocation.toString()]);
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

    visited.add(currentLocation.toString());
  }

  const willRepeat = (obstructionLocation: number[]) => {
    const clonedGrid = grid.map(row => row.slice());
    clonedGrid[obstructionLocation[0]][obstructionLocation[1]] = "#";

    let currentLocation = getStartingLocation(clonedGrid);
    let currentDirection = dir.U;
    const visited = new Set<string>([s(currentLocation, currentDirection)]);

    while (true) {
      const nextLocation = [currentLocation[0] + delta[currentDirection][0], currentLocation[1] + delta[currentDirection][1]];
      if (!inGridBounds(nextLocation[0], nextLocation[1], clonedGrid)) {
        return false;
      }

      if (clonedGrid[nextLocation[0]][nextLocation[1]] === "#") {
        currentDirection = (currentDirection + 1) % directions.length;
      } else {
        currentLocation = nextLocation;
      }

      if (visited.has(s(currentLocation, currentDirection))) {
        return true;
      }

      visited.add(s(currentLocation, currentDirection));
    }
  }

  const obstructions = new Set<string>();
  for (let _location of visited.values()) {
    let location = _location.split(',').map(n => parseInt(n, 10));
    if (willRepeat(location)) {
      obstructions.add(location.toString());
    }
  }

  return obstructions.size;
}

function getStartingLocation(grid: string[][]): number[] {
  let currentLocation: number[] = [];
  grid.forEach((row, rowIndex) => row.forEach((col, colIndex) => { if (col === "^") { currentLocation = [rowIndex, colIndex] } }));
  return currentLocation;
}

function s(location : number[], direction: number) {
  return location.toString() + "," + direction.toString();
}

export {
  part1,
  part2
};
