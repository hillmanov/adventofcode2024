import { readLines } from "../utils/io";
import {
  type Point,
  go,
  encode,
  inGridBounds,
  DIRECTION,
  ORTHOGONAL_DIRECTIONS,
  DIAGONAL_DIRECTIONS,
  valueAt,
} from "../utils/grid";

type plant = string;
type garden = plant[][];

type plotPlant = {
  point: Point,
  borderCount: number,
  cornerCount: number
}

async function part1(): Promise<number> {
  const garden = await getInput();
  const plots = getPlots(garden);

  let totalCost = 0;
  for (const plot of plots) {
    for (const plants of plot.values()) {
      const plantCount = plants.length;
      const borderCount = plants.reduce((acc, plant) => acc + plant.borderCount, 0);
      totalCost += plantCount * borderCount;
    }
  }

  return totalCost;
}

async function part2(): Promise<number> {
  const garden = await getInput();
  const plots = getPlots(garden, true);

  let totalCost = 0;
  for (const plot of plots) {
    for (const plotPlants of plot.values()) {
      const plantCount = plotPlants.length;
      const cornerCount = plotPlants.reduce((acc, plant) => acc + plant.cornerCount, 0);

      totalCost += plantCount * cornerCount;
    }
  }

  return totalCost;
}

function getPlots(garden: garden, countCorners: boolean = false): Map<plant, plotPlant[]>[] {
  const visited = new Set<number>();
  const toVisit: Point[] = [];
  const plots: Map<plant, plotPlant[]>[] = [];

  const discoverPlot = (plotPlant: plant, point: Point, plot: plotPlant[]) => {
    if (visited.has(encode(point))) {
      return;
    }

    const plant = valueAt(garden, point);
    if (!plant) {
      return;
    }

    if (plant !== plotPlant) {
      toVisit.push(point);
      return;
    }

    const borders = new Set<DIRECTION>(ORTHOGONAL_DIRECTIONS.filter(direction => valueAt(garden, go(point, direction)) !== plotPlant));
    let cornerCount = 0;
    if (countCorners) {
      const cornerNeighbors = new Set<DIRECTION>(DIAGONAL_DIRECTIONS.filter(direction => valueAt(garden, go(point, direction)) !== plotPlant));
      if (borders.has(DIRECTION.U) && borders.has(DIRECTION.R)) {
        cornerCount++;
      }
      if (borders.has(DIRECTION.U) && borders.has(DIRECTION.L)) {
        cornerCount++;
      }
      if (borders.has(DIRECTION.D) && borders.has(DIRECTION.R)) {
        cornerCount++;
      }
      if (borders.has(DIRECTION.D) && borders.has(DIRECTION.L)) {
        cornerCount++;
      }
      if (!borders.has(DIRECTION.U) && !borders.has(DIRECTION.R) && cornerNeighbors.has(DIRECTION.UR)) {
        cornerCount++;
      }
      if (!borders.has(DIRECTION.U) && !borders.has(DIRECTION.L) && cornerNeighbors.has(DIRECTION.UL)) {
        cornerCount++;
      }
      if (!borders.has(DIRECTION.D) && !borders.has(DIRECTION.R) && cornerNeighbors.has(DIRECTION.DR)) {
        cornerCount++;
      }
      if (!borders.has(DIRECTION.D) && !borders.has(DIRECTION.L) && cornerNeighbors.has(DIRECTION.DL)) {
        cornerCount++;
      }
    }

    plot.push({
      point,
      borderCount: borders.size,
      cornerCount,
    });

    visited.add(encode(point));

    for (const d of ORTHOGONAL_DIRECTIONS) {
      const neighbor = go(point, d);
      if (inGridBounds(neighbor, garden)) {
        discoverPlot(plotPlant, neighbor, plot);
      }
    }
  }

  let currentPoint = { row: 0, col: 0 };
  toVisit.push(currentPoint);

  while(toVisit.length > 0) {
    let next = toVisit.pop();
    if (!next) {
      break;
    }
    const targetPlant = valueAt(garden, next)!;
    const plot: plotPlant[] = [];
    discoverPlot(targetPlant, next, plot);
    if (plot.length > 0) {
      plots.push(new Map([[targetPlant, plot]]));
    }
  }

  return plots;
}

async function getInput(): Promise<garden> {
  return (await readLines(__dirname + "/input.txt")).map(l => l.split(''));
}

const part1Answer = 1433460;
const part2Answer = 855082;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}

