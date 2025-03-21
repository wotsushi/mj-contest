import { act, renderHook } from "@testing-library/react";
import { Contest, useContest } from ".";
import {
  expectSetDoc,
  expectUpdateDoc,
  mockOnSnapshot,
} from "../firebase/testing";
import { Doc } from "../firebase";

global.alert = jest.fn();

describe("useContest", () => {
  describe("saveContest", () => {
    type TestCase = [
      name: string,
      doc: Contest,
      mutate: (next: Contest) => void,
      expectedDoc: Contest,
      expectedSetDoc: Doc<Contest>,
    ];
    it.each<TestCase>([
      [
        "date",
        {
          date: "2025-03-21",
          players: [],
          results: [],
        },
        (next: Contest) => {
          next.date = "2025-03-22";
        },
        {
          date: "2025-03-22",
          players: [],
          results: [],
        },
        {
          date: "2025-03-22",
          players: {},
          results: {},
        },
      ],
      [
        "players",
        {
          date: "2025-03-21",
          players: [1, 2],
          results: [],
        },
        (next: Contest) => {
          next.players = [2, 3];
        },
        {
          date: "2025-03-21",
          players: [2, 3],
          results: [],
        },
        {
          date: "2025-03-21",
          players: { 0: 2, 1: 3 },
          results: {},
        },
      ],
      [
        "results",
        {
          date: "2025-03-21",
          players: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          results: [[{ table: "A", players: [1, 2, 3, 4], scores: null }], []],
        },
        (next: Contest) => {
          next.results[0].push({
            table: "B",
            players: [5, 6, 7, 8],
            scores: null,
          });
          next.results[0][0].players[3] = 9;
          next.results.push([]);
        },
        {
          date: "2025-03-21",
          players: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          results: [
            [
              { table: "A", players: [1, 2, 3, 9], scores: null },
              { table: "B", players: [5, 6, 7, 8], scores: null },
            ],
            [],
            [],
          ],
        },
        {
          date: "2025-03-21",
          players: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9 },
          results: {
            0: {
              0: {
                table: "A",
                players: { 0: 1, 1: 2, 2: 3, 3: 9 },
                scores: null,
              },
              1: {
                table: "B",
                players: { 0: 5, 1: 6, 2: 7, 3: 8 },
                scores: null,
              },
            },
            1: {},
            2: {},
          },
        },
      ],
    ])("%s", (_, doc, mutate, expectedDoc, expectedSetDoc) => {
      const sendSnapshot = mockOnSnapshot();
      const { result } = renderHook(() => useContest(""));
      act(() => {
        sendSnapshot.call(doc);
      });
      act(() => {
        result.current.mutateContest(mutate);
      });
      expect(result.current.contest).toEqual(expectedDoc);
      result.current.saveContest();
      expectSetDoc(expectedSetDoc);
    });
  });
  describe("saveScores", () => {
    type TestCase = [
      name: string,
      doc: Contest,
      mutate: (next: Contest) => void,
      round: number,
      table: number,
      expectedDoc: Contest,
      expectedUpdateScores: { [field: string]: Record<number, number> | null },
      expectedUpdatePlayers: { [field: string]: Record<number, number> },
    ];
    it.each<TestCase>([
      [
        "新規入力",
        {
          date: "2025-03-21",
          players: [1, 2, 3, 4],
          results: [[{ table: "A", players: [1, 2, 3, 4], scores: null }]],
        },
        (next: Contest) => {
          next.results[0][0].scores = [10000, 20000, 30000, 40000];
        },
        0,
        0,
        {
          date: "2025-03-21",
          players: [1, 2, 3, 4],
          results: [
            [
              {
                table: "A",
                players: [1, 2, 3, 4],
                scores: [10000, 20000, 30000, 40000],
              },
            ],
          ],
        },
        { "results.0.0.scores": { 0: 10000, 1: 20000, 2: 30000, 3: 40000 } },
        { "results.0.0.players": { 0: 1, 1: 2, 2: 3, 3: 4 } },
      ],
      [
        "編集",
        {
          date: "2025-03-21",
          players: [1, 2, 3, 4],
          results: [
            [],
            [
              { table: "A", players: [], scores: null },
              {
                table: "B",
                players: [1, 2, 3, 4],
                scores: [10000, 20000, 30000, 40000],
              },
            ],
          ],
        },
        (next: Contest) => {
          next.results[1][1].scores = [50000, 40000, 20000, -10000];
        },
        1,
        1,
        {
          date: "2025-03-21",
          players: [1, 2, 3, 4],
          results: [
            [],
            [
              { table: "A", players: [], scores: null },
              {
                table: "B",
                players: [1, 2, 3, 4],
                scores: [50000, 40000, 20000, -10000],
              },
            ],
          ],
        },
        { "results.1.1.scores": { 0: 50000, 1: 40000, 2: 20000, 3: -10000 } },
        { "results.1.1.players": { 0: 1, 1: 2, 2: 3, 3: 4 } },
      ],
      [
        "席順変更",
        {
          date: "2025-03-21",
          players: [1, 2, 3, 4],
          results: [[{ table: "A", players: [1, 2, 3, 4], scores: null }]],
        },
        (next: Contest) => {
          next.results[0][0].players = [4, 3, 2, 1];
        },
        0,
        0,
        {
          date: "2025-03-21",
          players: [1, 2, 3, 4],
          results: [[{ table: "A", players: [4, 3, 2, 1], scores: null }]],
        },
        { "results.0.0.scores": null },
        { "results.0.0.players": { 0: 4, 1: 3, 2: 2, 3: 1 } },
      ],
    ])(
      "%s",
      (
        _,
        doc,
        mutate,
        round,
        table,
        expectedDoc,
        expectedUpdateScores,
        expectedUpdatePlayers,
      ) => {
        const sendSnapshot = mockOnSnapshot();
        const { result } = renderHook(() => useContest(""));
        act(() => {
          sendSnapshot.call(doc);
        });
        act(() => {
          result.current.mutateContest(mutate);
        });
        expect(result.current.contest).toEqual(expectedDoc);
        result.current.saveScores(round, table);
        expectUpdateDoc(expectedUpdateScores, expectedUpdatePlayers);
      },
    );
  });
});
