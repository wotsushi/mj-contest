import React from "react";
import { Contest } from "../../contest";
import Select from "./Select";

type Props = {
  contest: Contest;
  round: number;
  table: number;
  setRound: (round: number) => void;
  setTable: (table: number) => void;
};

const Selector: React.FC<Props> = ({
  contest,
  round,
  table,
  setRound,
  setTable,
}) => {
  return (
    <div>
      <Select
        options={contest.results.map((_, i) => `第${i + 1}回戦`)}
        current={round}
        set={setRound}
      />
      <Select
        options={contest.results[round].map((t) => t.table)}
        current={table}
        set={setTable}
      />
    </div>
  );
};

export default Selector;
