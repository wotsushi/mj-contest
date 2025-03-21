import { useDoc } from ".";
import { act, renderHook } from "@testing-library/react";
import { expectSetDoc, expectUpdateDoc, mockOnSnapshot } from "./testing";

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("useDoc", () => {
  describe("initial state", () => {
    type TestCase = [doc: any, expected: any];
    it.each<TestCase>([
      [null, null],
      [undefined, undefined],
      [42, 42],
      ["subaru", "subaru"],
      [true, true],
      [{ 0: 1000, 1: 2000, 2: 3900, 3: 7700 }, [1000, 2000, 3900, 7700]],
      [{ 0: 1000, 1: 2000, 2: 3900, 3: 7700 }, [1000, 2000, 3900, 7700]],
      [
        { id: 42, score: 40000 },
        { id: 42, score: 40000 },
      ],
      [
        { name: "a", scores: { 0: 10000, 1: 20000, 2: 30000, 3: 40000 } },
        { name: "a", scores: [10000, 20000, 30000, 40000] },
      ],
    ])(`doc=%p expected=%p`, (doc, expected) => {
      const sendSnapshot = mockOnSnapshot();
      const { result } = renderHook(() => useDoc(""));
      act(() => sendSnapshot.call(doc));
      expect(result.current.state).toEqual(expected);
    });
  });
  describe("put", () => {
    type TestCase = [data: any, expected: any];
    it.each<TestCase>([
      [null, null],
      [undefined, undefined],
      [42, 42],
      ["subaru", "subaru"],
      [true, true],
      [[1000, 2000, 3900, 7700], { 0: 1000, 1: 2000, 2: 3900, 3: 7700 }],
      [
        { id: 42, score: 40000 },
        { id: 42, score: 40000 },
      ],
      [
        { name: "a", scores: [10000, 20000, 30000, 40000] },
        { name: "a", scores: { 0: 10000, 1: 20000, 2: 30000, 3: 40000 } },
      ],
    ])(`data=%p expected=%p`, (data, expected) => {
      const { result } = renderHook(() => useDoc(""));
      act(() => result.current.setter(data));
      result.current.put();
      expectSetDoc(expected);
    });
  });
  describe("update", () => {
    type TestCase = [
      doc: any,
      keys: (string | number)[],
      expected: { [field: string]: any },
    ];
    it.each<TestCase>([
      [[1000, 2000, 3900, 7700], [2], { 2: 3900 }],
      [{ id: 42, score: 40000 }, ["score"], { score: 40000 }],
      [
        { name: "a", scores: [10000, 20000, 30000, 40000] },
        ["scores", 0],
        { "scores.0": 10000 },
      ],
    ])(`doc=%p keys=%p expected=%p`, (doc, keys, expected) => {
      const sendSnapshot = mockOnSnapshot();
      const { result } = renderHook(() => useDoc(""));
      act(() => sendSnapshot.call(doc));
      result.current.update(...keys);
      expectUpdateDoc(expected);
    });
  });
});
