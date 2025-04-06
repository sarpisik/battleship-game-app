import hit from "../assets/hit.png";
import miss from "../assets/miss.png";
import { FireType } from "../types";

export const Cell = ({
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
