import styled from "styled-components";
import React from "react";
import PlayerSelect from "../PlayerSelect";
import { Rule, Team, TeamRule } from "../../contest";
import TextInput from "../../components/TextInput";

type Props = {
  nameByID: Map<number, string>;
  rule: TeamRule;
  setRule: (rule: Rule) => void;
  setPlayers: (players: number[]) => void;
};

const Teams: React.FC<Props> = ({ nameByID, rule, setRule, setPlayers }) => {
  const teams: Team[] =
    rule.teams.length > 0 ?
      rule.teams
    : Array.from({ length: 4 }, () => ({ team: "", players: [1, 1, 1, 1] }));
  const toPlayers = (teams: Team[]) =>
    teams.flatMap(({ players }) => players.map((playerID) => playerID));
  const setTeam = (team: string, teamsIdx: number) => {
    const nextRule = structuredClone(rule);
    nextRule.teams = teams;
    nextRule.teams[teamsIdx].team = team;
    setRule(nextRule);
  };
  const setPlayer = (player: number, teamsIdx: number, i: number) => {
    const nextRule = structuredClone(rule);
    nextRule.teams = teams;
    nextRule.teams[teamsIdx].players[i] = player;
    setRule(nextRule);
    setPlayers(toPlayers(nextRule.teams));
  };
  return (
    <Root>
      {teams.map((team, i) => (
        <React.Fragment key={i}>
          <TextInput
            text={team.team}
            setText={(teamName: string) => setTeam(teamName, i)}
          />
          {team.players.map((player, j) => (
            <PlayerSelect
              key={`${i}-${j}`}
              nameByID={nameByID}
              current={player}
              set={(p: number) => setPlayer(p, i, j)}
            />
          ))}
        </React.Fragment>
      ))}
    </Root>
  );
};

const Root = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  gap: 8px;
`;

export default Teams;
