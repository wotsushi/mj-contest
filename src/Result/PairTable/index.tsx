import styled from "styled-components";
import Row from "./Row";
import { Pair } from "../../contest";

type Props = {
  nameByID: Map<number, string>;
  pairs: Pair[];
  pointsByID: Map<number, (number | string)[]>;
};

const PairTable: React.FC<Props> = ({ nameByID, pairs, pointsByID }) => {
  const rows = pairs
    .map<Omit<RowProps, "rank">>(({ players: [x, y] }) => {
      const points: RowProps["points"] = [
        pointsByID.get(x)!,
        pointsByID.get(y)!,
      ];
      return {
        names: [nameByID.get(x), nameByID.get(y)],
        total:
          points
            .flat()
            ?.filter((point) => typeof point === "number")
            .reduce((total, point) => point + total, 0) ?? 0,
        points: points ?? [],
      };
    })
    .sort((a, b) => (b.total ?? 0) - (a.total ?? 0))
    .reduce<RowProps[]>((res, row, i) => {
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
          {rows[0].points[0].map((_, i) => (
            <Th key={i}>{i + 1}回戦</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <Row
            key={`${pairs[i].players[0]}-${pairs[i].players[1]}`}
            rank={row.rank}
            names={row.names}
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

type RowProps = React.ComponentProps<typeof Row>;

export default PairTable;
