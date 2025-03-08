import styled from "styled-components";
import { useState } from "react";
import { calcPoints, totalInitialScore } from "../../point";
import ScoreInput from "./ScoreInput";

const Table: React.FC = () => {
  const [scores, setScores] = useState<(number | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const updateScore = (i: number) => (score: number) =>
    setScores(scores.map((s, j) => (j === i ? score : s)));

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
            <Th>そら</Th>
            <Th>ロボ子さん</Th>
            <Th>アキロゼ</Th>
            <Th>はあと</Th>
          </tr>
        </thead>
        <tbody>
          <Tr>
            {scores.map((_, i) => (
              <Td key={i}>
                <ScoreInput commit={updateScore(i)} />
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
