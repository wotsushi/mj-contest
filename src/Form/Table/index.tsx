import styled from "styled-components";
import { useState } from "react";
import { calcPoints, totalInitialScore } from "../../point";
import ScoreInput from "./ScoreInput";
import { Result } from "../../contest";

type Props = {
  nameByID: Map<number, string>;
  result: Result;
  setScores: (scores: number[] | null) => void;
  saveScores: () => void;
};

const Table: React.FC<Props> = ({
  nameByID,
  result,
  setScores,
  saveScores,
}) => {
  const [scores, setDraftScores] = useState<(number | null)[]>(
    result.scores ?? result.players.map(() => null),
  );
  const updateScore = (i: number) => (score: number) => {
    const next = scores.map((s, j) => (j === i ? score : s));
    setDraftScores(next);
    if (
      next.every((score) => score !== null) &&
      next.every((score) => !isNaN(score))
    ) {
      setScores(next);
    } else setScores(null);
  };

  const showPoints = scores.every((score) => score !== null && !isNaN(score));
  const points =
    showPoints ?
      calcPoints(scores.filter((s) => s !== null))
    : scores.map(() => null);
  const total = scores.filter((s) => s !== null).reduce((sum, s) => sum + s, 0);
  return (
    <Root>
      <table>
        <thead>
          <tr>
            {result.players.map((id) => (
              <Th key={id}>{nameByID.get(id) ?? ""}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          <Tr>
            {scores.map((score, i) => (
              <Td key={i}>
                <ScoreInput score={score} commit={updateScore(i)} />
              </Td>
            ))}
          </Tr>
          <Tr>
            {points.map((point, i) => (
              <Td key={i}>
                <NumberLabel $negative={(point ?? 0) < 0}>
                  {point?.toFixed(1) ?? ""}
                </NumberLabel>
              </Td>
            ))}
          </Tr>
        </tbody>
      </table>
      {showPoints && total !== totalInitialScore(scores.length) && (
        <div>⚠️ 持ち点の合計が {total.toLocaleString()} です</div>
      )}
      <button
        type="button"
        disabled={!result.scores?.every((score) => score !== null)}
        onClick={saveScores}
      >
        保存
      </button>
    </Root>
  );
};

const Root = styled.div`
  font-size: 24px;
`;

const Th = styled.th`
  width: 150px;
  height: 50px;
  color: #fff;
  background-color: #356854;
`;

const Tr = styled.tr`
  height: 50px;
  background-color: #fff;
`;

const Td = styled.td`
  color: #434343;
  background-color: #fff;
  border: #f2f2f2 solid 1px;
`;

const NumberLabel = styled.div<{ $negative?: boolean }>`
  color: ${({ $negative }) => ($negative ? "#ff0000" : undefined)};
`;

export default Table;
