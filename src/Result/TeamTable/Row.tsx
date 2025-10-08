import styled from "styled-components";

type Props = {
  rank: number;
  team: string;
  names: (string | undefined)[];
  total: number;
  subtotal: number[];
  points: (number | string)[][];
};

const Row: React.FC<Props> = ({
  rank,
  team,
  names,
  total,
  subtotal,
  points,
}) => {
  const span = names.length;
  return (
    <>
      <Tr>
        <Rank $rank={rank} rowSpan={span}>
          {rank}
        </Rank>
        <Team rowSpan={span}>{team}</Team>
        <Name>{names[0]}</Name>
        <Total rowSpan={span}>
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
      {Array.from({ length: span - 1 }).map((_, i) => (
        <Tr key={i}>
          <Name>{names[i + 1]}</Name>
          <SubTotal $bottom={i + 1 === span - 1}>
            <NumberLabel $negative={subtotal[i + 1] < 0}>
              {subtotal[i + 1].toFixed(1)}
            </NumberLabel>
          </SubTotal>
          {points[i + 1].map((point, i) => {
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
      ))}
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
  border-bottom: 4px solid #f2f2f2;
`;

const Team = styled(Cell)`
  font-weight: bold;
  border-bottom: 4px solid #f2f2f2;
`;

const Name = styled(Cell)`
  background-color: #d0e0e3;
  border-bottom: 2px solid #f2f2f2;
`;

const Total = styled(Cell)`
  font-weight: bold;
  background-color: #fff2cc;
  border-bottom: 4px solid #f8e09b;
`;

const SubTotal = styled(Cell)<{ $bottom?: boolean }>`
  background-color: #fafad2;
  border-bottom: ${({ $bottom }) => ($bottom ? "4px" : "2px")} solid #f8e09b;
`;

const NumberLabel = styled.div<{ $negative?: boolean }>`
  padding-right: 33%;
  color: ${({ $negative }) => ($negative ? "#ff0000" : undefined)};
  text-align: right;
`;

export default Row;
