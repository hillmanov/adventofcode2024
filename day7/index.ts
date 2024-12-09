import { readLines } from "../utils";

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
      const concatenationVal = parseInt(String(currentValue) + String(operand), 10);
      const concatenationResult = e(numberIndex + 1, concatenationVal);
      if (concatenationResult === targetValue) {
        return concatenationResult;
      }
    }

    return 0;
  }

  return e(1, numbers[0]);
}

export {
  part1,
  part2
};
