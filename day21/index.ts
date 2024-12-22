import { readLines } from "../utils/io";
import { 
  type Point,
} from "../utils/grid";

async function part1(): Promise<number> {
  const codes = await getInput();

  const numPad: { [key: string]: Point } = {
    '7': { row: 0, col: 0},
    '8': { row: 0, col: 1},
    '9': { row: 0, col: 2},
    '4': { row: 1, col: 0},
    '5': { row: 1, col: 1},
    '6': { row: 1, col: 2},
    '1': { row: 2, col: 0},
    '2': { row: 2, col: 1},
    '3': { row: 2, col: 2},
    '0': { row: 3, col: 1},
    'A': { row: 3, col: 2},
  }

  const directionalPad: { [key: string]: Point } = {
    '^': { row: 0, col: 1 },
    'A': { row: 0, col: 2 },
    '<': { row: 1, col: 0 },
    'V': { row: 1, col: 1 },
    '>': { row: 1, col: 2 },
  }

  // Need to recurively get the manhattan distance between each layer. Don't really need to know the path to get there.  

  const directionPadToNumPad = (directionPadStart: Point, numPadStart: Point, numPadTarget: Point): string[] => {
    const dRow = numPadTarget.row - numPadStart.row;
    const dCol = numPadTarget.col - numPadStart.col;



  }

  return 0;
}

async function part2(): Promise<number> {
  // I imagine that this one will introduce like 1,000 layers or something. 
  // Cache the amount of move/the moves to get from one state to another. Look for some kind of pattern. 
  //
  const input = await getInput();
  return 0;
}

async function getInput(): Promise<string[]> {
  return await readLines(__dirname + "/input.txt");
}

const part1Answer = null;
const part2Answer = null;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
