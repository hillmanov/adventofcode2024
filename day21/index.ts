import { readLines } from "../utils/io";
import { 
  type Point,
  go,
  move,
  DIRECTION,
  manhattanDistance,
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
    const moves = trickleDown(sequence.split(''), pads)
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

  // Precache the moves from each button to other buttons:
  let sum = 0;
  for(const sequence of sequences) {
    const moves = trickleDown(sequence.split(''), pads)
    const sequenceNumber = parseInt(sequence.replace(/\D/g, ''));
    sum += sequenceNumber * moves.length;
    pads.forEach(pad => pad.currentSymbol = 'A');
  }
  return sum;
}

function trickleDown (sequence: string[], pads: Pad[], padIndex: number = 0): string[] {
  const pad = pads[padIndex];
  const nextSequence: string[] = [];
  for (const targetSymbol of sequence) {
    const sequence = getMovementsToTarget(pad.padType, pad.currentSymbol, targetSymbol);
    nextSequence.push(...sequence);
    nextSequence.push('A');
    pad.currentSymbol = targetSymbol;
  }

  const noA = nextSequence.filter(s => s !== 'A').length;
  const yesA = nextSequence.filter(s => s === 'A').length;
  if (padIndex === pads.length - 1) {
    // console.log(`Just A: ${yesA}, Without A: ${noA}, Total: ${nextSequence.length}, Difference: ${noA - yesA}, Ratio: ${noA / yesA}`);
    // console.log(`-------------`);
    return nextSequence;
  } else {
    // console.log(`Just A: ${yesA}, Without A: ${noA}, Total: ${nextSequence.length}, Difference: ${noA - yesA}, Ratio: ${noA / yesA}`);
    // console.log(`-------------`);
    return trickleDown(nextSequence, pads, padIndex + 1);
  }
}

function replayAll(sequence: string) {
  console.log('Replay');
  console.log(sequence);
  let a = replay('directionalPad', sequence.split('')); 
  console.log(a.join(''));
  let b = replay('directionalPad', a);
  console.log(b.join(''));
  let c = replay('numPad', b);
  console.log(c.join(''));
}


function replay(padType: PadType, sequence: string[]): string[] {
  let currentSymbol = 'A';
  let currentPoint = {...(padType === 'numPad' ? numPad[currentSymbol] : directionalPad[currentSymbol])}

  const result: string[] = [];
  for(const m of sequence) {
    switch(m) {
      case 'A':
        // Find the symbol on the pad at our current point
        const symbol = Object.keys(padType === 'numPad' ? numPad : directionalPad).find(key => {
          const point = padType === 'numPad' ? numPad[key] : directionalPad[key];
          return point.row === currentPoint.row && point.col === currentPoint.col;
        });
        result.push(symbol!);
        break
      case '^':
        move(currentPoint, DIRECTION.U);
        break;
      case 'v':
        move(currentPoint, DIRECTION.D);
        break;
      case '<':
        move(currentPoint, DIRECTION.L);
        break;
      case '>':
        move(currentPoint, DIRECTION.R);
        break;
    }
  }
  return result;
}


function getMovementsToTarget(padType: PadType, startSymbol: string, targetSymbol: string): string[] {
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

  switch (padType) {
    case 'numPad':
      sortWithPriority(deltas, DIRECTION.L);
      break;
    case 'directionalPad':
      sortWithPriority(deltas, DIRECTION.L);
      break
  }

  const moves = recordMoves(deltas, startPoint, targetPoint, padType);
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

// Need another sort for directional pads. If we are going multiple steps, and we are closer to the button that makes it go in one direction, be sure to go there first. 
function sortByClosestButton(moves: string[], currentSymbol: string) {
  moves.sort((a, b) => {
    const startPoint = directionalPad[currentSymbol];
    const aPoint = directionalPad[a];
    const bPoint = directionalPad[b];


    const aDistance = manhattanDistance(aPoint, startPoint);
    const bDistance = manhattanDistance(bPoint, startPoint);
    return bDistance - aDistance;
  });
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
