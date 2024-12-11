import path from "path";
import { performance } from "perf_hooks";
import { readdir } from "node:fs/promises";

const args = process.argv.slice(2);

const requestedDay = Number(args[0]?.replace("day", ""));
const requestedPart = Number(args[1]?.replace("part", ""));

const directory = import.meta.dir;
const entries = await readdir(directory, { withFileTypes: true });
const results = [];

for (const entry of entries) {
  if (entry.isDirectory() && entry.name.startsWith("day")) {
    const dayNumber = Number(entry.name.replace("day", ""));

    if (requestedDay && requestedDay !== dayNumber) continue;

    const dayPath = path.join(directory, entry.name);

    try {
      const module = await import(dayPath);
      const { part1, part2, part1Answer, part2Answer } = module;

      const dayResult = {
        day: dayNumber,
        part1: null as any,
        part1Time: 0,
        part1Answer: null as any,
        part1Correct: null as any,
        part2: null as any,
        part2Answer: null as any,
        part2Time: 0,
        part2Correct: null as any,
      };

      // If a specific part is requested, only run that part
      if ((!requestedPart || requestedPart === 1) && typeof part1 === "function") {
        // Run part1 a few times to get a more accurate average time
        const runtimes = [];

        for (let i = 0; i < 1; i++) {
          const start = performance.now();
          dayResult.part1 = await part1();
          runtimes.push(performance.now() - start);
        }

        dayResult.part1Time = runtimes.reduce((a, b) => a + b, 0) / runtimes.length;

        dayResult.part1Correct = part1Answer ? dayResult.part1 === part1Answer : null;
        dayResult.part1Answer = part1Answer;
      }

      if ((!requestedPart || requestedPart === 2) && typeof part2 === "function") {
        const runtimes = [];

        for (let i = 0; i < 1; i++) {
          const start = performance.now();
          dayResult.part2 = await part2();
          runtimes.push(performance.now() - start);
        }

        dayResult.part2Time = runtimes.reduce((a, b) => a + b, 0) / runtimes.length;
        dayResult.part2Correct = part2Answer ? dayResult.part2 === part2Answer : null;
        dayResult.part2Answer = part2Answer;
      }

      results.push(dayResult);
    } catch (err) {
      console.error(`Error loading or running ${entry.name}:`, err);
    }
  }
}

results.sort((a, b) => a.day - b.day);

const timingsTable = Bun.inspect.table(
  results.map(({ day, part1, part1Time, part2, part2Time, part1Correct, part2Correct, part1Answer, part2Answer }) => ({
    "Day": day,
    "Part 1": `${part1Correct !== null ? part1Correct ? "✅" : "❌" : "❓"} ${part1}${part1Correct === false ? " (expected: " + part1Answer + ")" : ""}`,
    "Part 1 Time (ms)": !isNaN(part1Time) ? part1Time.toFixed(3) : "",
    "Part 2": `${part2Correct !== null ? part2Correct ? "✅" : "❌" : "❓"} ${part2}${part2Correct === false ? " (expected: " + part2Answer + ")" : ""}`,
    "Part 2 Time (ms)": !isNaN(part2Time) ? part2Time.toFixed(3) : "",
    "Total Time (ms)": (!isNaN(part1Time) && !isNaN(part2Time))
      ? (part1Time + part2Time).toFixed(3)
      : "",
  }))
);

if (!requestedDay && !requestedPart) {
  const readmePath = path.join(directory, "README.md");
  try {
    const readmeContent = await Bun.file(readmePath).text();
    const updatedReadme = readmeContent.replace(
      /## Timings[\s\S]*$/,
      `## Timings\n\n\`\`\`\n${timingsTable}\n\`\`\``
    );
    await Bun.write(readmePath, updatedReadme);
  } catch (err) {
    console.error("Error updating README.md:", err);
  }
}

console.log(timingsTable);
