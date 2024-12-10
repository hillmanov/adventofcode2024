import { readLines, inGridBounds } from '../io';
import type { Point } from '../dataStructures';
import { walkGrid } from '../iterators';

async function part1(): Promise<number> {
  const map = await getInput();
  const frequencyLocations = new Map<string, Point[]>();

  walkGrid<string>(map, (value, row, col) => {
    if (value === '.') {
      return;
    }
    if (!frequencyLocations.has(value)) {
      frequencyLocations.set(value, []);
    }

    frequencyLocations.get(value)!.push({ row, col });
  });

  const antinodeLocations = new Map<string, Point[]>();
  for (const [frequency, locations] of frequencyLocations.entries()) {
    if (!antinodeLocations.has(frequency)) {
      antinodeLocations.set(frequency, []);
    }

    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const location1 = locations[i];
        const location2 = locations[j];

        const dCol = location2.col - location1.col;
        const dRow = location2.row - location1.row;

        let antinode1 : Point = { row: location1.row - dRow, col: location1.col - dCol };
        let antinode2 : Point = { row: location2.row + dRow, col: location2.col + dCol };

        if (inGridBounds(antinode1.row, antinode1.col, map)) {
          antinodeLocations.get(frequency)!.push(antinode1);
        }
        if (inGridBounds(antinode2.row, antinode2.col, map)) {
          antinodeLocations.get(frequency)!.push(antinode2);
        }
      }
    }
  }

  let uniqueAntinodeLocations = new Set<string>();
  antinodeLocations.forEach((locations, frequency) => {
    locations.forEach(location => {
      uniqueAntinodeLocations.add(`${location.row},${location.col}`);
    });
  });


  return uniqueAntinodeLocations.size;
}

async function part2(): Promise<number> {
  const map = await getInput();
  const frequencyLocations = new Map<string, Point[]>();

  walkGrid<string>(map, (value, row, col) => {
    if (value === '.') {
      return;
    }
    if (!frequencyLocations.has(value)) {
      frequencyLocations.set(value, []);
    }

    frequencyLocations.get(value)!.push({ row, col });
  });

  const antinodeLocations = new Map<string, Point[]>();
  for (const [frequency, locations] of frequencyLocations.entries()) {
    if (!antinodeLocations.has(frequency)) {
      antinodeLocations.set(frequency, []);
    }

    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const location1 = locations[i];
        const location2 = locations[j];

        const dCol = location2.col - location1.col;
        const dRow = location2.row - location1.row;
        
        let antinode1 = { row: location1.row - dRow, col: location1.col - dCol };
        let antinode2 = { row: location2.row + dRow, col: location2.col + dCol };

        // Each location is an antinode as well
        antinodeLocations.get(frequency)!.push(location1);
        antinodeLocations.get(frequency)!.push(location2);
        
        while(inGridBounds(antinode1.row, antinode1.col, map)) {
          antinodeLocations.get(frequency)!.push(antinode1);
          antinode1 = { row: antinode1.row - dRow, col: antinode1.col - dCol };
        }
        while(inGridBounds(antinode2.row, antinode2.col, map)) {
          antinodeLocations.get(frequency)!.push(antinode2);
          antinode2 = { row: antinode2.row + dRow, col: antinode2.col + dCol };
        }
      }
    }
  }

  let uniqueAntinodeLocations = new Set<string>();
  antinodeLocations.forEach((locations) => {
    locations.forEach(location => {
      uniqueAntinodeLocations.add(`${location.row},${location.col}`);
    });
  });

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
