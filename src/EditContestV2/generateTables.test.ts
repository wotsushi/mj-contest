import { Contest, Result } from "../contest";
import { generateTables } from "./generateTables";

const normalRule: Contest["rule"] = {
  id: "normal",
  uma: [10, 5, -5, -10],
};

describe("generateTables", () => {
  type TestCase = [
    name: string,
    contest: Contest,
    round: number,
    expected: Result[],
  ];
  it.each<TestCase>([
    [
      "round=0: 過去結果なしならplayers配列のindex順",
      {
        date: "2026-04-25",
        players: [10, 20, 30, 40, 50, 60, 70, 80],
        results: [],
        rule: normalRule,
      },
      0,
      [
        { table: "A", players: [10, 20, 30, 40], scores: null },
        { table: "B", players: [50, 60, 70, 80], scores: null },
      ],
    ],
    [
      "round=1: 前ラウンドの合計点降順、同点はindex昇順",
      {
        date: "2026-04-25",
        players: [10, 20, 30, 40, 50, 60, 70, 80],
        results: [
          [
            {
              table: "A",
              players: [10, 20, 30, 40],
              scores: [40000, 30000, 20000, 10000],
            },
            {
              table: "B",
              players: [50, 60, 70, 80],
              scores: [40000, 30000, 20000, 10000],
            },
          ],
        ],
        rule: normalRule,
      },
      1,
      [
        { table: "A", players: [10, 50, 20, 60], scores: null },
        { table: "B", players: [30, 70, 40, 80], scores: null },
      ],
    ],
    [
      "scoresがnullのラウンドは0点として扱う",
      {
        date: "2026-04-25",
        players: [10, 20, 30, 40],
        results: [
          [{ table: "A", players: [10, 20, 30, 40], scores: null }],
        ],
        rule: normalRule,
      },
      1,
      [{ table: "A", players: [10, 20, 30, 40], scores: null }],
    ],
    [
      "20人なら5卓に分割",
      {
        date: "2026-04-25",
        players: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        results: [],
        rule: normalRule,
      },
      0,
      [
        { table: "A", players: [1, 2, 3, 4], scores: null },
        { table: "B", players: [5, 6, 7, 8], scores: null },
        { table: "C", players: [9, 10, 11, 12], scores: null },
        { table: "D", players: [13, 14, 15, 16], scores: null },
        { table: "E", players: [17, 18, 19, 20], scores: null },
      ],
    ],
    [
      "round=2: 複数ラウンドの累計点で並べる",
      {
        date: "2026-04-25",
        players: [10, 20, 30, 40],
        results: [
          [
            {
              table: "A",
              players: [10, 20, 30, 40],
              scores: [40000, 30000, 20000, 10000],
            },
          ],
          [
            {
              table: "A",
              players: [40, 30, 20, 10],
              scores: [40000, 30000, 20000, 10000],
            },
          ],
        ],
        rule: normalRule,
      },
      2,
      [{ table: "A", players: [10, 40, 20, 30], scores: null }],
    ],
  ])("%s", (_name, contest, round, expected) => {
    expect(generateTables(contest, round)).toEqual(expected);
  });
});
