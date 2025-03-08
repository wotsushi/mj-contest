import { contest, players } from "../contest";
import Table from "./Table";

const Form: React.FC = () => {
  const nameByID = new Map(players.map(({ id, name }) => [id, name]));
  const result = contest.results[0][0];
  return (
    <div>
      <Table nameByID={nameByID} result={result} />
    </div>
  );
};

export default Form;
