import { readLines } from "../io";

type Equation = {
  value: number;
  numbers: number[];
}

async function part1(): Promise<number> {
  const equations = await getInput();
    
  let sum = 0;
  for (let equation of equations) {
    const result = evaluate(equation.numbers, equation.value);
    if (result === equation.value) {
      sum += result;
    } 
  }

  return sum
}

async function part2(): Promise<number> {
  const equations = await getInput();
    
  let sum = 0;
  for (let equation of equations) {
    const result = evaluate(equation.numbers, equation.value);
    if (result === equation.value) {
      sum += result;
    } else {
      const result = evaluate(equation.numbers, equation.value, true);
      if (result === equation.value) {
        sum += result;
      }
    }
  }

  return sum
}

async function getInput(): Promise<Equation[]> {
  const lines = await readLines(__dirname + "/input.txt");
  return lines.map((line) => {
    const [value, numbers] = line.split(":").map(s => s.trim());
    return {
      value: parseInt(value),
      numbers: numbers.split(" ").map(s => parseInt(s)),
    }
  });
}

function evaluate(numbers: number[], targetValue: number, doConcat: boolean = false): number { 
  function e(numberIndex: number, currentValue: number): number {
    if (numberIndex === numbers.length) {
      return currentValue === targetValue ? currentValue : 0;
    }

    if (currentValue > targetValue) {
      return 0;
    }

    const operand = numbers[numberIndex];

    const additionResult = e(numberIndex + 1, currentValue + operand);
    if (additionResult === targetValue) {
      return additionResult;
    }

    const multiplicationResult = e(numberIndex + 1, currentValue * operand);
    if (multiplicationResult === targetValue) {
      return multiplicationResult;
    }

    if (doConcat) {
      const concatenationResult = e(numberIndex + 1, concatValue(currentValue, operand));
      if (concatenationResult === targetValue) {
        return concatenationResult;
      }
    }

    return 0;
  }

  return e(1, numbers[0]);
}

function concatValue(left: number, right: number): number {
  const digits = right === 0 ? 1 : Math.floor(Math.log10(right)) + 1;
  return left * (10 ** digits) + right;
}

const part1Answer = 2664460013123;
const part2Answer = 426214131924213;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
