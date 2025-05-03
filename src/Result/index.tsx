import { calcPoints } from "../point";
import { useContest } from "../contest";
import { useParams } from "react-router";
import { useMaster } from "../master";
import NormalTable from "./NormalTable";

const Result: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
        const points = calcPoints(game.scores);
        return points[game.players.indexOf(id)];
      }),
    ]),
  );
  return (
    <NormalTable
      nameByID={nameByID}
      players={contest.players}
      pointsByID={pointsByID}
    />
  );
};

export default Result;
