import { readLines } from "../utils/io";
import { go, inGridBounds, ORTHOGONAL_DIRECTIONS, walkGrid, valueAt, DIRECTION } from "../utils/grid";

type plant = string;
type garden = plant[][];

async function part1(): Promise<number> {
  const garden = await getInput();

  const areaCounter = new Map<plant, number>();
  const similarNeighborCounts = new Map<plant, number[]>();

  walkGrid(garden, (plantType, location) => {
    if (!areaCounter.has(plantType)) areaCounter.set(plantType, 0);
    if (!similarNeighborCounts.has(plantType)) similarNeighborCounts.set(plantType, []);

    areaCounter.set(plantType, areaCounter.get(plantType)! + 1);
    let similarNeighborCount = 0;
    for (let direction of ORTHOGONAL_DIRECTIONS) {
      similarNeighborCount += valueAt(garden, go(location, direction)) === plantType ? 1 : 0;
    }
    similarNeighborCounts.get(plantType)!.push(similarNeighborCount);
  });

  return 0;
}

async function part2(): Promise<number> {
  return 0;
}

async function getInput(): Promise<garden> {
  return (await readLines(__dirname + "/input.txt")).map(l => l.split(''));
}

const part1Answer = null;
const part2Answer = null;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}

