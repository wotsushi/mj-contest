import { ChangeEventHandler, useState } from "react";
import { calcPoints } from "../point";

const Table: React.FC = () => {
  const [scores, setScores] = useState<(number | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const onChangeScore =
    (i: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const newScores = [...scores];
      newScores[i] = parseInt(e.target.value, 10);
      setScores(newScores);
    };
  const points =
    scores.some((score) => score === null || isNaN(score)) ?
      scores.map(() => null)
    : calcPoints(scores.filter((s) => s !== null));
  return (
    <table>
      <thead>
        <tr>
          <th>そら</th>
          <th>ロボ子さん</th>
          <th>アキロゼ</th>
          <th>はあと</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {scores.map((score, i) => (
            <td key={i}>
              <input
                type="number"
                step="100"
                value={score ?? ""}
                onChange={onChangeScore(i)}
              />
            </td>
          ))}
        </tr>
        <tr>
          {points.map((point, i) => (
            <td key={i}>{point?.toFixed(1) ?? ""}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
