import { readLines } from "../utils/io";

type plant = string;
type garden = plant[][];

async function part1(): Promise<number> {
  const garden = await getInput();



  return 0;
}

async function part2(): Promise<number> {
  return 0;
}

async function getInput(): Promise<garden> {
  return (await readLines(__dirname + "/input.txt")).map((l) => l.split(""))
}

const part1Answer = null;
const part2Answer = null;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}

