import { useDoc } from "../firebase";

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
