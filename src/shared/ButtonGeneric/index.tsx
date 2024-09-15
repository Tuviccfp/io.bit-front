import * as React from "react";

interface ButtonProps {
  typeButton?: "button" | "submit";
  onClick: () => void;
  value: string;
}
export default function Button({ typeButton, onClick, value }: ButtonProps) {
  return (
    <button type={typeButton} onClick={onClick}>
      {value}
    </button>
  );
}
