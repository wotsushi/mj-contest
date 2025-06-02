import styled from "styled-components";
import Row from "./Row";
import { Pair } from "../../contest";

type Props = {
  nameByID: Map<number, string>;
  pairs: Pair[];
  pointsByID: Map<number, (number | string)[]>;
};

const PairTable2: React.FC<Props> = ({ nameByID, pairs, pointsByID }) => {
  const rows = pairs
    .map<Omit<RowProps, "rank">>((pair) => {
      const [x, y] = pair.players;
      const points: RowProps["points"] = [
        pointsByID.get(x)!,
        pointsByID.get(y)!,
      ];
      return {
        team: pair.team,
        names: [nameByID.get(x), nameByID.get(y)],
        total:
          points
            .flat()
            ?.filter((point) => typeof point === "number")
            .reduce((total, point) => point + total, 0) ?? 0,
        subtotal: [
          points[0]
            .filter((point) => typeof point === "number")
            .reduce((total, point) => point + total, 0) ?? 0,
          points[1]
            .filter((point) => typeof point === "number")
            .reduce((total, point) => point + total, 0) ?? 0,
        ],
        points: points ?? [],
      };
    })
    .sort((a, b) => (b.total ?? 0) - (a.total ?? 0));
  return (
    <Table>
      <thead>
        <tr>
          <Team>チーム</Team>
          <Player>名前</Player>
          <Th>合計</Th>
          <Th>小計</Th>
          {rows[0].points[0].map((_, i) => (
            <Th key={i}>{i + 1}回戦</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <Row
            key={`${row.team}`}
            team={row.team}
            names={row.names}
            total={row.total}
            subtotal={row.subtotal}
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

const Team = styled(Th)`
  width: 15vw;
`;

const Player = styled(Th)`
  width: 12.5vw;
`;

type RowProps = React.ComponentProps<typeof Row>;

export default PairTable2;
