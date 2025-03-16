import { useParams, useSearchParams } from "react-router";
import { players, useContest } from "../contest";
import Table from "./Table";
import Selector from "./Selector";

const Form: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [params, setParams] = useSearchParams();
  const round = parseInt(params.get("round") ?? "");
  const table = parseInt(params.get("table") ?? "");
  const { contest, mutateContest, saveScores } = useContest(id ?? "");
  if (contest === null || isNaN(round) || isNaN(table)) return null;
  const nameByID = new Map(players.map(({ id, name }) => [id, name]));
  const result = contest.results.at(round)?.at(table);
  if (result === undefined) return null;
  const setParam = (key: "round" | "table") => (value: number) =>
    setParams((prev) => {
      prev.set(key, value.toString());
      return prev;
    });
  return (
    <div>
      <Selector
        contest={contest}
        round={round}
        table={table}
        setRound={setParam("round")}
        setTable={setParam("table")}
      />
      <Table
        nameByID={nameByID}
        result={result}
        setScores={(scores) =>
          mutateContest((next) => {
            next.results[round][table].scores = scores;
          })
        }
        saveScores={() => saveScores(round, table)}
      />
    </div>
  );
};

export default Form;
