import { readLines } from '../utils/io';
import {
  type Point,
  walkGrid,
  inGridBounds,
  moveAmount,
  encode,
  DIRECTION
} from '../utils/grid';

async function part1(): Promise<number> {
  const map = await getInput();
  const frequencyLocations = new Map<string, Point[]>();

  walkGrid<string>(map, (value, point) => {
    if (value === '.') {
      return;
    }
    if (!frequencyLocations.has(value)) {
      frequencyLocations.set(value, []);
    }

    frequencyLocations.get(value)!.push(point);
  });

  const uniqueAntinodeLocations = new Set<number>();
  for (const [, locations] of frequencyLocations.entries()) {

    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const location1 = locations[i];
        const location2 = locations[j];

        const dCol = location2.col - location1.col;
        const dRow = location2.row - location1.row;

        let antinode1 = { row: location1.row, col: location1.col };
        let antinode2 = { row: location2.row, col: location2.col };

        moveAmount(antinode1, DIRECTION.UL, dRow, dCol);
        moveAmount(antinode2, DIRECTION.DR, dRow, dCol);

        if (inGridBounds(map, antinode1)) {
          uniqueAntinodeLocations.add(encode(antinode1));
        }
        if (inGridBounds(map, antinode2)) {
          uniqueAntinodeLocations.add(encode(antinode2));
        }
      }
    }
  }

  return uniqueAntinodeLocations.size;
}

async function part2(): Promise<number> {
  const map = await getInput();
  const frequencyLocations = new Map<string, Point[]>();

  walkGrid<string>(map, (value, point) => {
    if (value === '.') {
      return;
    }
    if (!frequencyLocations.has(value)) {
      frequencyLocations.set(value, []);
    }

    frequencyLocations.get(value)!.push(point);
  });

  const antinodeLocations = new Map<string, number[]>();
  let uniqueAntinodeLocations = new Set<number>();
  for (const [, locations] of frequencyLocations.entries()) {

    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const location1 = locations[i];
        const location2 = locations[j];

        const dCol = location2.col - location1.col;
        const dRow = location2.row - location1.row;
        
        let antinode1 = { row: location1.row, col: location1.col };
        let antinode2 = { row: location2.row, col: location2.col };

        moveAmount(antinode1, DIRECTION.UL, dRow, dCol);
        moveAmount(antinode2, DIRECTION.DR, dRow, dCol);

        // Each location is an antinode as well
        uniqueAntinodeLocations.add(encode(location1));
        uniqueAntinodeLocations.add(encode(location2));
        
        while(inGridBounds(map, antinode1)) {
          uniqueAntinodeLocations.add(encode(antinode1));
          moveAmount(antinode1, DIRECTION.UL, dRow, dCol);
        }
        while(inGridBounds(map, antinode2)) {
          uniqueAntinodeLocations.add(encode(antinode2));
          moveAmount(antinode2, DIRECTION.DR, dRow, dCol);
        }
      }
    }
  }


  return uniqueAntinodeLocations.size;
}

async function getInput(): Promise<string[][]> {
  return (await readLines(__dirname + '/input.txt')).map(l => l.split(''));
}

const part1Answer = 271;
const part2Answer = 994;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
