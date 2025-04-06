import { ReactNode } from "react";

export const Board = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ display: "inline-block", border: "2px solid black" }}>
      {children}
    </div>
  );
};
