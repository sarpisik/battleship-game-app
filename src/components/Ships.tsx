import battleshipShape from "../assets/battleship_shape.png";
import carrierShape from "../assets/carrier_shape.png";
import cruiserShape from "../assets/cruiser_shape.png";
import submarineShape from "../assets/submarine_shape.png";
import hitSmall from "../assets/hit_small.png";
import missSmall from "../assets/miss_small.png";
import { ShipMap } from "../types";

const renderHealth = (size: number, hits: number[][]) => {
  const imgs = [];

  for (let i = 0; i < size; i++) {
    const hit = hits[i];
    if (hit) {
      imgs.push(
        <img
          key={`${hit[0]},${hit[1]}`}
          className="img-responsive img-miss"
          src={hitSmall}
          alt="Hit"
        />
      );
    } else {
      imgs.push(
        <img
          key={i}
          className="img-responsive img-miss"
          src={missSmall}
          alt="Miss"
        />
      );
    }
  }

  return imgs;
};

export const Ships = ({ ships }: { ships: ShipMap }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div className="ship-col">
        <img
          className="img-responsive img-ship"
          src={carrierShape}
          alt="Carrier shape"
        />
        {renderHealth(ships.carrier.positions.length, ships.carrier.hits)}
      </div>
      <div className="ship-col">
        <img
          className="img-responsive img-ship"
          src={submarineShape}
          alt="Submarine shape"
        />
        {renderHealth(ships.submarine.positions.length, ships.submarine.hits)}
      </div>
      <div className="ship-col">
        <img
          className="img-responsive img-ship"
          src={battleshipShape}
          alt="Battleship shape"
        />
        {renderHealth(ships.battleship.positions.length, ships.battleship.hits)}
      </div>
      <div className="ship-col">
        <img
          className="img-responsive img-ship"
          src={cruiserShape}
          alt="Cruiser shape"
        />
        {renderHealth(ships.cruiser.positions.length, ships.cruiser.hits)}
      </div>
      <div className="ship-col">
        <img
          className="img-responsive img-ship"
          src={cruiserShape}
          alt="Destroyer shape"
        />
        {renderHealth(ships.destroyer.positions.length, ships.destroyer.hits)}
      </div>
    </div>
  );
};
