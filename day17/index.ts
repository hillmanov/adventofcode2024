import { readContents } from "../utils/io";

const ADV = 0;
const BXL = 1;
const BST = 2;
const JNZ = 3;
const BXC = 4;
const OUT = 5;
const BDV = 6;
const CDV = 7;

async function part1(): Promise<string> {
  const { a, b, c, program } = await getInput();
  return runProgram(a, b, c, program).join(',');
}

async function part2(): Promise<number> {
  const { b, c, program } = await getInput();

  let quineA = 0;
  let digitsFound = 0;

  while(true) {
    let output = runProgram(quineA, b, c, program);
    if (isMatch(output, program)) {
      digitsFound++;
      if (digitsFound === program.length) {
        break;
      }
      quineA *= 8;
    } else {
      quineA++;
    }
  }

  return quineA;
}

function isMatch(output: number[], program: number[]): boolean {
  return program.slice(-output.length).every((val, i) => val === output[i]);
}

function runProgram(a: number, b: number, c: number, program: number[]): number[] {
  const REGISTERS = {a, b, c};
  const OUTPUT: number[] = [];

  const getComboOperand = (operand: number): number => {
    switch(operand){
      case 0:
      case 1:
      case 2:
      case 3:
        return operand;
      case 4:
        return REGISTERS.a;
      case 5:
        return REGISTERS.b;
      case 6:
        return REGISTERS.c;
      case 7:
      default:
        throw new Error(`Invalid operand: ${operand}`);
    }
  }

  let instructionPointer = 0;
  while(instructionPointer < program.length){
    const [opcode, operand] = program.slice(instructionPointer, instructionPointer + 2);
    switch (opcode) {
      case ADV:
        REGISTERS.a = Math.floor(REGISTERS.a / Math.pow(2, getComboOperand(operand)));
        break;
      case BXL:
        REGISTERS.b = xor(REGISTERS.b, operand);
        break;
      case BST:
        REGISTERS.b = getComboOperand(operand) % 8;
        break;
      case JNZ:
        if (REGISTERS.a === 0) {
          break;
        }
        instructionPointer = operand;
        instructionPointer -= 2; // Offset the increment that happens at the end of the loop
        break;
      case BXC:
        REGISTERS.b = xor(REGISTERS.b, REGISTERS.c);
        break;
      case OUT:
        OUTPUT.push(getComboOperand(operand) % 8);
        break;
      case BDV:
        REGISTERS.b = Math.floor(REGISTERS.a / Math.pow(2, getComboOperand(operand)));
        break;
      case CDV:
        REGISTERS.c = Math.floor(REGISTERS.a / Math.pow(2, getComboOperand(operand)));
        break;
    }
    instructionPointer += 2;
  }

  return OUTPUT;
}

function xor(a: number, b: number): number {
  return Number(BigInt(a) ^ BigInt(b));
}

async function getInput(): Promise<{a: number, b: number, c: number, program: number[]}> {
  const input = await readContents(__dirname + "/input.txt");
  const [registersChunk, programChunk] = input.split('\n\n');

  const out: {a: number, b: number, c: number, program: number[]} = {
    a: -1,
    b: -1,
    c: -1,
    program: programChunk.split(':')[1].trim().split(',').map(n => parseInt(n.trim())),
  }
  
  for (const line of registersChunk.split('\n')) {
    const [register, value] = line.split(':').map(n => n.trim());
    if (register.endsWith('A')){
      out.a = parseInt(value);
    }
    else if (register.endsWith('B')){
      out.b = parseInt(value);
    }
    else if (register.endsWith('C')){
      out.c = parseInt(value);
    }
  }


  return out;
}

const part1Answer = '3,6,7,0,5,7,3,1,4';
const part2Answer = 164278496489149;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
