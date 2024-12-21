import { readContents } from "../utils/io";
import { 
  type Point,
  walkGrid,
  valueAt,
  encode,
  go,
  ORTHOGONAL_DIRECTIONS,
  manhattanDistance,
} from "../utils/grid";

type Track = string[][];

type Step = {
  point: Point;
  ps: number;
}

async function part1(): Promise<number> {
  const track = await getInput();
  const { start, end } = findStartAndEnd(track);
  const path = getTrackPath(track, start);

  const pointToStepMap = new Map<number, Step>();
  for (const step of path) {
    pointToStepMap.set(encode(step.point), step);
  }

  let goodCheats = 0;
  for (const step of path) {
    const directionsWithWalls = ORTHOGONAL_DIRECTIONS.filter(dir => {
      return valueAt(track, go(step.point, dir)) === '#';
    });

    for (const dir of directionsWithWalls) {
      const startCheat = go(step.point, dir);
      const cheatToPoint = go(startCheat, dir);

      const cheatToStep = pointToStepMap.get(encode(cheatToPoint));
      if (!cheatToStep) {
        continue;
      }
      if ((cheatToStep?.ps - step.ps - 2) >= 100) {
        goodCheats++;
      }
    }
  }

  return goodCheats;
}

async function part2(): Promise<number> {
  const track = await getInput();
  const { start } = findStartAndEnd(track);
  const path = getTrackPath(track, start);

  const pointToStepMap = new Map<number, Step>();
  for (const step of path) {
    pointToStepMap.set(encode(step.point), step);
  }

  let goodCheats = 0;
  for (const step of path) {
    const stepPointRow = step.point.row;
    const stepPointCol = step.point.col;

    for (let r = stepPointRow - 20; r <= stepPointRow + 20; r++) {
      const maxColOffset = 20 - Math.abs(r - stepPointRow); 
      const colStart = stepPointCol - maxColOffset;
      const colEnd = stepPointCol + maxColOffset;

      for (let c = colStart; c <= colEnd; c++) {
        const cheatToStep = pointToStepMap.get(r << 12 | c);

        if (cheatToStep && cheatToStep.ps - step.ps >= 100) {
          const cheatPs = manhattanDistance(step.point, cheatToStep.point);
          if ((cheatToStep.ps - step.ps - cheatPs) >= 100) {
            goodCheats++;
          }
        }
      }
    }
  }

  return goodCheats;
}

function getTrackPath(track: Track, start: Point): Step[] {
  const path: Step[] = [];
  const visited = new Set<number>();

  let currentPoint = start;
  let current = valueAt(track, currentPoint);
  let ps = 1;
  while (current != "E") {
    path.push({ point: currentPoint, ps: ps++ });
    visited.add(encode(currentPoint));

    const nextDirection = ORTHOGONAL_DIRECTIONS.find(dir => {
      const tilePoint = go(currentPoint, dir);
      const tileValue = valueAt(track, tilePoint);
      if (!tileValue) return
      return !visited.has(encode(tilePoint)) && tileValue != "#";
    });

    currentPoint = go(currentPoint, nextDirection!);
    current = valueAt(track, currentPoint);
  }
  path.push({ point: currentPoint, ps });
  visited.add(encode(currentPoint));

  return path;
}

function findStartAndEnd(track: Track): { start: Point, end: Point } {
  const startAndEnd = { start: { row: -1, col: -1}, end: { row: -1, col: -1} }
  walkGrid(track, (value, point) => {
    if (value === "S") {
      startAndEnd.start = point;
    }
    if (value === "E") {
      startAndEnd.end = point;
    }
  });
  return startAndEnd;
}

async function getInput(): Promise<Track> {
  return (await readContents(__dirname + "/input.txt")).split("\n").map(line => line.split(""));
}

const part1Answer = 1507;
const part2Answer = 1037936;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
