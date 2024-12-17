import { readLines } from "../utils/io";
import { type Point } from "../utils/grid";

type Delta = {
  col: number;
  row: number;
}

type Robot = {
  start: Point;
  vector: Delta;
  current: Point;
}

const gridWidth = 101;
const gridHeight = 103;
const xLine = ((gridHeight - 1) / 2);
const yLine = ((gridWidth - 1) / 2);

async function part1(): Promise<number> {
  const robots = await getInput();

  let safetyFactors = [0, 0, 0, 0];
  for (const robot of robots) {
    robot.current.col = wrap(robot.current.col + (robot.vector.col * 100), gridWidth);
    robot.current.row = wrap(robot.current.row + (robot.vector.row * 100), gridHeight);
    if (robot.current.col < yLine && robot.current.row < xLine) {
      safetyFactors[0]++;
    }
    if (robot.current.col > yLine && robot.current.row < xLine) {
      safetyFactors[1]++;
    }
    if (robot.current.col < yLine && robot.current.row > xLine) {
      safetyFactors[2]++;
    }
    if (robot.current.col > yLine && robot.current.row > xLine) {
      safetyFactors[3]++;
    }
  }

  return safetyFactors.reduce((acc, val) => acc * val, 1);
}

async function part2(): Promise<number> {
  const robots = await getInput();
  const grid: boolean[][] = Array(gridHeight).fill(false).map(() => Array(gridWidth).fill(false));

  let seconds = 0;
  while(!looksLikeAChristmasTree(grid)) {
    seconds++;
    for (const robot of robots) {
      grid[robot.current.row][robot.current.col] = false;
      robot.current.col = wrap(robot.start.col + (robot.vector.col * seconds), gridWidth);
      robot.current.row = wrap(robot.start.row + (robot.vector.row * seconds), gridHeight);
      grid[robot.current.row][robot.current.col] = true;
    }
  } 

  return seconds;
}

function looksLikeAChristmasTree(grid: boolean[][]): boolean {
  const runMin = 15;
  for (let row = 0; row < gridHeight; row++) {
    let runLength = 0;
    for (let col = 0; col < gridWidth - runMin; col++) {
      if (grid[row][col]) {
        if (runLength++ >= 10) {
          return true      
        }
      } else {
        runLength = 0;
      }
    }
  }
  return false;
}

function wrap(n: number, max: number): number {
  return ((n % max) + max) % max;
}

async function getInput(): Promise<Robot[]> {
  const numsRegex = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/g;
  const robots: Robot[] = [];
  const lines = await readLines(__dirname + "/input.txt");
  for (const line of lines) {
    const robotChunk = line.matchAll(numsRegex).toArray()[0];
    robots.push({
      start: { col: parseInt(robotChunk[1]), row: parseInt(robotChunk[2]) },
      vector: { col: parseInt(robotChunk[3]),  row: parseInt(robotChunk[4]) },
      current: { col: parseInt(robotChunk[1]), row: parseInt(robotChunk[2]) },
    });
  }
  return robots;
}

const part1Answer = 230435667;
const part2Answer = 7709;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}

