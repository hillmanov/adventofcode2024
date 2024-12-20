import { readContents } from "../utils/io";

async function part1(): Promise<number> {
  const { patterns, wants } = await getInput();
  const tree = buildPrefixTree(patterns);

  const canBuildPattern = (targetPattern: string): boolean => {
    const dp = Array.from({length: targetPattern.length + 1}, () => false);
    dp[0] = true;

    for (let currentIndex = 0; currentIndex <= targetPattern.length; currentIndex++) {
      if (!dp[currentIndex]) {
        continue;
      }
      
      const nextLetter = targetPattern[currentIndex];
      const nextPossiblePatterns = tree.get(nextLetter);
      if (!nextPossiblePatterns) {
        continue;
      }

      for (const pattern of nextPossiblePatterns.values()) {
        const endIndex = currentIndex + pattern.length;
        if (matchAtIndex(targetPattern, pattern, currentIndex)) {
          dp[endIndex] = true;
        }
      }
    }
    return dp[targetPattern.length]
  }

  let numPossible = 0;
  for (const w of wants) {
    if (canBuildPattern(w)) {
      numPossible++;
    }
  }

  return numPossible;
}

async function part2(): Promise<number> {
  const { patterns, wants } = await getInput();
  const tree = buildPrefixTree(patterns);

  const canBuildPattern = (targetPattern: string): number => {
    const dp = Array.from({length: targetPattern.length + 1}, () => 0);
    dp[0] = 1; // Just 1 here, not the number of matching patters for the start letter. There is only 1 way to start, and that is with the first letter.  

    for (let currentIndex = 0; currentIndex <= targetPattern.length; currentIndex++) {
      if (dp[currentIndex] === 0) { 
        continue;
      }
      
      const nextLetter = targetPattern[currentIndex];
      const nextPossiblePatterns = tree.get(nextLetter);
      if (!nextPossiblePatterns) {
        continue;
      }

      for (const pattern of nextPossiblePatterns) {
        const endIndex = currentIndex + pattern.length;
        if (matchAtIndex(targetPattern, pattern, currentIndex)) {
          dp[endIndex] += dp[currentIndex];
        }
      }
    }
    return dp[targetPattern.length];
  }

  let sum = 0;
  for (const w of wants) {
    sum += canBuildPattern(w)
  }

  return sum;
}

function matchAtIndex(targetPattern: string, pattern: string, startIndex: number): boolean {
  const endIndex = startIndex + pattern.length;
  let match = true;
  let matchIndex = startIndex;
  let patternIndex = 0;
  while(matchIndex < endIndex && match) {
    if (targetPattern[matchIndex] !== pattern[patternIndex]) {
      match = false;
      break
    }
    matchIndex++;
    patternIndex++;
  }

  return match;
}

function buildPrefixTree(patterns: string[]): Map<string, string[]> {
  const tree = new Map<string, string[]>();

  for (const p of patterns) {
    for (let i = 0; i <= p.length; i++) {
      const prefix = p.substring(0, i);
      if (prefix === "") {
        continue;
      }
      if (!tree.has(prefix)) {
        tree.set(prefix, [])
      }
      tree.get(prefix)!.push(p);
    }
  }
  return tree
}

async function getInput(): Promise<{patterns: string[], wants: string[]}> {
  const chunks = (await readContents(__dirname + "/input.txt")).split("\n\n");
  
  return {
    patterns: chunks[0].split(", ").map(l => l.trim()),
    wants: chunks[1].split("\n").map(l => l.trim())
  }
}

const part1Answer = 302;
const part2Answer = 771745460576799;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
