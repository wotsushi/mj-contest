import TextInput from "../../components/TextInput";
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
      <TextInput
        text={result.table}
        setText={(table: string) => setResult({ ...result, table })}
        size={10}
      />
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
