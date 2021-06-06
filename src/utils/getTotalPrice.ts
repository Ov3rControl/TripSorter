import { Deal } from "../constants/data";
import { dealPriceCostFn } from "../worker";

export const getTotalPrice = (deals: Deal[]) =>
  deals?.map(dealPriceCostFn).reduce((a, c) => a + c);
