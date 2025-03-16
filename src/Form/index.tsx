import { useParams, useSearchParams } from "react-router";
import { players, useContest } from "../contest";
import Table from "./Table";

const Form: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [params] = useSearchParams();
  const round = parseInt(params.get("round") ?? "");
  const table = parseInt(params.get("table") ?? "");
  const { contest, mutateContest, saveScores } = useContest(id ?? "");
  if (contest === null || isNaN(round) || isNaN(table)) return null;
  const nameByID = new Map(players.map(({ id, name }) => [id, name]));
  const result = contest.results.at(round)?.at(table);
  if (result === undefined) return null;
  return (
    <div>
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
