import { Rule } from "../contest";

type Props = {
  rule: Rule;
  setRule: (rule: Rule) => void;
};

const EditRule: React.FC<Props> = ({ rule, setRule }) => (
  <div>
    <label>
      <input
        type="radio"
        name="rule"
        value="normal"
        checked={rule === undefined || rule.id === "normal"}
        onChange={() => setRule({ id: "normal", uma: rule.uma })}
      />
      通常
    </label>
    <label>
      <input
        type="radio"
        name="rule"
        value="pair"
        checked={rule.id === "pair"}
        onChange={() => setRule({ id: "pair", pairs: [], uma: rule.uma })}
      />
      ペア
    </label>
    <label>
      <input
        type="radio"
        name="rule"
        value="team"
        checked={rule.id === "team"}
        onChange={() => setRule({ id: "team", teams: [], uma: rule.uma })}
      />
      チーム
    </label>
  </div>
);

export default EditRule;
