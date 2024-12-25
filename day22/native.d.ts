export interface WASMExports {
  predictNextSecretNumber: (input: number) => number;
  encodeSequence: (a: number, b: number, c: number, d: number) => number;
}
