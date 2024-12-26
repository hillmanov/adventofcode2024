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

function setInputValues(device: Device, x: number, y: number) {
  let bits = device.values.entries().toArray().filter(([key]) => key.startsWith("x")).length - 1;
  const xBits = x.toString(2).split('').reverse();
  const yBits = y.toString(2).split('').reverse();

  for (let i = 0; i <= bits; i++) {
    device.values.set(`x${String(i).padStart(2, '0')}`, Number(xBits[i] || 0));
    device.values.set(`y${String(i).padStart(2, '0')}`, Number(yBits[i] || 0));
  }
}


function resetGates(gates: Gate[]) {
  for (const gate of gates) {
    gate.outWire = gate.originalOutWire;
  }
}
async function part2(): Promise<number> {
  return 0;
  let device = await getInput();
  const graph = getGraph(device);
  const originalValues = new Map(device.values);
  let bits = device.values.entries().toArray().filter(([key]) => key.startsWith("x")).length - 1;

  const involvedGates = getGates('z09', graph);

  let bit = 44n;
  let x = parseInt(''.padStart(Number(bit+1n), '1').padStart(46, '0'), 2);
  let y = parseInt(''.padStart(Number(bit+1n), '1').padStart(46, '0'), 2);
  const targetNum = x + y;
  
  let found = false;
  for (let aGate = 0; aGate < device.gates.length; aGate++) {
    if (found) break;
    for (let bGate = 0; bGate < device.gates.length; bGate++) {
      if (found) break;
      if (aGate === bGate) continue;
      device = await getInput();
      setInputValues(device, x, y);
      const temp = device.gates[aGate].outWire;
      device.gates[aGate].outWire = device.gates[bGate].outWire;
      device.gates[bGate].outWire = temp;

      const actualValue = runSimulation(device);

      if (targetNum != actualValue) {
        // console.log(`Bad bit:`,Number(bit) + 1);
        // const expectedBitToBeSet = (bits + 1) - Number(targetNum).toString(2).padStart(46, '0').indexOf('1');
        // const bitThatWasSet = (bits + 1) - Number(actualValue).toString(2).padStart(46, '0').indexOf('1');

        // console.log(`Should be:`, Number(targetNum).toString(2).padStart(46, '0'));
        // console.log(`Actual is:`, Number(actualValue).toString(2).padStart(46, '0'));
        // console.log(`Bit to set:`, expectedBitToBeSet);
        // console.log(`Bit that was set:`, bitThatWasSet);
        // console.log(`--------------------`);
      } else {
        console.count(`FOUND IT!!!!!!!!`);
        console.log(`device.gates[bGate].outWire`, device.gates[aGate].outWire, device.gates[bGate].outWire);
      }
      device.gates[aGate].outWire = device.gates[aGate].originalOutWire;
      device.gates[bGate].outWire = device.gates[bGate].originalOutWire;
    }
  }
  
  return 0;
}

function swapOutputWires(gate1: Gate, gate2: Gate) {
  const temp = gate1.outWire;
  gate1.outWire = gate2.outWire;
  gate2.outWire = temp;
}

function getGates(wire: string, graph: Map<string, Gate[]>): Gate[] {
  const visited = new Set<string>();
  const gates = new Array<Gate>();
  const recurse = (wire: string) => {
    if (visited.has(wire)) return;
    visited.add(wire);
    for (const gate of graph.get(wire)!) {
      if (gate.outWire === wire) {
        recurse(gate.leftWire);
        recurse(gate.rightWire);
        gates.push(gate);
      }
    }
  }
  recurse(wire);
  
  return gates;
}

function getGraph(device: Device): Map<string, Gate[]> {
  const graph = new Map<string, Gate[]>();
  for (const gate of device.gates) {
    if (!graph.has(gate.leftWire)) {
      graph.set(gate.leftWire, []);
    }
    if (!graph.has(gate.rightWire)) {
      graph.set(gate.rightWire, []);
    }
    if (!graph.has(gate.outWire)) {
      graph.set(gate.outWire, []);
    }
    graph.get(gate.leftWire)!.push(gate);
    graph.get(gate.rightWire)!.push(gate);
    graph.get(gate.outWire)!.push(gate);
  }
  return graph;
}

function runSimulation(device: Device): number {
  const zWires = new Set<string>();
  for (const gate of device.gates) {
    if (gate.outWire.startsWith("z")) zWires.add(gate.outWire);
  }

  const zWiresLeft = new Set(zWires);
  let i = 0;
  while(zWiresLeft.size !== 0 && i <= 76) {
    i++;
    for (const gate of device.gates) {
      const leftWireValue = device.values.get(gate.leftWire)!;
      const rightWireValue = device.values.get(gate.rightWire)!;
      if (leftWireValue === undefined || rightWireValue === undefined) continue;
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
const part2Answer = null;

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
