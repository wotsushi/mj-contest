import { doc, DocumentReference, onSnapshot, setDoc } from "firebase/firestore";
import { useDoc } from ".";
import { act, renderHook } from "@testing-library/react";

jest.mock("firebase/app");
jest.mock("firebase/firestore");
const mockOnSnapshot = jest.mocked(onSnapshot);
const snapshot = (data: unknown) =>
  ((_: unknown, onNext: (_d: unknown) => void) =>
    onNext({
      exists: () => true,
      data: () => data,
    })) as typeof onSnapshot;
const mockSetDoc = jest.mocked(setDoc);
jest.mocked(doc).mockReturnValue({} as DocumentReference);

beforeEach(() => {
  mockOnSnapshot.mockReset();
  mockSetDoc.mockReset();
});

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
      mockOnSnapshot.mockImplementation(snapshot(doc));
      const {
        result: {
          current: { state: actual },
        },
      } = renderHook(() => useDoc(""));
      expect(actual).toEqual(expected);
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
      const result = renderHook(() => useDoc("")).result;
      act(() => result.current.setter(data));
      result.current.put();
      expect(mockSetDoc).toHaveBeenLastCalledWith(expect.anything(), expected);
    });
  });
});
