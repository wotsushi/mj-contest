import { Contest, Result } from "../contest";
import { calcPoints } from "../point";

const tableNames = ["A", "B", "C", "D", "E", "F", "G", "H"];

export const generateTables = (contest: Contest, round: number): Result[] => {
  const pointsByID = new Map(contest.players.map((id) => [id, 0]));
  for (let r = 0; r < round; r++) {
    for (const game of contest.results[r] ?? []) {
      if (game.scores === null) continue;
      const points = calcPoints(game.scores, contest.rule);
      game.players.forEach((pid, i) => {
        pointsByID.set(pid, (pointsByID.get(pid) ?? 0) + points[i]);
      });
    }
  }
  const sorted = contest.players
    .map((id, index) => ({ id, index }))
    .sort((a, b) => {
      const diff = (pointsByID.get(b.id) ?? 0) - (pointsByID.get(a.id) ?? 0);
      return diff !== 0 ? diff : a.index - b.index;
    });
  const numTables = Math.floor(sorted.length / 4);
  return Array.from({ length: numTables }, (_, i) => ({
    table: tableNames[i],
    players: sorted.slice(i * 4, i * 4 + 4).map((p) => p.id),
    scores: null,
  }));
};
