import type { Point } from './dataStructures';

export function walkGrid<T>(grid: T[][], callback: (value: T, row: number, col: number) => void) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      callback(grid[row][col], row, col);
    }
  }
}
