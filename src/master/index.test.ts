import { act, renderHook } from "@testing-library/react";
import { useMaster } from ".";
import { mockOnSnapshot } from "../firebase/testing";

describe("useMaster", () => {
  describe("nameByID", () => {
    type TestCase = [id: number, name: string][];
    it.each<TestCase>([
      [
        [1, "subaru"],
        [42, ""],
      ],
      [
        [1, "subaru"],
        [42, "subaru"],
      ],
      [],
    ])(`players=%p`, (...players) => {
      const sendSnapshot = mockOnSnapshot();
      const { result } = renderHook(() => useMaster());
      act(() =>
        sendSnapshot["master"]({
          players: Object.fromEntries(
            players.map(([id, name], i) => [
              i,
              {
                id,
                name,
              },
            ]),
          ),
          rules: [],
        }),
      );
      expect(result.current.nameByID).toEqual(new Map(players));
    });
  });
});
