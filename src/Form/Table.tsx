import styled from "styled-components";
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
    <Root>
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
          {scores.map((score, i) => (
            <Td key={i}>
              <Input
                type="number"
                placeholder="持ち点"
                step="100"
                value={score ?? ""}
                onChange={onChangeScore(i)}
              />
            </Td>
          ))}
        </Tr>
        <Tr>
          {points.map((point, i) => (
            <Td key={i}>
              <NumberLabel negative={(point ?? 0) < 0}>
                {point?.toFixed(1) ?? ""}
              </NumberLabel>
            </Td>
          ))}
        </Tr>
      </tbody>
    </Root>
  );
};

const Root = styled.table`
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

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 24px;
  color: #434343;
  text-align: center;
  background-color: #fff;
  border: none;

  &::placeholder {
    color: #ccc;
  }
`;

const NumberLabel = styled.div<{ negative?: boolean }>`
  color: ${({ negative }) => negative && "#ff0000"};
`;

export default Table;
