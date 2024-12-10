import { readContents } from '../io';

async function part1(): Promise<number> {
  const input = await getInput();

  const fs: (number | string)[] = [];
  let fileId = 0;

  const freeBlocks = [];
  const fileBlocks = [];
  let fsIndex = 0;

  for (let i = 0; i < input.length; i++) {
    if (i % 2) {
      for (let j = 0; j < input[i]; j++) {
        fs.push('.');
        freeBlocks.push(fsIndex++);
      }
    } else {
      for (let j = 0; j < input[i]; j++) {
        fs.push(fileId);
        fileBlocks.push(fsIndex++);
      }
      fileId++;
    }
  }
  
  fileBlocks.reverse(); 

  let fileBlockIndex = 0;
  let freeBlockIndex = 0;

  while(fileBlocks[fileBlockIndex] > freeBlocks[freeBlockIndex]) {
    fs[freeBlocks[freeBlockIndex]] = fs[fileBlocks[fileBlockIndex]];
    fs[fileBlocks[fileBlockIndex]] = '.';
    freeBlockIndex++;
    fileBlockIndex++;
  }

  let sum = 0;
  for (let i = 0; i < fs.length; i++) {
    if (fs[i] === '.') {
      continue;
    }
    sum += i * (fs[i] as number);
  }
  return sum;
}

async function part2(): Promise<number> {
  const input = await getInput();

  const fs: (number | string)[] = [];
  let fileId = 0;

  let freeBlocks: number[][] = [];
  let fileBlocks: number[][] = [];
  let fsIndex = 0;

  for (let i = 0; i < input.length; i++) {
    if (i % 2) {
      const block = [];
      for (let j = 0; j < input[i]; j++) {
        fs.push('.');
        block.push(fsIndex++);
      }
      freeBlocks.push(block);
    } else {
      const block = [];
      for (let j = 0; j < input[i]; j++) {
        fs.push(fileId);
        block.push(fsIndex++);
      }
      fileBlocks.push(block);
      fileId++;
    }
  } 

  for (let fileIndex = fileBlocks.length - 1; fileIndex >= 0; fileIndex--) {
    const fileBlock = fileBlocks[fileIndex];
    for (let freeIndex = 0; freeIndex < freeBlocks.length; freeIndex++) {
      const freeBlock = freeBlocks[freeIndex];
      if (freeBlock.length >= fileBlock.length) {
        if (fileBlock[0] < freeBlock[0]) { // Only move files to the left
          break;
        }
        const fileLength = fileBlock.length;
        const fileStartFsIndex = fileBlock[0];
        const fileEndFsIndex = fileStartFsIndex + fileLength - 1;

        // Faster with array indexing for whatever reason
        for (let i = 0; i < fileLength; i++) {
          fs[freeBlocks[freeIndex][i]] = fs[fileBlocks[fileIndex][i]];
          fs[fileBlocks[fileIndex][i]] = '.';
        }

        if (fs[fileStartFsIndex - 1] === '.' && fs[fileEndFsIndex + 1] === '.') {
          freeBlocks[fileIndex - 1] = freeBlocks[fileIndex - 1].concat(fileBlocks[fileIndex]).concat(freeBlocks[fileIndex]);
          freeBlocks[fileIndex] = [];
        }

        freeBlocks[freeIndex] = freeBlocks[freeIndex].slice(fileLength);
        fileBlocks[fileIndex] = [];
        break;
      }
    }
  }

  let sum = 0;
  for (let i = 0; i < fs.length; i++) {
    if (fs[i] === '.') {
      continue;
    }
    sum += i * (fs[i] as number);
  }
  return sum;
}

async function getInput(): Promise<number[]> {
  return (await readContents(__dirname + '/input.txt')).split('').map(c => parseInt(c));
}

const part1Answer = 6446899523367;
const part2Answer = 6478232739671;
export {
  part1,
  part2,
  part1Answer,
  part2Answer,
};
