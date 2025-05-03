import styled from "styled-components";
import Row from "./Row";

type Props = {
  nameByID: Map<number, string>;
  players: number[];
  pointsByID: Map<number, (number | string)[]>;
};

const NormalTable: React.FC<Props> = ({ nameByID, players, pointsByID }) => {
  const rows = players
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
          {rows[0].points.map((_, i) => (
            <Th key={i}>{i + 1}回戦</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <Row
            key={row.id}
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

export default NormalTable;
