import { readContents } from "../io";

async function part1(): Promise<number> {
  const input = await readContents(__dirname + "/input.txt");
  const mulRegex = /mul\((\d+),(\d+)\)/g;

  let sum = 0;
  for (let match of input.matchAll(mulRegex)) {
    sum += parseInt(match[1]) * parseInt(match[2]);
  }

  return sum;
}

async function part2(): Promise<number> {
  const input = await readContents(__dirname + "/input.txt");
  const mulRegex = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g;

  let sum = 0;
  let enabled = true;
  for (let match of input.matchAll(mulRegex)) {
    if (match[0] === "do()") {
      enabled = true;
    }
    if (match[0] === "don't()") {
      enabled = false;
    }
    if (match[0].startsWith("mul") && enabled) {
      sum += parseInt(match[1]) * parseInt(match[2]);
    }
  }

  return sum;
}

const part1Answer = 160672468;
const part2Answer = 84893551;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
