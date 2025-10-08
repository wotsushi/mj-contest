import { useDoc } from "../firebase";

export type Contest = {
  date: string;
  players: number[];
  results: Result[][];
  rule: Rule;
};

export type Result = {
  table: string;
  players: number[];
  scores: number[] | null;
};

export type Rule =
  | {
      id: "normal";
      uma: [number, number, number, number];
    }
  | PairRule
  | TeamRule;

export type PairRule = {
  id: "pair";
  pairs: Pair[];
  uma: [number, number, number, number];
};

export type Pair = {
  team: string;
  players: [number, number];
};

export type TeamRule = {
  id: "team";
  teams: Team[];
  uma: [number, number, number, number];
};

export type Team = {
  team: string;
  players: number[];
};

export const useContest = (id: string) => {
  const {
    state: contest,
    setter: setContest,
    put: putContest,
    update: updateContest,
  } = useDoc<Contest>(id);
  const mutateContest = (mutate: (next: Contest) => void) => {
    setContest((prev) => {
      if (prev === null) return null;
      const next = structuredClone(prev);
      mutate(next);
      return next;
    });
  };
  const saveScores = (round: number, table: number) => {
    updateContest("results", round, table, "scores");
    updateContest("results", round, table, "players");
    window.alert("保存しました");
  };
  const saveContest = () => {
    putContest();
    window.alert("保存しました");
  };
  return {
    contest,
    mutateContest,
    saveContest,
    saveScores,
  };
};
