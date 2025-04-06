import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { Cell } from "./components/Cell";
import { Header } from "./components/Header";
import { Score } from "./components/Score";
import { Ships } from "./components/Ships";
import { LAYOUT, SIZE } from "./constants";
import { FiredShots, ShipMap } from "./types";

const createShipMap = (): ShipMap => {
  const map: ShipMap = {};

  LAYOUT.forEach(({ ship, positions }) => {
    map[ship] = {
      positions,
      hits: [],
    };
  });

  return map;
};
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

    const isGameOver = Object.values(newShips).every(
      (ship) => ship.positions.length === ship.hits.length
    );

    setFiredShots(updatedShots);
    setShips(newShips);
    setGameOver(isGameOver);
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
