import { render, screen, within } from "@testing-library/react";
import { mockOnSnapshot } from "../firebase/testing";
import Result from ".";
import { act } from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import { Contest } from "../contest";
import { Doc } from "../firebase";

describe("<Result />", () => {
  type Scores = Tuple<number, 4> | null;
  type Tables = Tuple<Scores, 2>;
  type Results = Tuple<Tables, 2>;
  type Table = Tuple<
    [rank: string, name: string, total: string, round1: string, round2: string],
    8
  >;
  type SavedScore = [round: 0 | 1, table: 0 | 1, scores: Tuple<number, 4>];
  type TestCase = [
    name: string,
    scores: Results,
    expectedBefore: Table,
    ...(
      | [savedScore: null, expectedAfter: null]
      | [savedScore: SavedScore, expectedAfter: Table]
    ),
  ];
  it.each<TestCase>([
    [
      "開始",
      [
        [null, null],
        [null, null],
      ],
      [
        ["1", "player 1", "0.0", "A", "A"],
        ["1", "player 2", "0.0", "A", "A"],
        ["1", "player 3", "0.0", "A", "B"],
        ["1", "player 4", "0.0", "A", "B"],
        ["1", "player 5", "0.0", "B", "A"],
        ["1", "player 6", "0.0", "B", "A"],
        ["1", "player 7", "0.0", "B", "B"],
        ["1", "player 8", "0.0", "B", "B"],
      ],
      null,
      null,
    ],
    [
      "途中",
      [
        [
          [40000, 30000, 20000, 10000],
          [40000, 30000, 20100, 9900],
        ],
        [[40000, 30000, 20000, 10000], null],
      ],
      [
        ["1", "player 1", "80.0", "40.0", "40.0"],
        ["2", "player 5", "25.0", "40.0", "-15.0"],
        ["3", "player 2", "10.0", "5.0", "5.0"],
        ["4", "player 7", "-14.9", "-14.9", "B"],
        ["5", "player 3", "-15.0", "-15.0", "B"],
        ["6", "player 6", "-25.0", "5.0", "-30.0"],
        ["7", "player 4", "-30.0", "-30.0", "B"],
        ["8", "player 8", "-30.1", "-30.1", "B"],
      ],
      null,
      null,
    ],
    [
      "終了",
      [
        [
          [40000, 30000, 20000, 10000],
          [40000, 30000, 20000, 10000],
        ],
        [
          [40000, 30000, 21000, 9000],
          [40000, 30000, 20000, 10000],
        ],
      ],
      [
        ["1", "player 1", "80.0", "40.0", "40.0"],
        ["2", "player 5", "26.0", "40.0", "-14.0"],
        ["3", "player 3", "25.0", "-15.0", "40.0"],
        ["4", "player 2", "10.0", "5.0", "5.0"],
        ["5", "player 4", "-25.0", "-30.0", "5.0"],
        ["6", "player 6", "-26.0", "5.0", "-31.0"],
        ["7", "player 7", "-30.0", "-15.0", "-15.0"],
        ["8", "player 8", "-60.0", "-30.0", "-30.0"],
      ],
      null,
      null,
    ],
    [
      "同率",
      [
        [
          [40000, 30000, 20000, 10000],
          [40000, 30000, 20000, 10000],
        ],
        [
          [40000, 30000, 20000, 10000],
          [40000, 30000, 20000, 10000],
        ],
      ],
      [
        ["1", "player 1", "80.0", "40.0", "40.0"],
        ["2", "player 3", "25.0", "-15.0", "40.0"],
        ["2", "player 5", "25.0", "40.0", "-15.0"],
        ["4", "player 2", "10.0", "5.0", "5.0"],
        ["5", "player 4", "-25.0", "-30.0", "5.0"],
        ["5", "player 6", "-25.0", "5.0", "-30.0"],
        ["7", "player 7", "-30.0", "-15.0", "-15.0"],
        ["8", "player 8", "-60.0", "-30.0", "-30.0"],
      ],
      null,
      null,
    ],
    [
      "入力",
      [
        [null, null],
        [null, null],
      ],
      [
        ["1", "player 1", "0.0", "A", "A"],
        ["1", "player 2", "0.0", "A", "A"],
        ["1", "player 3", "0.0", "A", "B"],
        ["1", "player 4", "0.0", "A", "B"],
        ["1", "player 5", "0.0", "B", "A"],
        ["1", "player 6", "0.0", "B", "A"],
        ["1", "player 7", "0.0", "B", "B"],
        ["1", "player 8", "0.0", "B", "B"],
      ],
      [0, 0, [40000, 30000, 20000, 10000]],
      [
        ["1", "player 1", "40.0", "40.0", "A"],
        ["2", "player 2", "5.0", "5.0", "A"],
        ["3", "player 5", "0.0", "B", "A"],
        ["3", "player 6", "0.0", "B", "A"],
        ["3", "player 7", "0.0", "B", "B"],
        ["3", "player 8", "0.0", "B", "B"],
        ["7", "player 3", "-15.0", "-15.0", "B"],
        ["8", "player 4", "-30.0", "-30.0", "B"],
      ],
    ],
    [
      "更新",
      [
        [[40000, 30000, 20000, 10000], null],
        [null, null],
      ],
      [
        ["1", "player 1", "40.0", "40.0", "A"],
        ["2", "player 2", "5.0", "5.0", "A"],
        ["3", "player 5", "0.0", "B", "A"],
        ["3", "player 6", "0.0", "B", "A"],
        ["3", "player 7", "0.0", "B", "B"],
        ["3", "player 8", "0.0", "B", "B"],
        ["7", "player 3", "-15.0", "-15.0", "B"],
        ["8", "player 4", "-30.0", "-30.0", "B"],
      ],
      [0, 0, [45000, 25000, 20000, 10000]],
      [
        ["1", "player 1", "45.0", "45.0", "A"],
        ["2", "player 2", "0.0", "0.0", "A"],
        ["2", "player 5", "0.0", "B", "A"],
        ["2", "player 6", "0.0", "B", "A"],
        ["2", "player 7", "0.0", "B", "B"],
        ["2", "player 8", "0.0", "B", "B"],
        ["7", "player 3", "-15.0", "-15.0", "B"],
        ["8", "player 4", "-30.0", "-30.0", "B"],
      ],
    ],
  ])(`%s`, (_, scores, expectedBefore, savedScore, expectedAfter) => {
    const contestBefore = structuredClone(contest);
    scores.forEach((result, i) =>
      result.forEach((table, j) => {
        contestBefore.results[i][j].scores = table;
      }),
    );
    const sendSnapshot = mockOnSnapshot();
    render(
      <MemoryRouter initialEntries={["/result/hoge"]}>
        <Routes>
          <Route path="/result/:id" element={<Result />} />
        </Routes>
      </MemoryRouter>,
    );
    act(() => {
      sendSnapshot["master"]({
        players,
        rules: [],
      });
    });
    act(() => sendSnapshot["hoge"](contestBefore));
    expect(getTable()).toEqual([
      ["順位", "名前", "合計", "1回戦", "2回戦"],
      ...expectedBefore,
    ]);
    if (savedScore === null) return;
    act(() => {
      const contestAfter = structuredClone(contestBefore);
      const [round, table, newScores] = savedScore;
      contestAfter.results[round][table].scores = newScores;
      sendSnapshot["hoge"](contestAfter);
    });
    expect(getTable()).toEqual([
      ["順位", "名前", "合計", "1回戦", "2回戦"],
      ...expectedAfter,
    ]);
  });
});

