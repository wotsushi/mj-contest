import styled from "styled-components";

type Props = {
  id: number;
  rank: number;
  name: string | undefined;
  total: number;
  points: (number | string)[];
};

const Row: React.FC<Props> = ({ id, rank, name, total, points }) => {
  return (
    <Tr key={id}>
      <Rank>{rank}</Rank>
      <Name>{name}</Name>
      <Total>
        <NumberLabel $negative={total < 0}>{total.toFixed(1)}</NumberLabel>
      </Total>
      {points.map((point, i) => {
        if (typeof point === "string") {
          return (
            <Cell key={i}>
              <NumberLabel>{point}</NumberLabel>
            </Cell>
          );
        }
        return (
          <Cell key={i}>
            <NumberLabel $negative={point < 0}>{point.toFixed(1)}</NumberLabel>
          </Cell>
        );
      })}
    </Tr>
  );
};

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:nth-child(odd) {
    background-color: #fff;
  }
`;

const Cell = styled.td`
  color: #434343;
`;

const Rank = styled(Cell)`
  font-weight: bold;
`;

const Name = styled(Cell)`
  background-color: #d0e0e3;
  border-bottom: 1px solid #f2f2f2;
`;

const Total = styled(Cell)`
  font-weight: bold;
  background-color: #fff2cc;
  border-bottom: 1px solid #f8e09b;
`;

const NumberLabel = styled.div<{ $negative?: boolean }>`
  padding-right: 33%;
  color: ${({ $negative }) => ($negative ? "#ff0000" : undefined)};
  text-align: right;
`;

export default Row;
