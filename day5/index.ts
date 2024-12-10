import { readContents } from "../io";

async function part1(): Promise<number> {
  const { beforeRules, afterRules, orders } = await initialize();

  const validOrders: number[][] = [];
  for (let order of orders) {
    let orderIsValid = true;
    for (let i = 0; i < order.length && orderIsValid; i++) {
      const currentPage = order[i];

      const pagesBefore = new Set(order.slice(0, i));
      const pagesAfter = new Set(order.slice(i + 1));

      const pagesThatShouldBeBefore = beforeRules.get(currentPage)?.intersection(pagesAfter);
      const pagesThatShouldBeAfter = afterRules.get(currentPage)?.intersection(pagesBefore);

      if (pagesThatShouldBeBefore?.size || pagesThatShouldBeAfter?.size) {
        orderIsValid = false;
        break;
      }

    }
    if (orderIsValid) {
      validOrders.push(order); 
    }
  }

  let sum = 0;
  for (let order of validOrders) {
    sum += order[Math.floor(order.length / 2)];
  }

  return sum;
}

async function part2(): Promise<number> {
  const { beforeRules, afterRules, orders } = await initialize();

  const fixedOrders: number[][] = [];

  for (let order of orders) {
    for (let i = 0; i < order.length; i++) {
      const currentPage = order[i];

      const pagesBefore = new Set(order.slice(0, i));
      const pagesAfter = new Set(order.slice(i + 1));

      const pagesThatShouldBeBefore = beforeRules.get(currentPage)?.intersection(pagesAfter);
      const pagesThatShouldBeAfter = afterRules.get(currentPage)?.intersection(pagesBefore);

      if (pagesThatShouldBeBefore?.size || pagesThatShouldBeAfter?.size) {
        order.sort((a, b) => {
          if (beforeRules.get(a)?.has(b)) {
            return 1;
          } else if (afterRules.get(a)?.has(b)) {
            return -1;
          } else {
            return 0;
          }
        });
        fixedOrders.push(order);
        break;
      }
    }
  }

  let sum = 0;
  for (let order of fixedOrders) {
    sum += order[Math.floor(order.length / 2)];
  }

  return sum;
}

async function initialize(): Promise<{beforeRules: Map<number, Set<number>>, afterRules: Map<number, Set<number>>, orders: number[][] }> {
  const input = await readContents(__dirname + '/input.txt');

  const [rawRules, rawOrders] = input.split('\n\n').map(section => section.trim());

  const beforeRules = new Map<number, Set<number>>();
  const afterRules = new Map<number, Set<number>>();
  const orders: number[][] = rawOrders.split('\n').map(n => n.split(',').map(n => parseInt(n.trim())));

  rawRules.split('\n').forEach(line => {
    const [before, after] = line.split('|').map(n => parseInt(n.trim()));

    if (!beforeRules.has(after)) {
      beforeRules.set(after, new Set());
    }
    if (!afterRules.has(before)) {
      afterRules.set(before, new Set());
    }

    beforeRules.get(after)?.add(before);
    afterRules.get(before)?.add(after);
  });

  return {
    beforeRules,
    afterRules,
    orders,
  }
}

export {
  part1,
  part2
};
