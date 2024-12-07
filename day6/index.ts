import { readLines, inGridBounds } from "../utils";

const Direction = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
}

const DirectionDeltas = {
  [Direction.UP]: [-1, 0],
  [Direction.RIGHT]: [0, 1],
  [Direction.DOWN]: [1, 0],
  [Direction.LEFT]: [0, -1]
}

const directions = [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];

async function part1(): Promise<number> {
  const grid = (await readLines(__dirname + '/input.txt')).map(row => row.split(''));
  let currentPosition = getStartingPosition(grid);

  let visited = new Set<string>([currentPosition.toString()]);
  let currentDirection = Direction.UP;
  while (true) {
    const nextPosition = [currentPosition[0] + DirectionDeltas[currentDirection][0], currentPosition[1] + DirectionDeltas[currentDirection][1]];
    if (!inGridBounds(nextPosition[0], nextPosition[1], grid)) {
      break;
    }

    if (grid[nextPosition[0]][nextPosition[1]] === "#") {
      currentDirection = (currentDirection + 1) % directions.length;
    } else {
      currentPosition = nextPosition;
    }
    visited.add(currentPosition.toString());
  }

  return visited.size;
}

async function part2(): Promise<number> {
  const grid = (await readLines(__dirname + '/input.txt')).map(row => row.split(''));
  let currentPosition = getStartingPosition(grid);

  let visited = new Set<string>([currentPosition.toString()]);
  let currentDirection = Direction.UP;
  while (true) {
    const nextPosition = [currentPosition[0] + DirectionDeltas[currentDirection][0], currentPosition[1] + DirectionDeltas[currentDirection][1]];
    if (!inGridBounds(nextPosition[0], nextPosition[1], grid)) {
      break;
    }

    if (grid[nextPosition[0]][nextPosition[1]] === "#") {
      currentDirection = (currentDirection + 1) % directions.length;
      grid[currentPosition[0]][currentPosition[1]] = "C";
    } else {
      currentPosition = nextPosition;
    }

    visited.add(currentPosition.toString());
  }

  // 3 possible incomplete squares:
  // ⌞
  // ⌝
  // ⌜
  const obstructions = new Set<string>();
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "C") {
        // Find out which incomplete square we might be dealing with
        const topRight = searchRight(row, col, grid);
        const bottomLeft = searchDown(row, col, grid);
        let bottomRight: number[] | null = null;

        if (!topRight && !bottomLeft) {
          continue;
        }

        if (topRight && !bottomLeft) { // Possibly a ⌝
          bottomRight = searchDown(row, topRight[1], grid);
        }
        if (!topRight && bottomLeft) { // Possibly a ⌞
          bottomRight = searchRight(bottomLeft[0], col, grid);
        }
        
        if (topRight && bottomLeft) { // Dealing with a  ⌜
          const bottomRightObstructionPosition = [bottomLeft[0]+1, topRight[1]];
          if (!inGridBounds(bottomRightObstructionPosition[0], bottomRightObstructionPosition[1], grid)) {
            continue;
          }
          if (grid[bottomRightObstructionPosition[0]][bottomRightObstructionPosition[1]] === ".") {
            obstructions.add(bottomRightObstructionPosition.toString());
          }
        }
        if (topRight && bottomRight) { // Dealing with a ⌝
          const bottomLeftObstructionPosition = [bottomRight[0], col-1];
          if (!inGridBounds(bottomLeftObstructionPosition[0], bottomLeftObstructionPosition[1], grid)) {
            continue;
          }
          if (grid[bottomLeftObstructionPosition[0]][bottomLeftObstructionPosition[1]] === ".") {
            obstructions.add(bottomLeftObstructionPosition.toString());
          }
        }
        if (bottomLeft && bottomRight) { // Dealing with a ⌞
          const topRightObstructionPosition = [row, col+1];
          if (!inGridBounds(topRightObstructionPosition[0], topRightObstructionPosition[1], grid)) {
            continue;
          }
          if (grid[topRightObstructionPosition[0]][topRightObstructionPosition[1]] === ".") {
            obstructions.add(topRightObstructionPosition.toString());
          }
        }
      }
    }
  }

  return obstructions.size;
}

function searchRight(row: number, col: number, grid: string[][]): number[] | null {
  for (let currentCol = col+1; currentCol < grid[row].length; currentCol++) {
    if (grid[row][currentCol] === "C") {
      return [row, currentCol];
    }
  }
  return null;
}

function searchDown(row: number, col: number, grid: string[][]): number[] | null {
  for (let currentRow = row+1; currentRow < grid.length; currentRow++) {
    if (grid[currentRow][col] === "C") {
      return [currentRow, col];
    }
  }
  return null;
}

function getStartingPosition(grid: string[][]): number[] {
  let currentPosition: number[] = [];
  grid.forEach((row, rowIndex) => row.forEach((col, colIndex) => { if (col === "^") { currentPosition = [rowIndex, colIndex] } }));
  return currentPosition;
}

export {
  part1,
  part2
};
