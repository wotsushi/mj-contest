import { calcPoints } from "../point";
import { useContest } from "../contest";
import { useParams, useSearchParams } from "react-router";
import { useMaster } from "../master";
import NormalTable from "./NormalTable";
import PairTable from "./PairTable";
import PairTable2 from "./PairTable2";

const Result: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [params] = useSearchParams();
  const { nameByID } = useMaster();
  const { contest } = useContest(id ?? "");
  if (nameByID === null || contest === null) return null;
  const pointsByID = new Map(
    contest.players.map((id) => [
      id,
      contest.results.map((result) => {
        const game = result.find(({ players }) => players.includes(id));
        if (game === undefined) return "";
        if (game.scores === null) return game.table;
        const points = calcPoints(game.scores, contest.rule);
        return points[game.players.indexOf(id)];
      }),
    ]),
  );
  if (contest.rule?.id === "pair") {
    if (params.has("subtotal")) {
      return (
        <PairTable2
          nameByID={nameByID}
          pairs={contest.rule.pairs}
          pointsByID={pointsByID}
        />
      );
    }
    return (
      <PairTable
        nameByID={nameByID}
        pairs={contest.rule.pairs}
        pointsByID={pointsByID}
      />
    );
  }
  return (
    <NormalTable
      nameByID={nameByID}
      players={contest.players}
      pointsByID={pointsByID}
    />
  );
};

export default Result;
