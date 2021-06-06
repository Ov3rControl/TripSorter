import React, { useCallback, useState, useEffect } from "react";
import { Deal } from "../constants/data";
import { useWorker } from "./useWorker";
import { TripSorterWorkerType } from "../worker";

export enum sortCriteriaENUM {
  FASTEST,
  CHEAPEST,
}

/**
 * Perform Calc on worker (this is an overkill here because the algo is very fast. but for a very large data it's needed)
 */
export const useTripSorter = () => {
  const { workerApi } = useWorker<TripSorterWorkerType>();

  const [cities, setCities] = useState<string[]>([]);

  const [data, setData] = useState<{ isLoading: boolean; deals?: Deal[] }>({
    isLoading: false,
    deals: undefined,
  });

  const [trip, setTrip] = useState({ from: "", to: "" });

  const [sortCriteria, setSortCriteria] = useState<sortCriteriaENUM>(
    () => sortCriteriaENUM.CHEAPEST
  );

  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value, name } = event.target;
      setTrip((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSortCriteria = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { name } = event.currentTarget;

      if (name === "Cheapest") {
        setSortCriteria(sortCriteriaENUM.CHEAPEST);
      } else {
        setSortCriteria(sortCriteriaENUM.FASTEST);
      }
    },
    []
  );

  const handleSearch = useCallback(() => {
    setData({ isLoading: true, deals: undefined });

    switch (sortCriteria) {
      case sortCriteriaENUM.FASTEST:
        workerApi.findFastestPath(trip.from, trip.to).then((path: Deal[]) => {
          setData({ isLoading: false, deals: path });
        });
        break;

      case sortCriteriaENUM.CHEAPEST:
        workerApi.findCheapestPath(trip.from, trip.to).then((path: Deal[]) => {
          setData({ isLoading: false, deals: path });
        });
        break;
    }
    setTrip({ from: "", to: "" });
  }, [workerApi, setData, trip]);

  useEffect(() => {
    workerApi.allCities.then((cities) => setCities(cities));
  }, [workerApi]);

  return {
    handleSelect,
    data,
    handleSearch,
    cities,
    trip,
    handleSortCriteria,
    sortCriteria,
  };
};
