import React, { FunctionComponent } from "react";
import { Deal } from "./constants/data";
import { styles } from "./TripSorterStyles";

export const TripSorter: FunctionComponent = (): JSX.Element => {
  return (
    <div style={styles.container}>
      <div style={styles.container}>
        <select defaultValue="From" style={styles.select}>
          <option value="" disabled selected>
            From
          </option>
        </select>
        <select style={styles.select}>
          <option value="" disabled selected>
            To
          </option>
        </select>
      </div>
      <div style={styles.buttonGroup}>
        <button>Cheapest</button>
        <button>Fastest</button>
      </div>
      {/* <TripCard /> */}
      <button>Search</button>
    </div>
  );
};

type TripCardProps = {
  deal: Deal;
};

const TripCard: FunctionComponent<TripCardProps> = ({
  deal,
}: TripCardProps): JSX.Element => {
  return (
    <div style={styles.tripCard}>
      <div style={styles.tripDetails}>
        <div style={styles.tripHeader}>
          <p>{deal.departure}</p>
          <div style={styles.seperator}> {">"} </div>
          <p>{deal.arrival}</p>
        </div>
        <div style={styles.tripBody}>
          <p style={styles.title}>{deal.transport}</p>
          <p style={styles.subTitle}>
            {deal.reference} for {deal.duration.h}
            {deal.duration.m}
          </p>
        </div>
      </div>
      <p style={styles.tripPrice}>{deal.cost} €</p>
    </div>
  );
};
