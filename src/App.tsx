import { ReactNode, useState } from "react";
import "./App.css";
import hit from "./assets/hit.png";
import hitSmall from "./assets/hit_small.png";
import missSmall from "./assets/miss_small.png";
import miss from "./assets/miss.png";
import battleshipShape from "./assets/battleship_shape.png";
import carrierShape from "./assets/carrier_shape.png";
import cruiserShape from "./assets/cruiser_shape.png";
import submarineShape from "./assets/submarine_shape.png";

const Header = () => {
  return <div>HEADER</div>;
};
const Board = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ display: "inline-block", border: "2px solid black" }}>
      {children}
    </div>
  );
};
const Score = ({ score }: { score: number }) => {
  return (
    <div style={{ display: "flex" }}>
      <div className="score-col">
        <div>
          0{score}
          <hr />
          player 1
        </div>
      </div>
      <div className="score-col">
        <div>
          00
          <hr />
          player 2
        </div>
      </div>
    </div>
  );
};

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

const Ships = ({ ships }: { ships: ShipMap }) => {
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

const Cell = ({
  status,
  onFire,
}: {
  status: FireType | undefined;
  onFire: () => void;
}) => {
  return (
    <div
      onClick={onFire}
      style={{
        width: 30,
        height: 30,
        border: "1px solid #555",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {status && (
        <img
          src={status === "hit" ? hit : miss}
          alt={status === "hit" ? "Hit icon" : "Miss icon"}
          style={{
            width: 30,
            height: 30,
          }}
        />
      )}
    </div>
  );
};

const SIZE = 10;

const layout = [
  {
    ship: "carrier",
    positions: [
      [2, 9],
      [3, 9],
      [4, 9],
      [5, 9],
      [6, 9],
    ],
  },
  {
    ship: "battleship",
    positions: [
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5],
    ],
  },
  {
    ship: "cruiser",
    positions: [
      [8, 1],
      [8, 2],
      [8, 3],
    ],
  },
  {
    ship: "submarine",
    positions: [
      [3, 0],
      [3, 1],
      [3, 2],
    ],
  },
  {
    ship: "destroyer",
    positions: [
      [0, 0],
      [1, 0],
    ],
  },
];

type ShipMap = Record<
  string,
  {
    positions: number[][];
    hits: number[][];
  }
>;

const createShipMap = (): ShipMap => {
  const map: ShipMap = {};

  layout.forEach(({ ship, positions }) => {
    map[ship] = {
      positions,
      hits: [],
    };
  });

  return map;
};

type FireType = "miss" | "hit";

type FiredShots = Record<string, FireType>;
function App() {
  const [firedShots, setFiredShots] = useState<FiredShots>({});
  const [ships, setShips] = useState(createShipMap);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const restartGame = () => {
    setFiredShots({});
    setShips(createShipMap());
    setScore(0);
    setGameOver(false);
  };

  const isGameOver = () =>
    Object.values(ships).every(
      (ship) => ship.positions.length === ship.hits.length
    );

  const fireAt = (x: number, y: number) => {
    const key = `${x},${y}`;
    if (firedShots[key]) return; // already fired here

    const updatedShots: FiredShots = { ...firedShots, [key]: "miss" };

    const newShips = { ...ships };

    for (const [, ship] of Object.entries(newShips)) {
      if (ship.positions.some(([sx, sy]) => sx === x && sy === y)) {
        ship.hits.push([x, y]);
        updatedShots[key] = "hit";
        if (ship.hits.length === ship.positions.length) {
          setScore((_score) => _score + 1);
        }
        break;
      }
    }

    setFiredShots(updatedShots);
    setShips(newShips);
    setGameOver(isGameOver());
  };

  const renderGrid = () => {
    const rows = [];
    for (let y = 0; y < SIZE; y++) {
      const row = [];
      for (let x = 0; x < SIZE; x++) {
        const key = `${x},${y}`;
        row.push(
          <Cell
            key={key}
            status={firedShots[key]}
            onFire={() => {
              fireAt(x, y);
            }}
          />
        );
      }
      rows.push(
        <div key={y} style={{ display: "flex" }}>
          {row}
        </div>
      );
    }
    return rows;
  };

  return (
    <>
      <Header />
      {gameOver ? (
        <div>
          <p>Game is over</p>
          <button onClick={restartGame}>Start a new game</button>
        </div>
      ) : (
        <Board>{renderGrid()}</Board>
      )}
      <Score score={score} />
      <Ships ships={ships} />
    </>
  );
}

export default App;
