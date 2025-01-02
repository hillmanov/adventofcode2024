import { readLines } from "../utils/io";
import { 
  type Point,
  move,
  DIRECTION,
  copyPoint,
  pointsAreEqual,
  DirectionChar,
} from "../utils/grid";
import { times } from "../utils/iterate";

type PadType = 'numPad' | 'directionalPad';

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
  'v': { row: 1, col: 1 },
  '>': { row: 1, col: 2 },
}

type Pad = {
  currentSymbol: string;
  padType: PadType;
}

const moveCache = new Map<string, string[]>();
const moveCountCache = new Map<string, number>();

for (const {padType, pad} of [{ padType: 'numPad' as PadType, pad: numPad }, { padType: 'directionalPad' as PadType, pad: directionalPad }]) {
  for (const startSymbol of Object.keys(pad)) {
    for (const targetSymbol of Object.keys(pad)) {
      const key = startSymbol + targetSymbol + padType;
      if (moveCountCache.has(key)) {
        continue;
      }
      const moves = getMovementsToTarget(padType, startSymbol, targetSymbol);
      moveCountCache.set(key, moves.length);
    }
  }
}

async function part1(): Promise<number> {
  const sequences = await getInput();

  let pads: Pad[] = [
    {
      currentSymbol: 'A',
      padType: 'numPad',
    }, {
      currentSymbol: 'A',
      padType: 'directionalPad',
    }, {
      currentSymbol: 'A',
      padType: 'directionalPad',
    },
  ];

  let sum = 0;
  for(const sequence of sequences) {
    const moves = getSequenceLength(sequence.split(''), pads)
    const sequenceNumber = parseInt(sequence.replace(/\D/g, ''));
    sum += sequenceNumber * moves.length;
    pads.forEach(pad => pad.currentSymbol = 'A');
  }
  return sum;
}

async function part2(): Promise<number> {
  const sequences = await getInput();

  let pads: Pad[] = [{
    currentSymbol: 'A',
    padType: 'numPad',
  }];

  times(10, () => {
    pads.push({
      currentSymbol: 'A',
      padType: 'directionalPad',
    })
  });

  pads.push({
    currentSymbol: 'A',
    padType: 'directionalPad',
  });

  let sum = 0;
  for(const sequence of sequences) {
    const moves = getSequenceLength(sequence.split(''), pads)
    const sequenceNumber = parseInt(sequence.replace(/\D/g, ''));
    sum += sequenceNumber * moves.length;
    pads.forEach(pad => pad.currentSymbol = 'A');
  }
  return -1;
}

function getSequenceLength (sequence: string[], pads: Pad[], padIndex: number = 0): number {
  const pad = pads[padIndex];
  const nextSequence: string[] = [];
  for (const targetSymbol of sequence) {
    const sequence = getMovementsToTarget(pad.padType, pad.currentSymbol, targetSymbol);
    nextSequence.push(...sequence);
    nextSequence.push('A');
    pad.currentSymbol = targetSymbol;
  }

  if (padIndex === pads.length - 1) {
    return nextSequence.length;
  } else {
    return getSequenceLength(nextSequence, pads, padIndex + 1);
  }
}

function getMovementsToTarget(padType: PadType, startSymbol: string, targetSymbol: string): string[] {
  const key = startSymbol + targetSymbol + padType;
  if (moveCache.has(key)) {
    return moveCache.get(key)!;
  }
  const startPoint = padType === 'numPad' ? numPad[startSymbol] : directionalPad[startSymbol];
  const targetPoint = padType === 'numPad' ? numPad[targetSymbol] : directionalPad[targetSymbol];

  const dRow = targetPoint.row - startPoint.row;
  const dCol = targetPoint.col - startPoint.col;

  const goingUp = dRow < 0;
  const goingDown = dRow > 0;
  const goingLeft = dCol < 0;
  const goingRight = dCol > 0;

  let deltas: DIRECTION[] = [];
  if (goingUp) {
    deltas.push(DIRECTION.U);
  }
  if (goingDown) {
    deltas.push(DIRECTION.D);
  }
  if (goingLeft) {
    deltas.push(DIRECTION.L);
  }
  if (goingRight) {
    deltas.push(DIRECTION.R);
  }

  sortWithPriority(deltas, DIRECTION.L);

  const moves = recordMoves(deltas, startPoint, targetPoint, padType);
  moveCache.set(key, moves);
  return moves;
}

function recordMoves(deltas: DIRECTION[], startPoint: Point, targetPoint: Point, padType: PadType): string[] {
  let currentPoint = copyPoint(startPoint);

  const blankPoint = padType === 'numPad' ? { row: 3, col: 0 } : { row: 0, col: 0 };

  const moves: string[] = [];
  for (const delta of deltas) {
    while(true) {
      move(currentPoint, delta);
      if (pointsAreEqual(currentPoint, blankPoint)) {
        deltas.reverse();
        return recordMoves(deltas, startPoint, targetPoint, padType);
      }
      moves.push(DirectionChar[delta]);
      if (delta === DIRECTION.U || delta === DIRECTION.D) {
        if (currentPoint.row === targetPoint.row) {
          break;
        }
      }
      if (delta === DIRECTION.L || delta === DIRECTION.R) {
        if (currentPoint.col === targetPoint.col) {
          break;
        }
      }
    }
  }

  return moves;
}

function sortWithPriority(deltas: DIRECTION[], priority: DIRECTION) {
  deltas.sort((a, b) => {
    if (a === priority) {
      return -1;
    }
    if (b === priority) {
      return 1;
    }
    return 0;
  })
}

async function getInput(): Promise<string[]> {
  return await readLines(__dirname + "/input.txt");
}

const part1Answer = 123096;
const part2Answer = null;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
