import { readLines } from "../utils/io";
import { type Point } from "../utils/grid";

type Delta = {
  col: number;
  row: number;
}

type Robot = {
  start: Point;
  vector: Delta;
  end: Point;
}

async function part1(): Promise<number> {
  const robots = await getInput();
  const gridWidth = 101;
  const gridHeight = 103;

  let xLine = ((gridHeight - 1) / 2);
  let yLine = ((gridWidth - 1) / 2);

  let safetyFactors = [0, 0, 0, 0];
  for (const robot of robots) {
    robot.end.col = wrap(robot.end.col + (robot.vector.col * 100), gridWidth);
    robot.end.row = wrap(robot.end.row + (robot.vector.row * 100), gridHeight);
    if (robot.end.col < yLine && robot.end.row < xLine) {
      safetyFactors[0]++;
    }
    if (robot.end.col > yLine && robot.end.row < xLine) {
      safetyFactors[1]++;
    }
    if (robot.end.col < yLine && robot.end.row > xLine) {
      safetyFactors[2]++;
    }
    if (robot.end.col > yLine && robot.end.row > xLine) {
      safetyFactors[3]++;
    }
  }

  return safetyFactors.reduce((acc, val) => acc * val, 1);
}

async function part2(): Promise<number> {
  return 0;
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
      end: { col: parseInt(robotChunk[1]), row: parseInt(robotChunk[2]) },
    });
  }
  return robots;
}

const part1Answer = 230435667;
const part2Answer = null;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}

