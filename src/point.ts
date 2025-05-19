import { Rule } from "./contest";

// https://m-league.jp/about/ の第6章 計算(収支および得点)の第2条 持ち点・順位点に準ずる
export const calcPoints = (scores: number[], rule: Rule) => {
  const kyotaku =
    totalInitialScore(scores.length) - scores.reduce((sum, s) => sum + s, 0);
  return scores.map((score, i) => {
    const rank = scores.filter((s) => s > score).length;
    const tie = scores.filter((s) => s === score).length;
    const tieIdx = scores.slice(0, i).filter((s) => s === score).length;
    const point = (score - returnScore) / 1000;
    const okaScore = rank === 0 ? (returnScore - initialScore) * 4 : 0;
    const umaScore =
      1000 * rule.uma.slice(rank, rank + tie).reduce((sum, u) => sum + u, 0);
    const rankPoint = distirbuteScore(okaScore + umaScore, tie)[tieIdx] / 1000;
    const kyotakuPoint =
      rank === 0 ?
        kyotaku % tie === 0 ?
          kyotaku / tie / 1000
        : (distirbuteScore(1000, tie)[tieIdx] * (kyotaku / 1000)) / 1000
      : 0;
    return point + rankPoint + kyotakuPoint;
  });
};

export const totalInitialScore = (n: number) => n * initialScore;
const distirbuteScore = (score: number, tie: number) => {
  const d = 100 * tie;
  const q = Math.trunc(score / d);
  const r = score % d;
  const a = Math.abs(r / 100);
  return Array.from(
    { length: tie },
    (_, i) => 100 * q + (i < a ? r / a : 0),
  ).sort((a, b) => b - a);
};

const initialScore = 25000;
const returnScore = 30000;
