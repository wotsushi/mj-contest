import { useParams } from "react-router";
import { players, useContest } from "../contest";
import Table from "./Table";

const Form: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { contest, mutateContest, saveScores } = useContest(id ?? "");
  if (id === undefined || contest === null) return null;
  const nameByID = new Map(players.map(({ id, name }) => [id, name]));
  const result = contest.results[0][0];
  return (
    <div>
      <Table
        nameByID={nameByID}
        result={result}
        setScores={(scores) =>
          mutateContest((next) => {
            next.results[0][0].scores = scores;
          })
        }
        saveScores={() => saveScores(0, 0)}
      />
    </div>
  );
};

export default Form;
