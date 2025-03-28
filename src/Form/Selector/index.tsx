import styled from "styled-components";

import React from "react";
import { Contest } from "../../contest";
import Selectbox from "./Selectbox";

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
    <Root>
      <Selectbox
        name="round"
        options={contest.results.map((_, i) => `第${i + 1}回戦`)}
        current={round}
        set={(i: number) => {
          setRound(i);
          setTable(0);
        }}
      />
      <Selectbox
        name="table"
        options={contest.results[round].map((t) => t.table)}
        current={table}
        set={setTable}
      />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  column-gap: 24px;
`;

export default Selector;
