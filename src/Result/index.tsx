import { calcPoints } from "../point";
import { useContest } from "../contest";
import { useParams, useSearchParams } from "react-router";
import { useMaster } from "../master";
import { useEffect, useState } from "react";
import NormalTable from "./NormalTable";
import PairTable from "./PairTable";
import TeamTable from "./TeamTable";
import NextRoundTable from "./NextRoundTable";
import Diagram from "./Diagram";

type View = "diagram" | "standings" | "next_round";

const Result: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [params] = useSearchParams();
  const { nameByID } = useMaster();
  const { contest } = useContest(id ?? "");
  const [view, setView] = useState<View>("standings");
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setView((v) =>
          v === "diagram" ? "standings"
          : v === "standings" ? "next_round"
          : v,
        );
      }
      if (e.key === "ArrowLeft") {
        setView((v) =>
          v === "next_round" ? "standings"
          : v === "standings" ? "diagram"
          : v,
        );
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  if (nameByID === null || contest === null) return null;
  if (view === "next_round") {
    return <NextRoundTable nameByID={nameByID} contest={contest} />;
  }
  if (view === "diagram") {
    return <Diagram nameByID={nameByID} contest={contest} />;
  }
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
  if (params.has("individual")) {
    return (
      <NormalTable
        nameByID={nameByID}
        players={contest.players}
        pointsByID={pointsByID}
      />
    );
  }
  if (contest.rule?.id === "team") {
    return (
      <TeamTable
        nameByID={nameByID}
        teams={contest.rule.teams}
        pointsByID={pointsByID}
      />
    );
  }
  if (contest.rule?.id === "pair") {
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
