import { useDoc } from "./firebase";

export type Contest = {
  date: string;
  players: number[];
  results: Result[][];
};

export type Result = {
  table: string;
  players: number[];
  scores: number[] | null;
};

export type Player = {
  id: number;
  name: string;
};

export const useContest = (id: string) => {
  const {
    state: contest,
    setter: setContest,
    put: putContest,
    update: updateContest,
  } = useDoc<Contest>(id);
  const mutateContest = (mutate: (next: Contest) => void) => {
    if (contest === null) return;
    const next = structuredClone(contest);
    mutate(next);
    setContest(next);
  };
  const saveScores = (round: number, table: number) =>
    updateContest("results", round, table, "scores");
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
