import styled from "styled-components";
import { useParams, useSearchParams } from "react-router";
import { useContest } from "../contest";
import Table from "./Table";
import Selector from "./Selector";

const Form: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [params, setParams] = useSearchParams();
  const round = parseInt(params.get("round") ?? "");
  const table = parseInt(params.get("table") ?? "");
  const { contest, mutateContest, saveScores } = useContest(id ?? "");
  if (contest === null || isNaN(round) || isNaN(table)) return null;
  const result = contest.results.at(round)?.at(table);
  if (result === undefined) return null;
  const setParam = (key: "round" | "table") => (value: number) =>
    setParams((prev) => {
      prev.set(key, value.toString());
      return prev;
    });
  return (
    <Root>
      <Selector
        contest={contest}
        round={round}
        table={table}
        setRound={setParam("round")}
        setTable={setParam("table")}
      />
      <Table
        key={`${round} ${table}`}
        result={result}
        setPlayers={(players) =>
          mutateContest((next) => {
            next.results[round][table].players = players;
          })
        }
        setScores={(scores) =>
          mutateContest((next) => {
            next.results[round][table].scores = scores;
          })
        }
        saveScores={() => saveScores(round, table)}
      />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  align-items: center;
`;

export default Form;
