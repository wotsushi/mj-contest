import { Rule } from "../contest";

type Props = {
  rule: Rule | undefined;
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
        onChange={() => setRule({ id: "normal" })}
      />
      通常
    </label>
    <label>
      <input
        type="radio"
        name="rule"
        value="pair"
        checked={rule?.id === "pair"}
        onChange={() => setRule({ id: "pair", pairs: [] })}
      />
      ペア
    </label>
  </div>
);

export default EditRule;
