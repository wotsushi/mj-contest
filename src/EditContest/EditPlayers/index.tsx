import React from "react";
import { Rule } from "../../contest";
import Normal from "./Normal";
import Pairs from "./Pairs";
import Teams from "./Teams";

type Props = {
  nameByID: Map<number, string>;
  players: number[];
  setPlayers: (players: number[]) => void;
  rule: Rule | undefined;
  setRule: (rule: Rule) => void;
};

const EditPlayers: React.FC<Props> = ({
  nameByID,
  players,
  setPlayers,
  rule,
  setRule,
}) =>
  rule?.id === "team" ?
    <Teams
      nameByID={nameByID}
      setPlayers={setPlayers}
      rule={rule}
      setRule={setRule}
    />
  : rule?.id === "pair" ?
    <Pairs
      nameByID={nameByID}
      setPlayers={setPlayers}
      rule={rule}
      setRule={setRule}
    />
  : <Normal nameByID={nameByID} players={players} setPlayers={setPlayers} />;

export default EditPlayers;
