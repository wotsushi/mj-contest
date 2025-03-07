import styled from "styled-components";
import { calcPoints } from "./point";

const Result: React.FC = () => {
  const nameByID = new Map(players.map(({ id, name }) => [id, name]));
  const pointsByID = new Map(
    contest.players.map((id) => [
      id,
      contest.results.map((result) => {
        const game = result.find(({ players }) => players.includes(id));
        if (game === undefined) return "";
        if (game.scores === null) return game.table;
        const points = calcPoints(game.scores, game.kyotaku);
        return points[game.players.indexOf(id)];
      }),
    ]),
  );
  const rows = contest.players
    .map((id) => {
      const points = pointsByID.get(id);
      return {
        id,
        name: nameByID.get(id),
        total:
          points
            ?.filter((point) => typeof point === "number")
            .reduce((total, point) => point + total, 0) ?? 0,
        points: points ?? [],
      };
    })
    .sort((a, b) => (b.total ?? 0) - (a.total ?? 0))
    .reduce<Row[]>((res, row, i) => {
      const last = res.at(-1);
      return res.concat([
        {
          ...row,
          rank:
            last == undefined ? 1
            : row.total === last.total ? last.rank
            : i + 1,
        },
      ]);
    }, []);
  return (
    <Table>
      <thead>
        <tr>
          <Th>順位</Th>
          <Th>名前</Th>
          <Th>合計</Th>
          {contest.results.map((_, i) => (
            <Th key={i}>{i + 1}回戦</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <Tr key={row.id}>
              <Rank>{row.rank}</Rank>
              <Name>{row.name}</Name>
              <Total>
                <NumberLabel negative={row.total < 0}>
                  {row.total.toFixed(1)}
                </NumberLabel>
              </Total>
              {row.points.map((point, i) => {
                if (typeof point === "string") {
                  return (
                    <Cell key={i}>
                      <NumberLabel>{point}</NumberLabel>
                    </Cell>
                  );
                }
                return (
                  <Cell key={i}>
                    <NumberLabel negative={point < 0}>
                      {point.toFixed(1)}
                    </NumberLabel>
                  </Cell>
                );
              })}
            </Tr>
          );
        })}
      </tbody>
    </Table>
  );
};

type Row = {
  id: number;
  rank: number;
  name: string | undefined;
  total: number;
  points: (number | string)[];
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

const NumberLabel = styled.div<{ negative?: boolean }>`
  padding-right: 33%;
  color: ${({ negative }) => negative && "#ff0000"};
  text-align: right;
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

type Contest = {
  date: string;
  players: number[];
  results: ({
    table: string;
    players: number[];
  } & (
    | {
        scores: number[];
        kyotaku: number;
      }
    | { scores: null; kyotaku: null }
  ))[][];
};

const contest: Contest = {
  date: "2025-03-22",
  players: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  results: [
    [
      {
        table: "A",
        players: [1, 2, 7, 12],
        scores: [25000, 30000, 10000, 35000],
        kyotaku: 0,
      },
      {
        table: "B",
        players: [4, 5, 8, 11],
        scores: [20000, 25000, 30000, 25000],
        kyotaku: 0,
      },
      {
        table: "C",
        players: [9, 10, 13, 16],
        scores: [15000, 35000, 20000, 30000],
        kyotaku: 0,
      },
      {
        table: "D",
        players: [3, 6, 14, 15],
        scores: [30000, 25000, 20000, 25000],
        kyotaku: 0,
      },
    ],
    [
      {
        table: "A",
        players: [5, 6, 7, 9],
        scores: null,
        kyotaku: null,
      },
      {
        table: "B",
        players: [1, 3, 8, 13],
        scores: [20000, 25000, 30000, 25000],
        kyotaku: 0,
      },
      {
        table: "C",
        players: [10, 11, 12, 14],
        scores: null,
        kyotaku: null,
      },
      {
        table: "D",
        players: [2, 4, 15, 16],
        scores: [30000, 25000, 20000, 25000],
        kyotaku: 0,
      },
    ],
    [
      {
        table: "A",
        players: [7, 11, 13, 15],
        scores: null,
        kyotaku: null,
      },
      {
        table: "B",
        players: [2, 6, 8, 10],
        scores: null,
        kyotaku: null,
      },
      {
        table: "C",
        players: [1, 4, 9, 14],
        scores: null,
        kyotaku: null,
      },
      {
        table: "D",
        players: [3, 5, 12, 16],
        scores: null,
        kyotaku: null,
      },
    ],
    [
      {
        table: "A",
        players: [4, 6, 12, 13],
        scores: null,
        kyotaku: null,
      },
      {
        table: "B",
        players: [2, 3, 9, 11],
        scores: null,
        kyotaku: null,
      },
      {
        table: "C",
        players: [7, 8, 14, 16],
        scores: null,
        kyotaku: null,
      },
      {
        table: "D",
        players: [1, 5, 10, 15],
        scores: null,
        kyotaku: null,
      },
    ],
    [
      {
        table: "A",
        players: [1, 6, 11, 16],
        scores: null,
        kyotaku: null,
      },
      {
        table: "B",
        players: [3, 4, 7, 10],
        scores: null,
        kyotaku: null,
      },
      {
        table: "C",
        players: [8, 9, 12, 15],
        scores: null,
        kyotaku: null,
      },
      {
        table: "D",
        players: [2, 5, 13, 14],
        scores: null,
        kyotaku: null,
      },
    ],
  ],
};

export default Result;
