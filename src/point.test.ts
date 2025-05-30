import { Rule } from "./contest";
import { calcPoints } from "./point";

describe("calcPoints", () => {
  type TestCase = [scores: number[], uma: Rule["uma"], expected: number[]];
  it.each<TestCase>([
    [
      [40000, 30000, 20000, 10000],
      [10, 5, -5, -10],
      [40, 5, -15, -30],
    ],
    [
      [40400, 29600, 20500, 9500],
      [10, 5, -5, -10],
      [40.4, 4.6, -14.5, -30.5],
    ],
    [
      [100000, 10000, 0, -10000],
      [10, 5, -5, -10],
      [100, -15, -35, -50],
    ],
    [
      [25000, 25000, 25000, 25000],
      [10, 5, -5, -10],
      [0, 0, 0, 0],
    ],
    [
      [30000, 30000, 20000, 20000],
      [10, 5, -5, -10],
      [17.5, 17.5, -17.5, -17.5],
    ],
    [
      [30000, 30000, 30000, 10000],
      [10, 5, -5, -10],
      [10, 10, 10, -30],
    ],
    [
      [20000, 40000, 20000, 20000],
      [10, 5, -5, -10],
      [-13.3, 40, -13.3, -13.4],
    ],
    [
      [9000, 20000, 30000, 40000],
      [10, 5, -5, -10],
      [-31, -15, 5, 41],
    ],
    [
      [0, 19000, 40000, 40000],
      [10, 5, -5, -10],
      [-40, -16, 28, 28],
    ],
    [
      [30000, 30000, 9000, 30000],
      [10, 5, -5, -10],
      [10.4, 10.3, -31, 10.3],
    ],
    [
      [30000, 30000, 8000, 30000],
      [10, 5, -5, -10],
      [10.8, 10.6, -32, 10.6],
    ],
    [
      [30000, 30000, 7000, 30000],
      [10, 5, -5, -10],
      [11, 11, -33, 11],
    ],
    [
      [24000, 24000, 24000, 24000],
      [10, 5, -5, -10],
      [0, 0, 0, 0],
    ],
    [
      [48000, 32000, 15000, 5000],
      [30, 10, -10, -30],
      [68, 12, -25, -55],
    ],
    [
      [30000, 30000, 20000, 20000],
      [30, 10, -10, -30],
      [30, 30, -30, -30],
    ],
    [
      [10000, 30000, 30000, 30000],
      [30, 10, -10, -30],
      [-50, 16.7, 16.7, 16.6],
    ],
    [
      [20000, 20000, 20000, 40000],
      [30, 10, -10, -30],
      [-20, -20, -20, 60],
    ],
    [
      [25000, 25000, 25000, 25000],
      [30, 10, -10, -30],
      [0, 0, 0, 0],
    ],
  ])(`scores=%p uma=%p expected=%p`, (scores, uma, expected) => {
    expect(calcPoints(scores, { id: "normal", uma })).toEqual(expected);
  });
});
