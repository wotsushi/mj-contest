import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import Form from ".";
import { expectUpdateDoc, mockOnSnapshot } from "../firebase/testing";
import { Doc } from "../firebase";
import { Contest } from "../contest";

global.alert = jest.fn();

describe("<Form />", () => {
  it("回戦選択", async () => {
    renderForm();
    const roundSelector = screen.getByRole("combobox", { name: "round" });
    expect(
      Array.from(roundSelector.querySelectorAll("option")).map(
        ({ textContent }) => textContent,
      ),
    ).toEqual(["第1回戦", "第2回戦"]);
    await userEvent.selectOptions(
      roundSelector,
      screen.getByRole("option", { name: "第2回戦" }),
    );
    expect(getHeader()).toEqual([
      "player 1",
      "player 2",
      "player 5",
      "player 6",
    ]);
  });
  it("卓選択", async () => {
    renderForm();
    const tableSelector = screen.getByRole("combobox", { name: "table" });
    expect(
      Array.from(tableSelector.querySelectorAll("option")).map(
        ({ textContent }) => textContent,
      ),
    ).toEqual(["A", "B"]);
    await userEvent.selectOptions(
      tableSelector,
      screen.getByRole("option", { name: "B" }),
    );
    expect(getHeader()).toEqual([
      "player 5",
      "player 6",
      "player 7",
      "player 8",
    ]);
  });
  it("東1局の自風変更", async () => {
    renderForm((contest) => {
      contest.results[0][0].scores = [40000, 30000, 20000, 10000];
    });
    const windSelectors = screen.getAllByRole("combobox", { name: "wind" });
    expect(
      Array.from(windSelectors[0].querySelectorAll("option")).map(
        ({ textContent }) => textContent,
      ),
    ).toEqual(["東", "南", "西", "北"]);
    await userEvent.selectOptions(
      windSelectors[0],
      within(windSelectors[0]).getByRole("option", { name: "南" }),
    );
    expect(getHeader()).toEqual([
      "player 2",
      "player 1",
      "player 3",
      "player 4",
    ]);
    expect(getScores()).toEqual(["30000", "40000", "20000", "10000"]);
    await userEvent.click(screen.getByRole("button", { name: "保存" }));
    expectUpdateDoc({
      "results.0.0.scores": { 0: 30000, 1: 40000, 2: 20000, 3: 10000 },
    });
    expectUpdateDoc({ "results.0.0.players": { 0: 2, 1: 1, 2: 3, 3: 4 } });
  });
  it("持ち点入力", async () => {
    renderForm();
    expect(
      screen
        .getAllByRole<HTMLInputElement>("spinbutton")
        .map(({ placeholder }) => placeholder),
    ).toEqual(["持ち点", "持ち点", "持ち点", "持ち点"]);
    await typeScores([60000, 30000, 20000, -10000]);
    expect(getPoints()).toEqual(["60.0", "5.0", "-15.0", "-50.0"]);
    await userEvent.click(screen.getByRole("button", { name: "保存" }));
    expectUpdateDoc(
      { "results.0.0.scores": { 0: 60000, 1: 30000, 2: 20000, 3: -10000 } },
      { "results.0.0.players": { 0: 1, 1: 2, 2: 3, 3: 4 } },
    );
  });
  it("持ち点変更", async () => {
    renderForm((contest) => {
      contest.results[1][1].scores = [40000, 30000, 20000, 10000];
    });
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "round" }),
      screen.getByRole("option", { name: "第2回戦" }),
    );
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "table" }),
      screen.getByRole("option", { name: "B" }),
    );
    expect(getScores()).toEqual(["40000", "30000", "20000", "10000"]);
    const scoreInputs = screen.getAllByRole<HTMLInputElement>("spinbutton");
    await userEvent.clear(scoreInputs[0]);
    await userEvent.type(scoreInputs[0], "39900");
    await userEvent.clear(scoreInputs[1]);
    await userEvent.type(scoreInputs[1], "30100");
    await userEvent.tab();
    expect(getPoints()).toEqual(["39.9", "5.1", "-15.0", "-30.0"]);
    await userEvent.click(screen.getByRole("button", { name: "保存" }));
    expectUpdateDoc(
      { "results.1.1.scores": { 0: 39900, 1: 30100, 2: 20000, 3: 10000 } },
      { "results.1.1.players": { 0: 3, 1: 4, 2: 7, 3: 8 } },
    );
  });
  it("持ち点バリデーション", async () => {
    renderForm();
    await typeScores([40000, 30000, 20000, 9900]);
    expect(
      screen.getByText("持ち点の合計が 99,900 です", { exact: false }),
    ).toBeInTheDocument();
  });
  it("入力中に他卓の更新", async () => {
    const [contest, sendSnapshot] = renderForm();
    await typeScores([40000, 30000, 20000, 10000]);
    const updatedContest = structuredClone(contest);
    updatedContest.results[0][1].scores = [35000, 30000, 20000, 15000];
    act(() => sendSnapshot["hoge"](updatedContest));
    expect(getScores()).toEqual(["40000", "30000", "20000", "10000"]);
    await userEvent.click(screen.getByRole("button", { name: "保存" }));
    expectUpdateDoc(
      { "results.0.0.scores": { 0: 40000, 1: 30000, 2: 20000, 3: 10000 } },
      { "results.0.0.players": { 0: 1, 1: 2, 2: 3, 3: 4 } },
    );
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "table" }),
      screen.getByRole("option", { name: "B" }),
    );
    expect(getScores()).toEqual(["35000", "30000", "20000", "15000"]);
  });
});

