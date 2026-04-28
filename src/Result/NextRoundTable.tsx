import styled from "styled-components";
import { Contest } from "../contest";

type Props = {
  nameByID: Map<number, string>;
  contest: Contest;
};

const tableNames = ["A", "B", "C", "D", "E", "F", "G", "H"];
const tableColors = ["red", "orange", "blue", "green"];

const NextRoundTable: React.FC<Props> = ({ nameByID, contest }) => {
  const nextRound = contest.results.findIndex((round) =>
    round.every((table) => table.scores === null),
  );
  const tables = nextRound >= 0 ? contest.results[nextRound] : [];
  const numTables = Math.floor(contest.players.length / 4);
  const rows = Array.from({ length: numTables }, (_, i) => {
    const table = tables[i];
    return {
      name: table?.table || tableNames[i] || "",
      players: table?.players ?? [null, null, null, null],
    };
  });
  return (
    <Wrapper>
      {nextRound >= 0 && <Heading>{nextRound + 1}回戦</Heading>}
      <Table>
        <tbody>
          {rows.map((row, i) => (
            <Tr key={i}>
              <TableNameTd $color={tableColors[i]}>{row.name}</TableNameTd>
              {row.players.map((p, j) => (
                <Td key={j}>{p === null ? "" : (nameByID.get(p) ?? "")}</Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 5vh 10vw;
`;

const Heading = styled.div`
  font-size: 2.5vw;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1vh;
`;

const Table = styled.table`
  width: 80vw;
  height: 75vh;
  font-size: 2vw;
  border-radius: 10px;
  text-align: center;
  table-layout: fixed;
`;

const Tr = styled.tr`
  background-color: #fff;
`;

const Td = styled.td`
  color: #434343;
  background-color: #fff;
  border: 1px solid #f2f2f2;
`;

const TableNameTd = styled(Td)<{ $color?: string }>`
  width: 10%;
  background-color: ${({ $color }) => $color ?? "#fff"};
  color: #fff;
  font-weight: bold;
`;

export default NextRoundTable;
