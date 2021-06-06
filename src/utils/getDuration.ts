import { Deal } from "../constants/data";
import { dealDurationCostFn } from "../worker";

export const getDuration = (deals: Deal[]) => {
  const totalMinutes = deals.map(dealDurationCostFn).reduce((a, c) => a + c);

  const hours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
