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
║        │ Part 1 │                                ✅ 3574690 │   0.343 ms │                 ║
║ Day 1  ├────────┼───────────────────────────────────────────┼────────────┤    0.577 ms     ║
║        │ Part 2 │                               ✅ 22565391 │   0.234 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                    ✅ 321 │   0.336 ms │                 ║
║ Day 2  ├────────┼───────────────────────────────────────────┼────────────┤    0.902 ms     ║
║        │ Part 2 │                                    ✅ 386 │   0.566 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                              ✅ 160672468 │   0.097 ms │                 ║
║ Day 3  ├────────┼───────────────────────────────────────────┼────────────┤    0.234 ms     ║
║        │ Part 2 │                               ✅ 84893551 │   0.138 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                   ✅ 2427 │   1.367 ms │                 ║
║ Day 4  ├────────┼───────────────────────────────────────────┼────────────┤    3.486 ms     ║
║        │ Part 2 │                                   ✅ 1900 │   2.119 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                   ✅ 5639 │   1.509 ms │                 ║
║ Day 5  ├────────┼───────────────────────────────────────────┼────────────┤    3.025 ms     ║
║        │ Part 2 │                                   ✅ 5273 │   1.516 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                   ✅ 5239 │   0.260 ms │                 ║
║ Day 6  ├────────┼───────────────────────────────────────────┼────────────┤   177.071 ms    ║
║        │ Part 2 │                                   ✅ 1753 │ 176.811 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                          ✅ 2664460013123 │   2.454 ms │                 ║
║ Day 7  ├────────┼───────────────────────────────────────────┼────────────┤    75.664 ms    ║
║        │ Part 2 │                        ✅ 426214131924213 │  73.210 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                    ✅ 271 │   0.102 ms │                 ║
║ Day 8  ├────────┼───────────────────────────────────────────┼────────────┤    0.241 ms     ║
║        │ Part 2 │                                    ✅ 994 │   0.139 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                          ✅ 6446899523367 │   1.075 ms │                 ║
║ Day 9  ├────────┼───────────────────────────────────────────┼────────────┤    68.731 ms    ║
║        │ Part 2 │                          ✅ 6478232739671 │  67.656 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                    ✅ 607 │   0.454 ms │                 ║
║ Day 10 ├────────┼───────────────────────────────────────────┼────────────┤    1.147 ms     ║
║        │ Part 2 │                                   ✅ 1384 │   0.693 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                 ✅ 216042 │   0.823 ms │                 ║
║ Day 11 ├────────┼───────────────────────────────────────────┼────────────┤    10.706 ms    ║
║        │ Part 2 │                        ✅ 255758646442399 │   9.883 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                ✅ 1433460 │   4.765 ms │                 ║
║ Day 12 ├────────┼───────────────────────────────────────────┼────────────┤    12.220 ms    ║
║        │ Part 2 │                                 ✅ 855082 │   7.454 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                  ✅ 33921 │   1.143 ms │                 ║
║ Day 13 ├────────┼───────────────────────────────────────────┼────────────┤    2.280 ms     ║
║        │ Part 2 │                         ✅ 82261957837868 │   1.138 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                              ✅ 230435667 │   0.647 ms │                 ║
║ Day 14 ├────────┼───────────────────────────────────────────┼────────────┤   112.102 ms    ║
║        │ Part 2 │                                   ✅ 7709 │ 111.455 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                ✅ 1360570 │   0.896 ms │                 ║
║ Day 15 ├────────┼───────────────────────────────────────────┼────────────┤    2.090 ms     ║
║        │ Part 2 │                                ✅ 1381446 │   1.194 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                  ✅ 73404 │   3.440 ms │                 ║
║ Day 16 ├────────┼───────────────────────────────────────────┼────────────┤    41.184 ms    ║
║        │ Part 2 │                                    ✅ 449 │  37.744 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                      ✅ 3,6,7,0,5,7,3,1,4 │   0.029 ms │                 ║
║ Day 17 ├────────┼───────────────────────────────────────────┼────────────┤    0.495 ms     ║
║        │ Part 2 │                        ✅ 164278496489149 │   0.466 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                    ✅ 298 │   1.051 ms │                 ║
║ Day 18 ├────────┼───────────────────────────────────────────┼────────────┤    2.344 ms     ║
║        │ Part 2 │                                  ✅ 52,32 │   1.293 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                    ✅ 302 │  16.519 ms │                 ║
║ Day 19 ├────────┼───────────────────────────────────────────┼────────────┤    33.108 ms    ║
║        │ Part 2 │                        ✅ 771745460576799 │  16.588 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                   ✅ 1507 │   3.237 ms │                 ║
║ Day 20 ├────────┼───────────────────────────────────────────┼────────────┤   152.653 ms    ║
║        │ Part 2 │                                ✅ 1037936 │ 149.416 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                 ✅ 123096 │   0.074 ms │                 ║
║ Day 21 ├────────┼───────────────────────────────────────────┼────────────┤    0.559 ms     ║
║        │ Part 2 │                        ✅ 154517692795352 │   0.485 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                            ✅ 13234715490 │   5.536 ms │                 ║
║ Day 22 ├────────┼───────────────────────────────────────────┼────────────┤   159.163 ms    ║
║        │ Part 2 │                                   ✅ 1490 │ 153.627 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                   ✅ 1284 │   7.101 ms │                 ║
║ Day 23 ├────────┼───────────────────────────────────────────┼────────────┤    20.359 ms    ║
║        │ Part 2 │ ✅ bv,cm,dk,em,gs,jv,ml,oy,qj,ri,uo,xk,yw │  13.258 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                         ✅ 53258032898766 │   0.509 ms │                 ║
║ Day 24 ├────────┼───────────────────────────────────────────┼────────────┤    1.015 ms     ║
║        │ Part 2 │        ✅ gbs,hwq,thm,wrm,wss,z08,z22,z29 │   0.507 ms │                 ║
╟────────┼────────┼───────────────────────────────────────────┼────────────┼─────────────────╢
║        │ Part 1 │                                   ✅ 3483 │   0.890 ms │                 ║
║ Day 25 ├────────┼───────────────────────────────────────────┼────────────┤    0.890 ms     ║
║        │ Part 2 │                                      ✅ 1 │   0.000 ms │                 ║
╟────────┴────────┴───────────────────────────────────────────┴────────────┼─────────────────╢
║                                                                    Total │   882.246 ms    ║
╚══════════════════════════════════════════════════════════════════════════╧═════════════════╝

```