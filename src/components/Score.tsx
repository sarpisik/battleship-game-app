export const Score = ({ score }: { score: number }) => {
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
