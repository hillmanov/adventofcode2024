async function readLines(path: string): Promise<string[]> {
  return (await readContents(path)).split("\n");
}

async function readContents(path: string): Promise<string> {
  return (await Bun.file(path).text()).trim();
}

function inGridBounds(row: number, col: number, grid: any[][]): boolean {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

export {
  readLines,
  readContents,
  inGridBounds
}
