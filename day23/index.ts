import { readLines } from "../utils/io";

type connection = {
  left: string;
  right: string;
}

type Node = {
  computer: string;
  connections: Set<Node>;
}

async function part1(): Promise<number> {
  const input = await getInput();
  const nodeMap = getNodeMap(input);

  const groups = new Set<string>();
  for (const rootNode of nodeMap.values()) {
    for (const aNode of rootNode.connections) {
      if (rootNode === aNode) {
        continue;
      }
      for (const bNode of rootNode.connections) {
        if (aNode === bNode || rootNode === bNode) {
          continue;
        }
        if (aNode.connections.has(bNode)) {
          if (rootNode.computer.startsWith("t") || aNode.computer.startsWith("t") || bNode.computer.startsWith("t")) {
            groups.add([rootNode.computer, aNode.computer, bNode.computer].sort().join(","));
          }
        }
      }
    }
  }
  
  return groups.size;
}

async function part2(): Promise<string> {
  const input = await getInput();
  const nodeMap = getNodeMap(input);

  const interconnectedCounts = new Map<string, number>();      
  for (const rootNode of nodeMap.values()) {
    for (const connection of rootNode.connections) {
      if (rootNode === connection) {
        continue;
      }
      const sharedConnections = new Set([rootNode, connection, ...connection.connections.intersection(rootNode.connections)]);
      const key = [...sharedConnections].map(n => n.computer).sort().join(",");
      interconnectedCounts.set(key, (interconnectedCounts.get(key) || 0) + 1);
    }
  }

  const sortedByCount = interconnectedCounts.entries().toArray().sort((a, b) => b[1] - a[1]);

  return sortedByCount[0][0];
}

function getNodeMap(connections: connection[]): Map<string, Node> {
  const nodeMap = new Map<string, Node>();
  
  for(const { left, right } of connections) {
    if(!nodeMap.has(left)) {
      nodeMap.set(left, { computer: left, connections: new Set() });
    }

    if(!nodeMap.has(right)) {
      nodeMap.set(right, { computer: right, connections: new Set() });
    }

    const leftNode = nodeMap.get(left)!;
    const rightNode = nodeMap.get(right)!;

    leftNode.connections.add(rightNode);
    rightNode.connections.add(leftNode);
  }
  return nodeMap
}

async function getInput(): Promise<connection[]> {
  return (await readLines(__dirname + "/input.txt")).map(l => { 
    const [left, right] = l.split("-").sort()
    return { left, right };
  });
}

const part1Answer = 1284;
const part2Answer = 'bv,cm,dk,em,gs,jv,ml,oy,qj,ri,uo,xk,yw';

export {
  part1,
  part2,
  part1Answer,
  part2Answer,
}
