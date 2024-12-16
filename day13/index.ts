import { readContents } from '../utils/io';

type Location = {
  x: number;
  y: number;
}

type Delta = {
  x: number;
  y: number;
}

type Machine = {
  A: Delta;
  B: Delta;
  Prize: Location;
}

async function part1(): Promise<number> {
  const machines = await getInput();

  let totalCost = 0;
  for (const machine of machines) {
    let lowestCost = Infinity;
    for(let aPresses = 0; aPresses <= 100; aPresses++) {
      for (let bPresses = 0; bPresses <= 100; bPresses++) {
        let x = (aPresses * machine.A.x) + (bPresses * machine.B.x);
        let y = (aPresses * machine.A.y) + (bPresses * machine.B.y);
        if (x === machine.Prize.x && y === machine.Prize.y) {
          lowestCost = Math.min(aPresses * 3 + bPresses, lowestCost);
        }
      }
    }
    if (lowestCost !== Infinity) {
      totalCost += lowestCost;
    }
  }

  return totalCost;
}

async function part2(): Promise<number> {

  return 0;
}

async function getInput(): Promise<Machine[]> {
  const chunks = (await readContents(__dirname + "/input.txt")).split('\n\n');
  const numsRegex = /(\d+).*?(\d+)/g;
  return chunks.map(chunk => {
    const [aLine, bLine, prizeLine] = chunk.split('\n');
    const [[,aX, aY]] = aLine.matchAll(numsRegex).toArray();
    const [[,bX, bY]] = bLine.matchAll(numsRegex).toArray();
    const [[,prizeX, prizeY]] = prizeLine.matchAll(numsRegex).toArray();
    return {
      A: { x: parseInt(aX), y: parseInt(aY) },
      B: { x: parseInt(bX), y: parseInt(bY) },
      Prize: { x: parseInt(prizeX), y: parseInt(prizeY) }
    }
  })
}

const part1Answer = 33921;
const part2Answer = null;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
};
