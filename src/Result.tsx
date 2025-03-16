import styled from "styled-components";
import { calcPoints } from "./point";
import { players, useContest } from "./contest";
import { useParams } from "react-router";

const Result: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { contest } = useContest(id ?? "");
  if (contest === null) return null;
  const nameByID = new Map(players.map(({ id, name }) => [id, name]));
  const pointsByID = new Map(
    contest.players.map((id) => [
      id,
      contest.results.map((result) => {
        const game = result.find(({ players }) => players.includes(id));
        if (game === undefined) return "";
        if (game.scores === null) return game.table;
        const points = calcPoints(game.scores);
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
                <NumberLabel $negative={row.total < 0}>
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
                    <NumberLabel $negative={point < 0}>
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

const NumberLabel = styled.div<{ $negative?: boolean }>`
  padding-right: 33%;
  color: ${({ $negative }) => ($negative ? "#ff0000" : undefined)};
  text-align: right;
`;

export default Result;
