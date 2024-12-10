import { readLines } from  "../io";

async function part1(): Promise<number> {
  const lines = await readLines(__dirname + "/input.txt");

  const left: number[] = [];
  const right: number[] = [];

  lines.forEach((line: string) => {
    const parts = line.split('   ');
    left.push(parseInt(parts[0]));
    right.push(parseInt(parts[1]));
  });

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  let totalDistance = 0;
  for (let i = 0; i < lines.length; i++) {
    totalDistance += Math.abs(left[i] - right[i]);
  }

  return totalDistance;
}

async function part2(): Promise<number> {
  const lines = await readLines(__dirname + "/input.txt");

  const left: number[] = [];
  const counts: { [key: number]: number } = {};

  lines.forEach((line: string) => {
    const parts = line.split('   ');
    left.push(parseInt(parts[0]));
    counts[parseInt(parts[1])] = (counts[parseInt(parts[1])] ?? 0) + 1;
  });

  let totalDistance = 0;
  for (let i = 0; i < lines.length; i++) {
    totalDistance += left[i] * (counts[left[i]] ?? 0);
  }

  return totalDistance;
}

const part1Answer = 3574690;
const part2Answer = 22565391;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
