# Advent of Code - 2024

Using `bun` this year. 

## Usage

Run and time each day and part with 

`bun runner.ts`

This will run each part for all days, and also update the table at the bottom of this file. 


## Timings

```
╔════════════╤════════════╤══════════════════════╤══════════════════════╤══════════════════════╗
║    Day     │ Part       │               Answer │            Time (ms) │   Total Time (ms)    ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │           ✅ 3574690 │             0.419 ms │                      ║
║   Day 1    ├────────────┼──────────────────────┼──────────────────────┤       0.638 ms       ║
║            │ Part 2     │          ✅ 22565391 │             0.219 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │               ✅ 321 │             0.347 ms │                      ║
║   Day 2    ├────────────┼──────────────────────┼──────────────────────┤       1.131 ms       ║
║            │ Part 2     │               ✅ 386 │             0.784 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │         ✅ 160672468 │             0.108 ms │                      ║
║   Day 3    ├────────────┼──────────────────────┼──────────────────────┤       0.252 ms       ║
║            │ Part 2     │          ✅ 84893551 │             0.144 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │              ✅ 2427 │             1.310 ms │                      ║
║   Day 4    ├────────────┼──────────────────────┼──────────────────────┤       3.562 ms       ║
║            │ Part 2     │              ✅ 1900 │             2.252 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │              ✅ 5639 │             1.501 ms │                      ║
║   Day 5    ├────────────┼──────────────────────┼──────────────────────┤       3.142 ms       ║
║            │ Part 2     │              ✅ 5273 │             1.641 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │              ✅ 5239 │             0.457 ms │                      ║
║   Day 6    ├────────────┼──────────────────────┼──────────────────────┤      172.926 ms      ║
║            │ Part 2     │              ✅ 1753 │           172.469 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │     ✅ 2664460013123 │             2.507 ms │                      ║
║   Day 7    ├────────────┼──────────────────────┼──────────────────────┤      75.854 ms       ║
║            │ Part 2     │   ✅ 426214131924213 │            73.347 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │               ✅ 271 │             0.141 ms │                      ║
║   Day 8    ├────────────┼──────────────────────┼──────────────────────┤       0.289 ms       ║
║            │ Part 2     │               ✅ 994 │             0.149 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │     ✅ 6446899523367 │             1.739 ms │                      ║
║   Day 9    ├────────────┼──────────────────────┼──────────────────────┤      69.907 ms       ║
║            │ Part 2     │     ✅ 6478232739671 │            68.168 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │               ✅ 607 │             0.571 ms │                      ║
║   Day 10   ├────────────┼──────────────────────┼──────────────────────┤       1.485 ms       ║
║            │ Part 2     │              ✅ 1384 │             0.914 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │            ✅ 216042 │             0.857 ms │                      ║
║   Day 11   ├────────────┼──────────────────────┼──────────────────────┤      10.968 ms       ║
║            │ Part 2     │   ✅ 255758646442399 │            10.111 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │           ✅ 1433460 │             5.145 ms │                      ║
║   Day 12   ├────────────┼──────────────────────┼──────────────────────┤      12.482 ms       ║
║            │ Part 2     │            ✅ 855082 │             7.337 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │             ✅ 33921 │             3.379 ms │                      ║
║   Day 13   ├────────────┼──────────────────────┼──────────────────────┤       3.379 ms       ║
║            │ Part 2     │                 ❓ 0 │             0.000 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │         ✅ 230435667 │             0.679 ms │                      ║
║   Day 14   ├────────────┼──────────────────────┼──────────────────────┤      102.937 ms      ║
║            │ Part 2     │              ✅ 7709 │           102.258 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │           ✅ 1360570 │             0.972 ms │                      ║
║   Day 15   ├────────────┼──────────────────────┼──────────────────────┤       2.415 ms       ║
║            │ Part 2     │           ✅ 1381446 │             1.443 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │             ✅ 73404 │             3.638 ms │                      ║
║   Day 16   ├────────────┼──────────────────────┼──────────────────────┤       7.178 ms       ║
║            │ Part 2     │             ❓ 73404 │             3.540 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │ ✅ 3,6,7,0,5,7,3,1,4 │             0.038 ms │                      ║
║   Day 17   ├────────────┼──────────────────────┼──────────────────────┤       0.825 ms       ║
║            │ Part 2     │   ✅ 164278496489149 │             0.787 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │               ✅ 298 │             1.533 ms │                      ║
║   Day 18   ├────────────┼──────────────────────┼──────────────────────┤       2.852 ms       ║
║            │ Part 2     │             ✅ 52,32 │             1.319 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │               ✅ 302 │            16.776 ms │                      ║
║   Day 19   ├────────────┼──────────────────────┼──────────────────────┤      33.132 ms       ║
║            │ Part 2     │   ✅ 771745460576799 │            16.355 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │              ✅ 1507 │             3.393 ms │                      ║
║   Day 20   ├────────────┼──────────────────────┼──────────────────────┤      149.417 ms      ║
║            │ Part 2     │           ✅ 1037936 │           146.025 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │            ✅ 123096 │             0.089 ms │                      ║
║   Day 21   ├────────────┼──────────────────────┼──────────────────────┤      111.414 ms      ║
║            │ Part 2     │         ❓ 444598306 │           111.325 ms │                      ║
╟────────────┼────────────┼──────────────────────┼──────────────────────┼──────────────────────╢
║            │ Part 1     │       ✅ 13234715490 │           331.024 ms │                      ║
║   Day 22   ├────────────┼──────────────────────┼──────────────────────┤     1615.069 ms      ║
║            │ Part 2     │              ✅ 1490 │          1284.046 ms │                      ║
╟────────────┴────────────┴──────────────────────┴──────────────────────┼──────────────────────╢
║                                                                 Total │     2381.256 ms      ║
╚═══════════════════════════════════════════════════════════════════════╧══════════════════════╝

```