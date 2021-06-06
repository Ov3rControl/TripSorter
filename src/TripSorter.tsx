import React, { FunctionComponent, memo, useCallback, useMemo } from "react";
import { Deal } from "./constants/data";
import { styles } from "./TripSorterStyles";
import { sortCriteriaENUM, useTripSorter } from "./hooks/useTripSorter";
import { Select } from "./components/Select";
import { RadioButton } from "./components/RadioButton";

export const TripSorter: FunctionComponent = (): JSX.Element => {
  const {
    cities,
    data,
    trip,
    sortCriteria,
    handleSelect,
    handleSearch,
    handleSortCriteria,
  } = useTripSorter();

  const { isLoading, deals } = data;

  const renderer = useCallback(() => {
    if (deals && !isLoading) {
      return deals?.map((deal) => (
        <TripResultsCard key={deal.reference} deal={deal} />
      ));
    }

    return (
      <TripCard
        cities={cities}
        trip={trip}
        handleSelect={handleSelect}
        handleSortCriteria={handleSortCriteria}
        sortCriteria={sortCriteria}
      />
    );
  }, [cities, sortCriteria, deals]);

  return (
    <div style={styles.container}>
      {renderer()}
      <button onClick={handleSearch}>{deals ? "Reset" : "Search"}</button>
    </div>
  );
};

type TripCardProps = {
  readonly cities: string[];
  readonly handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  readonly handleSortCriteria: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  readonly sortCriteria: sortCriteriaENUM;
  readonly trip: { from: string; to: string };
};

const TripCard: FunctionComponent<TripCardProps> = memo(
  ({
    cities,
    handleSelect,
    handleSortCriteria,
    sortCriteria,
    trip,
  }: TripCardProps): JSX.Element => {
    return (
      <>
        <div style={styles.container}>
          <Select name="from" onChange={handleSelect} style={styles.select}>
            {cities?.map((city) => (
              <option disabled={city === trip?.to} key={city}>
                {city}
              </option>
            ))}
          </Select>
          <Select name="to" onChange={handleSelect} style={styles.select}>
            {cities?.map((city) => (
              <option disabled={city === trip?.from} key={city}>
                {city}
              </option>
            ))}
          </Select>
        </div>
        <div style={styles.buttonGroup}>
          <RadioButton
            onClick={handleSortCriteria}
            name="Cheapest"
            checked={sortCriteria === sortCriteriaENUM.CHEAPEST}
          />
          <RadioButton
            onClick={handleSortCriteria}
            name="Fastest"
            checked={sortCriteria === sortCriteriaENUM.FASTEST}
          />
        </div>
      </>
    );
  }
);

type TripResultsCardProps = {
  readonly deal: Deal;
};

const TripResultsCard: FunctionComponent<TripResultsCardProps> = memo(
  ({ deal }: TripResultsCardProps): JSX.Element => {
    return (
      <div style={styles.tripCard}>
        <div style={styles.tripDetails}>
          <div style={styles.tripHeader}>
            <p>{deal.departure}</p>
            <div style={styles.separator}> {">"} </div>
            <p>{deal.arrival}</p>
          </div>
          <div style={styles.tripBody}>
            <p style={styles.title}>{deal.transport}</p>
            <p style={styles.subTitle}>
              {deal.reference} for {deal.duration.h}h{deal.duration.m}m
            </p>
          </div>
        </div>
        <p style={styles.tripPrice}>{deal.cost} €</p>
      </div>
    );
  }
);
