import React, { FunctionComponent } from "react";

type Props = {
  checked?: boolean;
  name: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const RadioButton: FunctionComponent<Props> = ({
  checked,
  name,
  ...props
}: Props): JSX.Element => {
  return (
    <button
      {...props}
      name={name}
      style={checked ? { backgroundColor: "dodgerblue" } : {}}
    >
      {name}
    </button>
  );
};
