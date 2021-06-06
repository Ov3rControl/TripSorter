import React, { memo } from "react";
import { styles } from "../TripSorterStyles";

type Props = {
  readonly name: string;
  readonly children: React.ReactNode;
} & React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

export const Select = memo(({ name, children, ...props }: Props) => {
  return (
    <select {...props} defaultValue="" name={name} style={styles.select}>
      <option value="" disabled>
        {name}
      </option>
      {children}
    </select>
  );
});
