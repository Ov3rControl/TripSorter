import { expose } from "comlink";

import { data, Deal } from "./constants/data";

type Graph = Record<string, Deal[]>;

/** @internal */
const referenceMap: Record<string, Deal> = Object.fromEntries(
  data.deals.map((value) => [value.reference, value])
);

// group deals by departure
const nodes: Graph = data.deals.reduce((groupedDeals: Graph, deal) => {
  if (groupedDeals[deal.departure]) {
    groupedDeals[deal.departure].push(deal);
  } else {
    groupedDeals[deal.departure] = [deal];
  }
  return groupedDeals;
}, {});

/** @internal */
type NodeCosts = Record<string, { cost: number[]; reference: string | null }>;

/** @internal */
const generateRoute = (nodeCosts: NodeCosts, end: string) => {
  const path = [];
  while (nodeCosts[end].reference) {
    const node = referenceMap[nodeCosts[end].reference!];
    path.push(node);
    end = node.departure;
  }

  return path;
};

type CostFn = (n: Deal) => number;

const minCostForNode = (
  lowestCost: { cost: number[]; reference: string | null },
  deal: Deal,
  curNodeCosts: number[],
  costFns: CostFn[]
): { cost: number[]; reference: string | null } => {
  const currNodeCost = costFns.map(
    (costFn, i) => costFn(deal) + curNodeCosts[i]
  );

  const isFirstVisit = !lowestCost;
  if (isFirstVisit) return { cost: currNodeCost, reference: deal.reference };

  for (let i = 0; i < costFns.length; i++) {
    // costFns are sorted by priority so if any of them are less than deal
    if (currNodeCost[i] < lowestCost.cost[i]) {
      return { cost: currNodeCost, reference: deal.reference };
    }
  }

  return lowestCost;
};

const findPath = (
  graph: Graph,
  startNode: string,
  endNode: string,
  costFns: CostFn[]
): Deal[] => {
  const nodeCost: NodeCosts = {
    [startNode]: { cost: Array(costFns.length).fill(0), reference: null },
  };

  const visitedNodes = new Set<string>();
  const nodesToVisit = new Set<string>([startNode]);

  let currentNode = startNode;

  while (nodesToVisit.size) {
    const neighbors: Deal[] = graph[currentNode];
    const { cost: currentNodeCost } = nodeCost[currentNode];

    for (let neighbor of neighbors) {
      const name = neighbor.arrival;

      if (visitedNodes.has(name)) continue;
      nodesToVisit.add(name);

      const currLowestCost = nodeCost[name];
      nodeCost[name] = minCostForNode(
        currLowestCost,
        neighbor,
        currentNodeCost,
        costFns
      );
    }

    visitedNodes.add(currentNode);
    nodesToVisit.delete(currentNode);

    const next = nodesToVisit.entries().next();
    if (next.value) currentNode = next.value[0];
  }

  return generateRoute(nodeCost, endNode);
};

const dealPriceCostFn = (d: Deal) => d.cost * (1 - d.discount / 100);
const dealDurationCostFn = ({ duration: { h, m } }: Deal) =>
  parseInt(h) * 60 + parseInt(m);

expose({
  dealPriceCostFn,
  dealDurationCostFn,
  findCheapestPath: (startNode: string, endNode: string) =>
    findPath(nodes, startNode, endNode, [dealPriceCostFn, dealDurationCostFn]),
  findFastestPath: (startNode: string, endNode: string) =>
    findPath(nodes, startNode, endNode, [dealDurationCostFn, dealPriceCostFn]),
});
