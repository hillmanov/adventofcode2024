import path from "path";
import { performance } from "perf_hooks";
import { readdir } from "node:fs/promises";

const args = process.argv.slice(2);

const requestedDay = args[0];
const requestedPart = args[1];

const directory = import.meta.dir;
const entries = await readdir(directory, { withFileTypes: true });
const results = [];

for (const entry of entries) {
  if (entry.isDirectory() && entry.name.startsWith("day")) {
    // If a specific day is requested, skip others
    if (requestedDay && requestedDay !== entry.name) continue;

    const dayPath = path.join(directory, entry.name);
    const dayName = Number(entry.name.replace("day", ""));

    try {
      const module = await import(dayPath);
      const { part1, part2 } = module;

      const dayResult = { day: dayName, part1: null as any, part1Time: NaN, part2: null as any, part2Time: NaN };

      // If a specific part is requested, only run that part
      if ((!requestedPart || requestedPart === "part1") && typeof part1 === "function") {
        const start = performance.now();
        dayResult.part1 = await part1();
        dayResult.part1Time = performance.now() - start;
      }

      if ((!requestedPart || requestedPart === "part2") && typeof part2 === "function") {
        const start = performance.now();
        dayResult.part2 = await part2();
        dayResult.part2Time = performance.now() - start;
      }

      results.push(dayResult);
    } catch (err) {
      console.error(`Error loading or running ${entry.name}:`, err);
    }
  }
}


results.sort((a, b) => a.day - b.day);

const timingsTable = Bun.inspect.table(
  results.map(({ day, part1, part1Time, part2, part2Time }) => ({
    "Day": day,
    "Part 1": part1,
    "Part 1 Time (ms)": !isNaN(part1Time) ? part1Time.toFixed(4) : "",
    "Part 2": part2,
    "Part 2 Time (ms)": !isNaN(part2Time) ? part2Time.toFixed(4) : "",
    "Total Time (ms)": (!isNaN(part1Time) && !isNaN(part2Time))
      ? (part1Time + part2Time).toFixed(4)
      : "",
  }))
);

if (!requestedDay && !requestedPart) {
  const readmePath = path.join(directory, "README.md");
  try {
    const readmeContent = await Bun.file(readmePath).text();
    const updatedReadme = readmeContent.replace(
      /## Timings[\s\S]*$/,
      `## Timings\n\n${timingsTable}`
    );
    await Bun.write(readmePath, updatedReadme);
  } catch (err) {
    console.error("Error updating README.md:", err);
  }
}

console.log(timingsTable);
