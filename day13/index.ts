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
    totalCost += cramersRule(machine);
  }

  return totalCost;
}

async function part2(): Promise<number> {
  const machines = await getInput();
  for (const machine of machines) {
    machine.Prize.x += 10000000000000;
    machine.Prize.y += 10000000000000;
  }
    
  let totalCost = 0;
  for (const machine of machines) {
    totalCost += cramersRule(machine);
  }

  return totalCost;
}

function cramersRule(machine: Machine): number {
  const { A, B, Prize } = machine;
  const D = A.x * B.y - A.y * B.x;
  if (D === 0) {
    return 0;
  }

  const DX = Prize.x * B.y - Prize.y * B.x;
  const DY = A.x * Prize.y - A.y * Prize.x;

  const m = DX / D;
  const n = DY / D;

  if (!Number.isInteger(m) || !Number.isInteger(n)) {
    return 0;
  }

  const isValid = (m * D === DX) && (n * D === DY);
  return isValid ? (3 * m + n) : 0;
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
const part2Answer = 82261957837868;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
};
