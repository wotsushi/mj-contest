import styled from "styled-components";
import React from "react";
import PlayerSelect from "../PlayerSelect";

type Props = {
  nameByID: Map<number, string>;
  players: number[];
  setPlayers: (players: number[]) => void;
};

const Normal: React.FC<Props> = ({ nameByID, players, setPlayers }) => {
  const effectivePlayers =
    players.length > 0 ? players : Array.from({ length: 16 }, (_, i) => i);
  return (
    <Root>
      {effectivePlayers.map((player, i) => (
        <PlayerSelect
          key={i}
          nameByID={nameByID}
          current={player}
          set={(player) =>
            setPlayers(
              effectivePlayers.map((prev, j) => (i === j ? player : prev)),
            )
          }
        />
      ))}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export default Normal;
