# Advent of Code - 2024

Using `bun` this year. 

## Usage

Run and time each day and part with 

`bun runner.ts`

This will run each part for all days, and also update the table at the bottom of this file. 


## Timings

```
╔════════╤════════╤═══════════════════════════════════════════╤════════════╤═════════════════╗
║  Day   │ Part   │                                    Answer │  Time (ms) │ Total Time (ms) ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                ✅ 3574690 │   0.460 ms │                 ║
║ Day 1  ├────────┼───────────────────────────────────────────┼────────────┤    0.693 ms     ║
║        │ Part 2 │                               ✅ 22565391 │   0.233 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                    ✅ 321 │   0.376 ms │                 ║
║ Day 2  ├────────┼───────────────────────────────────────────┼────────────┤    1.029 ms     ║
║        │ Part 2 │                                    ✅ 386 │   0.653 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                              ✅ 160672468 │   0.124 ms │                 ║
║ Day 3  ├────────┼───────────────────────────────────────────┼────────────┤    0.274 ms     ║
║        │ Part 2 │                               ✅ 84893551 │   0.151 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                   ✅ 2427 │   1.430 ms │                 ║
║ Day 4  ├────────┼───────────────────────────────────────────┼────────────┤    3.811 ms     ║
║        │ Part 2 │                                   ✅ 1900 │   2.382 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                   ✅ 5639 │   1.548 ms │                 ║
║ Day 5  ├────────┼───────────────────────────────────────────┼────────────┤    3.157 ms     ║
║        │ Part 2 │                                   ✅ 5273 │   1.609 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                   ✅ 5239 │   0.467 ms │                 ║
║ Day 6  ├────────┼───────────────────────────────────────────┼────────────┤   161.144 ms    ║
║        │ Part 2 │                                   ✅ 1753 │ 160.677 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                          ✅ 2664460013123 │   2.601 ms │                 ║
║ Day 7  ├────────┼───────────────────────────────────────────┼────────────┤    79.198 ms    ║
║        │ Part 2 │                        ✅ 426214131924213 │  76.597 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                    ✅ 271 │   0.135 ms │                 ║
║ Day 8  ├────────┼───────────────────────────────────────────┼────────────┤    0.296 ms     ║
║        │ Part 2 │                                    ✅ 994 │   0.161 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                          ✅ 6446899523367 │   1.601 ms │                 ║
║ Day 9  ├────────┼───────────────────────────────────────────┼────────────┤    71.959 ms    ║
║        │ Part 2 │                          ✅ 6478232739671 │  70.358 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                    ✅ 607 │   0.611 ms │                 ║
║ Day 10 ├────────┼───────────────────────────────────────────┼────────────┤    1.507 ms     ║
║        │ Part 2 │                                   ✅ 1384 │   0.896 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                 ✅ 216042 │   0.997 ms │                 ║
║ Day 11 ├────────┼───────────────────────────────────────────┼────────────┤    11.350 ms    ║
║        │ Part 2 │                        ✅ 255758646442399 │  10.353 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                ✅ 1433460 │   4.967 ms │                 ║
║ Day 12 ├────────┼───────────────────────────────────────────┼────────────┤    12.706 ms    ║
║        │ Part 2 │                                 ✅ 855082 │   7.739 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                  ✅ 33921 │   1.288 ms │                 ║
║ Day 13 ├────────┼───────────────────────────────────────────┼────────────┤    2.485 ms     ║
║        │ Part 2 │                         ✅ 82261957837868 │   1.197 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                              ✅ 230435667 │   0.675 ms │                 ║
║ Day 14 ├────────┼───────────────────────────────────────────┼────────────┤   103.447 ms    ║
║        │ Part 2 │                                   ✅ 7709 │ 102.772 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                ✅ 1360570 │   1.031 ms │                 ║
║ Day 15 ├────────┼───────────────────────────────────────────┼────────────┤    2.689 ms     ║
║        │ Part 2 │                                ✅ 1381446 │   1.659 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                  ✅ 73404 │   3.710 ms │                 ║
║ Day 16 ├────────┼───────────────────────────────────────────┼────────────┤    42.985 ms    ║
║        │ Part 2 │                                    ✅ 449 │  39.275 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                      ✅ 3,6,7,0,5,7,3,1,4 │   0.040 ms │                 ║
║ Day 17 ├────────┼───────────────────────────────────────────┼────────────┤    0.802 ms     ║
║        │ Part 2 │                        ✅ 164278496489149 │   0.762 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                    ✅ 298 │   1.528 ms │                 ║
║ Day 18 ├────────┼───────────────────────────────────────────┼────────────┤    3.022 ms     ║
║        │ Part 2 │                                  ✅ 52,32 │   1.494 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                    ✅ 302 │  17.997 ms │                 ║
║ Day 19 ├────────┼───────────────────────────────────────────┼────────────┤    34.905 ms    ║
║        │ Part 2 │                        ✅ 771745460576799 │  16.908 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                   ✅ 1507 │   3.423 ms │                 ║
║ Day 20 ├────────┼───────────────────────────────────────────┼────────────┤   152.816 ms    ║
║        │ Part 2 │                                ✅ 1037936 │ 149.393 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                 ✅ 123096 │   0.096 ms │                 ║
║ Day 21 ├────────┼───────────────────────────────────────────┼────────────┤    0.709 ms     ║
║        │ Part 2 │                        ✅ 154517692795352 │   0.613 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                            ✅ 13234715490 │   5.564 ms │                 ║
║ Day 22 ├────────┼───────────────────────────────────────────┼────────────┤   159.944 ms    ║
║        │ Part 2 │                                   ✅ 1490 │ 154.380 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                   ✅ 1284 │   7.070 ms │                 ║
║ Day 23 ├────────┼───────────────────────────────────────────┼────────────┤    20.300 ms    ║
║        │ Part 2 │ ✅ bv,cm,dk,em,gs,jv,ml,oy,qj,ri,uo,xk,yw │  13.230 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                         ✅ 53258032898766 │   0.513 ms │                 ║
║ Day 24 ├────────┼───────────────────────────────────────────┼────────────┤    1.072 ms     ║
║        │ Part 2 │        ✅ gbs,hwq,thm,wrm,wss,z08,z22,z29 │   0.559 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                   ✅ 3483 │   1.342 ms │                 ║
║ Day 25 ├────────┼───────────────────────────────────────────┼────────────┤    1.342 ms     ║
║        │ Part 2 │                                      ✅ 1 │   0.000 ms │                 ║
╟────────┴────────┴───────────────────────────────────────────┴────────────┼─────────────────╢
║                                                                    Total │   873.644 ms    ║
╚══════════════════════════════════════════════════════════════════════════╧═════════════════╝

```