const players = {
  0: { id: 1, name: "player 1" },
  1: { id: 2, name: "player 2" },
  2: { id: 3, name: "player 3" },
  3: { id: 4, name: "player 4" },
  4: { id: 5, name: "player 5" },
  5: { id: 6, name: "player 6" },
  6: { id: 7, name: "player 7" },
  7: { id: 8, name: "player 8" },
};

const contest: Doc<Contest> = {
  date: "2025-03-21",
  players: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8 },
  results: {
    0: {
      0: {
        table: "A",
        players: { 0: 1, 1: 2, 2: 3, 3: 4 },
        scores: null,
      },
      1: {
        table: "B",
        players: { 0: 5, 1: 6, 2: 7, 3: 8 },
        scores: null,
      },
    },
    1: {
      0: {
        table: "A",
        players: { 0: 1, 1: 2, 2: 5, 3: 6 },
        scores: null,
      },
      1: {
        table: "B",
        players: { 0: 3, 1: 4, 2: 7, 3: 8 },
        scores: null,
      },
    },
  },
};

type Tuple<T, N extends number, R extends T[] = []> =
  R["length"] extends N ? R : Tuple<T, N, [T, ...R]>;

const getTable = () => {
  return [
    screen.getAllByRole("columnheader").map((header) => header.textContent),
    ...screen
      .getAllByRole("row")
      .slice(1)
      .map((row) =>
        within(row)
          .getAllByRole("cell")
          .map((cell) => cell.textContent),
      ),
  ];
};
