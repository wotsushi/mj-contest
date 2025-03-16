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

export const contest: Contest = {
  date: "2025-03-22",
  players: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  results: [
    [
      {
        table: "A",
        players: [1, 2, 7, 12],
        scores: [25000, 30000, 10000, 35000],
      },
      {
        table: "B",
        players: [4, 5, 8, 11],
        scores: [20000, 25000, 30000, 25000],
      },
      {
        table: "C",
        players: [9, 10, 13, 16],
        scores: [15000, 35000, 20000, 30000],
      },
      {
        table: "D",
        players: [3, 6, 14, 15],
        scores: [30000, 25000, 20000, 25000],
      },
    ],
    [
      {
        table: "A",
        players: [5, 6, 7, 9],
        scores: null,
      },
      {
        table: "B",
        players: [1, 3, 8, 13],
        scores: [20000, 25000, 30000, 25000],
      },
      {
        table: "C",
        players: [10, 11, 12, 14],
        scores: null,
      },
      {
        table: "D",
        players: [2, 4, 15, 16],
        scores: [30000, 25000, 20000, 25000],
      },
    ],
    [
      {
        table: "A",
        players: [7, 11, 13, 15],
        scores: null,
      },
      {
        table: "B",
        players: [2, 6, 8, 10],
        scores: null,
      },
      {
        table: "C",
        players: [1, 4, 9, 14],
        scores: null,
      },
      {
        table: "D",
        players: [3, 5, 12, 16],
        scores: null,
      },
    ],
    [
      {
        table: "A",
        players: [4, 6, 12, 13],
        scores: null,
      },
      {
        table: "B",
        players: [2, 3, 9, 11],
        scores: null,
      },
      {
        table: "C",
        players: [7, 8, 14, 16],
        scores: null,
      },
      {
        table: "D",
        players: [1, 5, 10, 15],
        scores: null,
      },
    ],
    [
      {
        table: "A",
        players: [1, 6, 11, 16],
        scores: null,
      },
      {
        table: "B",
        players: [3, 4, 7, 10],
        scores: null,
      },
      {
        table: "C",
        players: [8, 9, 12, 15],
        scores: null,
      },
      {
        table: "D",
        players: [2, 5, 13, 14],
        scores: null,
      },
    ],
  ],
};
