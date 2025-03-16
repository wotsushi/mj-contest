import styled from "styled-components";
import { calcPoints } from "../point";
import { useContest } from "../contest";
import { useParams } from "react-router";
import { useMaster } from "../master";
import Row from "./Row";

const Result: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { nameByID } = useMaster();
  const { contest } = useContest(id ?? "");
  if (nameByID === null || contest === null) return null;
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
    .reduce<React.ComponentProps<typeof Row>[]>((res, row, i) => {
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
        {rows.map((row) => (
          <Row
            id={row.id}
            rank={row.rank}
            name={row.name}
            total={row.total}
            points={row.points}
          />
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

export default Result;
