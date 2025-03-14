import { useParams } from "react-router";
import { players, useContest } from "../contest";
import Table from "./Table";

const Form: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { contest, saveScores } = useContest(id ?? "");
  if (id === undefined || contest === null) return null;
  const nameByID = new Map(players.map(({ id, name }) => [id, name]));
  const result = contest.results[0][0];
  return (
    <div>
      <Table
        nameByID={nameByID}
        result={result}
        saveScores={(scores: number[]) => saveScores(0, 0, scores)}
      />
    </div>
  );
};

export default Form;
