# Advent of Code - 2024

Using `bun` this year. 

## Usage

Run and time each day and part with 

`bun runner.ts`

This will run each part for all days, and also update the table at the bottom of this file. 


## Timings

```
╔════════════╤════════╤══════════════════════╤════════════╤═════════════════╗
║    Day     │ Part   │               Answer │  Time (ms) │ Total Time (ms) ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │           ✅ 3574690 │   0.431 ms │                 ║
║   Day 1    ├────────┼──────────────────────┼────────────┤    0.674 ms     ║
║            │ Part 2 │          ✅ 22565391 │   0.243 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │               ✅ 321 │   0.375 ms │                 ║
║   Day 2    ├────────┼──────────────────────┼────────────┤    0.968 ms     ║
║            │ Part 2 │               ✅ 386 │   0.593 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │         ✅ 160672468 │   0.121 ms │                 ║
║   Day 3    ├────────┼──────────────────────┼────────────┤    0.302 ms     ║
║            │ Part 2 │          ✅ 84893551 │   0.182 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │              ✅ 2427 │   1.411 ms │                 ║
║   Day 4    ├────────┼──────────────────────┼────────────┤    3.661 ms     ║
║            │ Part 2 │              ✅ 1900 │   2.250 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │              ✅ 5639 │   1.622 ms │                 ║
║   Day 5    ├────────┼──────────────────────┼────────────┤    3.425 ms     ║
║            │ Part 2 │              ✅ 5273 │   1.803 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │              ✅ 5239 │   0.603 ms │                 ║
║   Day 6    ├────────┼──────────────────────┼────────────┤   202.025 ms    ║
║            │ Part 2 │              ✅ 1753 │ 201.422 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │     ✅ 2664460013123 │   2.611 ms │                 ║
║   Day 7    ├────────┼──────────────────────┼────────────┤    80.371 ms    ║
║            │ Part 2 │   ✅ 426214131924213 │  77.761 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │               ✅ 271 │   0.114 ms │                 ║
║   Day 8    ├────────┼──────────────────────┼────────────┤    0.265 ms     ║
║            │ Part 2 │               ✅ 994 │   0.151 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │     ✅ 6446899523367 │   1.197 ms │                 ║
║   Day 9    ├────────┼──────────────────────┼────────────┤    75.095 ms    ║
║            │ Part 2 │     ✅ 6478232739671 │  73.899 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │               ✅ 607 │   0.474 ms │                 ║
║   Day 10   ├────────┼──────────────────────┼────────────┤    1.198 ms     ║
║            │ Part 2 │              ✅ 1384 │   0.724 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │            ✅ 216042 │   1.068 ms │                 ║
║   Day 11   ├────────┼──────────────────────┼────────────┤    11.887 ms    ║
║            │ Part 2 │   ✅ 255758646442399 │  10.819 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │           ✅ 1433460 │   5.160 ms │                 ║
║   Day 12   ├────────┼──────────────────────┼────────────┤    13.337 ms    ║
║            │ Part 2 │            ✅ 855082 │   8.176 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │             ✅ 33921 │   3.550 ms │                 ║
║   Day 13   ├────────┼──────────────────────┼────────────┤    3.550 ms     ║
║            │ Part 2 │                 ❓ 0 │   0.000 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │         ✅ 230435667 │   0.691 ms │                 ║
║   Day 14   ├────────┼──────────────────────┼────────────┤   108.478 ms    ║
║            │ Part 2 │              ✅ 7709 │ 107.787 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │           ✅ 1360570 │   1.036 ms │                 ║
║   Day 15   ├────────┼──────────────────────┼────────────┤    2.316 ms     ║
║            │ Part 2 │           ✅ 1381446 │   1.280 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │             ✅ 73404 │   3.892 ms │                 ║
║   Day 16   ├────────┼──────────────────────┼────────────┤    7.504 ms     ║
║            │ Part 2 │             ❓ 73404 │   3.612 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │ ✅ 3,6,7,0,5,7,3,1,4 │   0.032 ms │                 ║
║   Day 17   ├────────┼──────────────────────┼────────────┤    0.585 ms     ║
║            │ Part 2 │   ✅ 164278496489149 │   0.553 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │               ✅ 298 │   1.378 ms │                 ║
║   Day 18   ├────────┼──────────────────────┼────────────┤    2.815 ms     ║
║            │ Part 2 │             ✅ 52,32 │   1.437 ms │                 ║
╟────────────┼────────┼──────────────────────┼────────────┼─────────────────╢
║            │ Part 1 │               ✅ 302 │  17.029 ms │                 ║
║   Day 19   ├────────┼──────────────────────┼────────────┤    33.932 ms    ║
║            │ Part 2 │   ✅ 771745460576799 │  16.903 ms │                 ║
╟────────────┴────────┴──────────────────────┴────────────┼─────────────────╢
║                                                   Total │   552.390 ms    ║
╚═════════════════════════════════════════════════════════╧═════════════════╝

```