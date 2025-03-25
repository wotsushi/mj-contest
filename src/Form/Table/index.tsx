import styled from "styled-components";
import { useEffect, useState } from "react";
import { calcPoints, totalInitialScore } from "../../point";
import ScoreInput from "./ScoreInput";
import { Result } from "../../contest";
import WindSelect from "./WindSelect";

type Props = {
  nameByID: Map<number, string>;
  result: Result;
  setPlayers: (players: number[]) => void;
  setScores: (scores: number[] | null) => void;
  saveScores: () => void;
};

const Table: React.FC<Props> = ({
  nameByID,
  result,
  setPlayers,
  setScores,
  saveScores,
}) => {
  const [players, setDraftPlayers] = useState<number[]>(result.players);
  const [scores, setDraftScores] = useState<(number | null)[]>(
    result.scores ?? result.players.map(() => null),
  );
  useEffect(() => {
    if (isNotEqual(players, result.players)) setPlayers(players);
    if (
      scores.every((score) => score !== null) &&
      scores.every((score) => !isNaN(score)) &&
      (result.scores === null || isNotEqual(scores, result.scores))
    ) {
      setScores(scores);
    }
  }, [players, scores, result.players, result.scores, setPlayers, setScores]);

  const updateScore = (i: number) => (score: number) =>
    setDraftScores(scores.map((s, j) => (j === i ? score : s)));
  const setWind = (i: number) => (w: number) => {
    setDraftPlayers(swap(players, i, w));
    setDraftScores(swap(scores, i, w));
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
            {players.map((id) => (
              <Th key={id}>{nameByID.get(id) ?? ""}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          <Tr>
            {players.map((_, i) => (
              <Td key={i}>
                <WindSelect wind={i} setWind={setWind(i)} />
              </Td>
            ))}
          </Tr>
          <Tr>
            {scores.map((score, i) => (
              <Td key={`${i} ${players[i]}`}>
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
      <button type="button" disabled={!showPoints} onClick={saveScores}>
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

const isNotEqual = <T,>(draft: T[], data: T[]) =>
  draft.length !== data.length || draft.some((v, i) => v !== data[i]);

const swap = <T,>(a: T[], i: number, j: number) =>
  a.map((_, k) =>
    k === i ? a[j]
    : k === j ? a[i]
    : a[k],
  );
export default Table;
