import { Contest } from "../contest";

export const generateTable = (next: Contest) => {
  next.results = combinations.map((round) =>
    round.map((table, i) => ({
      table: tables[i],
      players: table.map((j) => next.players[j - 1]),
      scores: null,
    })),
  );
};

const tables = ["A", "B", "C", "D"];

const combinations = [
  [
    [1, 2, 7, 12],
    [4, 5, 8, 11],
    [9, 10, 13, 16],
    [3, 6, 14, 15],
  ],
  [
    [5, 6, 7, 9],
    [1, 3, 8, 13],
    [10, 11, 12, 14],
    [2, 4, 15, 16],
  ],
  [
    [7, 11, 13, 15],
    [2, 6, 8, 10],
    [1, 4, 9, 14],
    [3, 5, 12, 16],
  ],
  [
    [4, 6, 12, 13],
    [2, 3, 9, 11],
    [7, 8, 14, 16],
    [1, 5, 10, 15],
  ],
  [
    [1, 6, 11, 16],
    [3, 4, 7, 10],
    [8, 9, 12, 15],
    [2, 5, 13, 14],
  ],
];
