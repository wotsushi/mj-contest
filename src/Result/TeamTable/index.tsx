import styled from "styled-components";
import Row from "./Row";
import { Team } from "../../contest";

type Props = {
  nameByID: Map<number, string>;
  teams: Team[];
  pointsByID: Map<number, (number | string)[]>;
};

const TeamTable: React.FC<Props> = ({ nameByID, teams, pointsByID }) => {
  const rows = teams
    .map<Omit<RowProps, "rank">>((team) => {
      const players = team.players;
      const points: RowProps["points"] = players.map(
        (playerID) => pointsByID.get(playerID)!,
      );
      return {
        team: team.team,
        names: players.map((playerID) => nameByID.get(playerID)!),
        total:
          points
            .flat()
            ?.filter((point) => typeof point === "number")
            .reduce((total, point) => point + total, 0) ?? 0,
        subtotal: points.map(
          (ps) =>
            ps
              .filter((point) => typeof point === "number")
              .reduce((total, point) => point + total, 0) ?? 0,
        ),
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
          <TeamName>チーム</TeamName>
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
            rank={row.rank}
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

const TeamName = styled(Th)`
  width: 15vw;
`;

const Player = styled(Th)`
  width: 12.5vw;
`;

type RowProps = React.ComponentProps<typeof Row>;

export default TeamTable;
