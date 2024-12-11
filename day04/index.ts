import { readLines } from "../utils/io";

enum Direction {
  UP = 0,
  DOWN = 1,
  LEFT = 2,
  RIGHT = 3,
  UP_LEFT = 4,
  UP_RIGHT = 5,
  DOWN_LEFT = 6,
  DOWN_RIGHT = 7
}

async function part1(): Promise<number> {
  const grid = (await readLines(__dirname + "/input.txt")).map((line) => line.split(''));

  const WORD = "XMAS";

  const search = (row: number, col: number, lookFor: string, direction: Direction): boolean => {
    const nextMove = getNextMove(row, col, direction, grid);
    if (nextMove && grid[nextMove[0]][nextMove[1]] === lookFor) {
      if (WORD.endsWith(lookFor)) {
        return true;
      }
      return search(nextMove[0], nextMove[1], WORD[WORD.indexOf(lookFor) + 1], direction);
    }
    return false;
  }

  let found = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === WORD[0]) {
        for (let dir = 0; dir < 8; dir++) {
          if (search(row, col, WORD[1], dir)) {
            found++;
          }
        }
      }
    }
  }

  return found;
}

async function part2(): Promise<number> {
  const grid = (await readLines(__dirname + "/input.txt")).map((line) => line.split(''));

  const WORD = "MAS";
  const search = (row: number, col: number, lookFor: string, direction: Direction): boolean => {
    const nextMove = getNextMove(row, col, direction, grid);
    if (nextMove && grid[nextMove[0]][nextMove[1]] === lookFor) {
      if (WORD.endsWith(lookFor)) {
        return true;
      }
      return search(nextMove[0], nextMove[1], WORD[WORD.indexOf(lookFor) + 1], direction);
    }
    return false;
  }

  // When finding a MAS, increase the count of the location of the "A" by 1. In the end, if an "A" has been used twice, we know it is part of an X. 
  let aLocationUses = new Map<string, number>();
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === WORD[0]) {
        for (let dir of [Direction.UP_LEFT, Direction.UP_RIGHT, Direction.DOWN_LEFT, Direction.DOWN_RIGHT]) {
          if (search(row, col, WORD[1], dir)) {
            const aLocation = getNextMove(row, col, dir, grid);
            if (aLocation) {
              aLocationUses.set(aLocation.toString(), (aLocationUses.get(aLocation.toString()) ?? 0) + 1);
            }
          }
        }
      }
    }
  }

  let found = 0;
  for (let uses of aLocationUses.values()) {
    if (uses == 2) {
      found++;
    }
  }

  return found;
}

function getNextMove(row: number, col: number, direction: Direction, grid: string[][]): number[] | null {
  const numRows = grid.length;
  const numCols = grid[0].length;
  
  switch (direction) {
  case Direction.UP:
    return row > 0 ? [row - 1, col] : null;
  case Direction.DOWN:
    return row < numRows - 1 ? [row + 1, col] : null;
  case Direction.LEFT:
    return col > 0 ? [row, col - 1] : null;
  case Direction.RIGHT:
    return col < numCols - 1 ? [row, col + 1] : null;
  case Direction.UP_LEFT:
    return row > 0 && col > 0 ? [row - 1, col - 1] : null;
  case Direction.UP_RIGHT:
    return row > 0 && col < numCols - 1 ? [row - 1, col + 1] : null;
  case Direction.DOWN_LEFT:
    return row < numRows - 1 && col > 0 ? [row + 1, col - 1] : null;
  case Direction.DOWN_RIGHT:
    return row < numRows - 1 && col < numCols - 1 ? [row + 1, col + 1] : null;
  }
}

const part1Answer = 2427;
const part2Answer = 1900;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
