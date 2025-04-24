import { Result } from "../../contest";
import PlayerSelect from "../PlayerSelect";

type Props = {
  nameByID: Map<number, string>;
  result: Result;
  setResult: (contest: Result) => void;
};

const EditTable: React.FC<Props> = ({ nameByID, result, setResult }) => {
  return (
    <div>
      <div>
        <input
          type="text"
          value={result.table}
          size={10}
          onChange={(e) =>
            setResult({
              ...result,
              table: e.target.value,
            })
          }
        />
      </div>
      {result.players.map((player, i) => (
        <PlayerSelect
          key={i}
          nameByID={nameByID}
          current={player}
          set={(next) =>
            setResult({
              ...result,
              players: result.players.map((prev, j) => (i === j ? next : prev)),
            })
          }
        />
      ))}
    </div>
  );
};

export default EditTable;
