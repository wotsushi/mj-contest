import styled from "styled-components";

const Result: React.FC = () => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>順位</Th>
          <Th>名前</Th>
          <Th>合計</Th>
          <Th>1回戦</Th>
          <Th>2回戦</Th>
          <Th>3回戦</Th>
          <Th>4回戦</Th>
          <Th>5回戦</Th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, i) => (
          <Tr key={player.id}>
            <Rank>{i + 1}</Rank>
            <Name>{player.name}</Name>
            <Total>0.0</Total>
            <Cell>0.0</Cell>
            <Cell>0.0</Cell>
            <Cell>0.0</Cell>
            <Cell>0.0</Cell>
            <Cell>0.0</Cell>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 95vw;
  height: 95vh;
  font-size: 1.5vw;
  border-radius: 10px;
`;

const Th = styled.th`
  color: #fff;
  background-color: #356854;
`;

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

const players = [
  { id: 1, name: "そら" },
  { id: 2, name: "ロボ子さん" },
  { id: 3, name: "アキロゼ" },
  { id: 4, name: "はあと" },
  { id: 5, name: "フブキ" },
  { id: 6, name: "まつり" },
  { id: 7, name: "シオン" },
  { id: 8, name: "あやめ" },
  { id: 9, name: "ちょこ" },
  { id: 10, name: "スバル" },
  { id: 11, name: "AZKi" },
  { id: 12, name: "ミオ" },
  { id: 13, name: "みこ" },
  { id: 14, name: "おかゆ" },
  { id: 15, name: "ころね" },
  { id: 16, name: "すいせい" },
];

export default Result;
