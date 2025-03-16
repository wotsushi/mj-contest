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

export const players: Player[] = [
  { id: 1, name: "そら" },
  { id: 2, name: "ロボ子さん" },
  { id: 3, name: "アキロゼ" },
  { id: 4, name: "はあと" },
  { id: 5, name: "フブキ" },
  { id: 6, name: "まつり" },
  { id: 7, name: "シオン" },
  { id: 8, name: "あやめ" },
  { id: 9, name: "ちょこ" },
  { id: 10, name: "スバル" },
  { id: 11, name: "AZKi" },
  { id: 12, name: "ミオ" },
  { id: 13, name: "みこ" },
  { id: 14, name: "おかゆ" },
  { id: 15, name: "ころね" },
  { id: 16, name: "すいせい" },
];
