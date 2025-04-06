export type FireType = "miss" | "hit";

export type FiredShots = Record<string, FireType>;

export type ShipMap = Record<
  string,
  {
    positions: number[][];
    hits: number[][];
  }
>;
