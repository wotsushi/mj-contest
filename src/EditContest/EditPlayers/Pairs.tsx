import styled from "styled-components";
import React from "react";
import PlayerSelect from "../PlayerSelect";
import { PairRule, Rule } from "../../contest";

type Props = {
  nameByID: Map<number, string>;
  rule: PairRule;
  setRule: (rule: Rule) => void;
  setPlayers: (players: number[]) => void;
};

const Pairs: React.FC<Props> = ({ nameByID, rule, setRule, setPlayers }) => {
  const effectivePairs: PairRule["pairs"] =
    rule.pairs.length > 0 ?
      rule.pairs
    : Array.from({ length: 8 }, () => [1, 1]);
  const toPlayers = (pairs: [number, number][]) =>
    playersIdx.map(([i, j]) => pairs[i][j]);
  const setPlayer = (player: number, pairsIdx: number, i: number) => {
    const nextRule = structuredClone(rule);
    nextRule.pairs = effectivePairs;
    nextRule.pairs[pairsIdx][i] = player;
    setRule(nextRule);
    setPlayers(toPlayers(nextRule.pairs));
  };
  return (
    <Root>
      {effectivePairs.map((pair, i) =>
        pair.map((player, j) => (
          <PlayerSelect
            key={`${i}-${j}`}
            nameByID={nameByID}
            current={player}
            set={(p: number) => setPlayer(p, i, j)}
          />
        )),
      )}
    </Root>
  );
};

const Root = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 8px;
`;

const playersIdx = [
  [0, 0],
  [1, 0],
  [2, 0],
  [2, 1],
  [1, 1],
  [0, 1],
  [3, 0],
  [4, 0],
  [4, 1],
  [3, 1],
  [5, 0],
  [6, 0],
  [7, 0],
  [7, 1],
  [6, 1],
  [5, 1],
];

export default Pairs;