const renderForm = (mutate?: (contest: Doc<Contest>) => void) => {
  const initContest = structuredClone(contest);
  mutate?.(initContest);
  const sendSnapshot = mockOnSnapshot();
  render(
    <MemoryRouter initialEntries={["/form/hoge"]}>
      <Routes>
        <Route path="/form/:id" element={<Form />} />
      </Routes>
    </MemoryRouter>,
  );
  act(() => {
    sendSnapshot["master"]({
      players,
      rules: [],
    });
  });
  act(() => sendSnapshot["hoge"](initContest));
  return [initContest, sendSnapshot] as const;
};

const typeScores = async (scores: [number, number, number, number]) => {
  const scoreInputs = screen.getAllByRole<HTMLInputElement>("spinbutton");
  for (let i = 0; i < scores.length; i++) {
    await userEvent.type(scoreInputs[i], scores[i].toString());
  }
  await userEvent.tab();
};

const getHeader = () =>
  screen.getAllByRole("columnheader").map((header) => header.textContent);

const getScores = () =>
  screen.getAllByRole<HTMLInputElement>("spinbutton").map(({ value }) => value);

const getPoints = () =>
  within(screen.getAllByRole("row").at(-1)!)
    .getAllByRole("cell")
    .map(({ textContent }) => textContent);

const players = [
  { id: 1, name: "player 1" },
  { id: 2, name: "player 2" },
  { id: 3, name: "player 3" },
  { id: 4, name: "player 4" },
  { id: 5, name: "player 5" },
  { id: 6, name: "player 6" },
  { id: 7, name: "player 7" },
  { id: 8, name: "player 8" },
];

const contest: Contest = {
  date: "2025-03-21",
  players: [1, 2, 3, 4, 5, 6, 7, 8],
  results: [
    [
      {
        table: "A",
        players: [1, 2, 3, 4],
        scores: null,
      },
      {
        table: "B",
        players: [5, 6, 7, 8],
        scores: null,
      },
    ],
    [
      {
        table: "A",
        players: [1, 2, 5, 6],
        scores: null,
      },
      {
        table: "B",
        players: [3, 4, 7, 8],
        scores: null,
      },
    ],
  ],
};
