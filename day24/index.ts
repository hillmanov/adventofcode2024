import { readContents } from "../utils/io";

type Gate = {
  leftWire: string;
  operation: string;
  rightWire: string;
  outWire: string;
  
  originalOutWire: string;
}

type Device = {
  values: Map<string, number>;
  gates: Gate[];
}

async function part1(): Promise<number> {
  const device = await getInput();
  return runSimulation(device);
}

async function part2(): Promise<string> {
  let device = await getInput();
  const badWires = new Set<string>();
  for (const g of device.gates) {

    if (g.operation === 'XOR') {
      // All XOR gates must either have x## and y## as inputs OR z## as an output.
      if (!g.leftWire.startsWith('x') && !g.rightWire.startsWith('y') && !g.leftWire.startsWith('y') && !g.rightWire.startsWith('x')) {
        if (!g.outWire.startsWith('z')) {
          badWires.add(g.outWire);
        }
      }

      // Except for x00 XOR y00 -> z00, if a XOR gate takes x## and y## as inputs, its output must be the input on another XOR gate
      if ((g.leftWire.startsWith('x') && g.rightWire.startsWith('y')) || (g.leftWire.startsWith('y') && g.rightWire.startsWith('x'))) {
        if (g.leftWire.endsWith('00') && g.rightWire.endsWith('00')) {
            continue;
        }
        const targetGate = getTargetGate(g.outWire, device);
        let hasXorGate = false;
        for (const tg of targetGate?? []) {
          if (tg.operation === 'XOR') {
            hasXorGate = true;
            break;
          }
        }
        if (!hasXorGate) {
          badWires.add(g.outWire);
        }
      }
    }

    // Except for the highest bit, z45, z## can only be the output from XOR, not AND or OR
    if (g.outWire.startsWith('z') && g.outWire !== 'z45') {
      if (g.operation !== 'XOR') {
          badWires.add(g.outWire);
      }
    }

    if (g.operation === 'AND' && g.leftWire != 'x00' && g.rightWire != 'y00' && g.leftWire != 'y00' && g.rightWire != 'x00') {
      const targetGates = getTargetGate(g.outWire, device);
      let hasAndGate = false;
      for (const tg of targetGates?? []) {
        if (tg.operation === 'OR') {
          hasAndGate = true;
          break;
        }
      }
      if (!hasAndGate) {
        badWires.add(g.outWire);
      }
    }
  }

  return badWires.values().toArray().sort().join(',');
}

function getTargetGate( wire: string, device: Device): Gate[] | undefined {
  const g: Gate[] = [];
  for (const gate of device.gates) {
    if (gate.leftWire === wire || gate.rightWire === wire) {
      g.push(gate);
    }
  }
  return g;
}

function runSimulation(device: Device): number {
  const zWires = new Set<string>();
  for (const gate of device.gates) {
    if (gate.outWire.startsWith("z")) zWires.add(gate.outWire);
  }

  const zWiresLeft = new Set(zWires);
  const hasSetWire = new Set<string>();
  let i = 0;
  while(zWiresLeft.size !== 0 && i <= 76) {
    i++;
    for (const gate of device.gates) {
      const leftWireValue = device.values.get(gate.leftWire)!;
      const rightWireValue = device.values.get(gate.rightWire)!;

      if (leftWireValue === undefined || rightWireValue === undefined) continue;
      if (hasSetWire.has(gate.outWire)) continue;

      switch(gate.operation) {
        case 'AND': {
          device.values.set(gate.outWire, Number(BigInt(leftWireValue) & BigInt(rightWireValue)));
          break;
        }
        case 'OR': {
          device.values.set(gate.outWire, Number(BigInt(leftWireValue) | BigInt(rightWireValue)));
          break;
        }
        case 'XOR': {
          device.values.set(gate.outWire, Number(BigInt(leftWireValue) ^ BigInt(rightWireValue)));
          break;
        }
      }

      hasSetWire.add(gate.outWire);

      if (gate.outWire.startsWith("z")) {
        zWiresLeft.delete(gate.outWire);
      } 

      if (zWiresLeft.size === 0) break;
    }
  }

  const zBinNum = zWires.values().toArray().sort().reverse().map((wire) => device.values.get(wire)).join('');
  return parseInt(zBinNum, 2);
}

async function getInput(): Promise<Device> {
  const device: Device = {
    values: new Map(),
    gates: []
  };

  const [initialValuesChunk, gatesChunk] = (await readContents(__dirname + "/input.txt")).split("\n\n");

  initialValuesChunk.split("\n").forEach((line) => {
    const [wire, value] = line.split(": ");
    device.values.set(wire, parseInt(value));
  });

  gatesChunk.split("\n").forEach((line) => {
    const [leftWire, operation, rightWire,,outWire] = line.split(" ");
    device.gates.push({
      leftWire,
      operation,
      rightWire,
      outWire,
      originalOutWire: outWire
    });
  });

  return device;
}

const part1Answer = 53258032898766;
const part2Answer = 'gbs,hwq,thm,wrm,wss,z08,z22,z29';

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
