import styled from "styled-components";

type Props = {
  rank: number;
  team: string;
  names: [string | undefined, string | undefined];
  total: number;
  subtotal: [number, number];
  points: [(number | string)[], (number | string)[]];
};

const Row: React.FC<Props> = ({
  rank,
  team,
  names,
  total,
  subtotal,
  points,
}) => {
  return (
    <>
      <Tr>
        <Rank $rank={rank} rowSpan={2}>
          {rank}
        </Rank>
        <Team rowSpan={2}>{team}</Team>
        <Name>{names[0]}</Name>
        <Total rowSpan={2}>
          <NumberLabel $negative={total < 0}>{total.toFixed(1)}</NumberLabel>
        </Total>
        <SubTotal>
          <NumberLabel $negative={subtotal[0] < 0}>
            {subtotal[0].toFixed(1)}
          </NumberLabel>
        </SubTotal>
        {points[0].map((point, i) => {
          if (typeof point === "string") {
            return (
              <Cell key={i}>
                <NumberLabel>{point}</NumberLabel>
              </Cell>
            );
          }
          return (
            <Cell key={i}>
              <NumberLabel $negative={point < 0}>
                {point.toFixed(1)}
              </NumberLabel>
            </Cell>
          );
        })}
      </Tr>
      <Tr>
        <Name>{names[1]}</Name>
        <SubTotal>
          <NumberLabel $negative={subtotal[1] < 0}>
            {subtotal[1].toFixed(1)}
          </NumberLabel>
        </SubTotal>
        {points[1].map((point, i) => {
          if (typeof point === "string") {
            return (
              <Cell key={i}>
                <NumberLabel>{point}</NumberLabel>
              </Cell>
            );
          }
          return (
            <Cell key={i}>
              <NumberLabel $negative={point < 0}>
                {point.toFixed(1)}
              </NumberLabel>
            </Cell>
          );
        })}
      </Tr>
    </>
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

const Rank = styled(Cell)<{ $rank: number }>`
  font-weight: bold;
  color: ${({ $rank }) => ["#d4af37", "#a9a9a9", "#8b5a2b"].at($rank - 1)};
`;

const Team = styled(Cell)`
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

const SubTotal = styled(Cell)`
  background-color: #fafad2;
  border-bottom: 1px solid #f8e09b;
`;

const NumberLabel = styled.div<{ $negative?: boolean }>`
  padding-right: 33%;
  color: ${({ $negative }) => ($negative ? "#ff0000" : undefined)};
  text-align: right;
`;

export default Row;
