import { useParams } from "react-router";
import { useContest } from "../contest";
import { useMaster } from "../master";
import { generateTable } from "./table";
import EditTable from "./EditTable";
import CopyContest from "./CopyContest";
import EditDate from "./EditDate";
import EditRule from "./EditRule";
import EditPlayers from "./EditPlayers";
import EditUma from "./EditUma";

const EditContest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { contest, mutateContest: mutate, saveContest } = useContest(id ?? "");
  const { nameByID } = useMaster();
  if (id === undefined || contest === null || nameByID === null) return null;
  return (
    <div>
      <EditDate
        date={contest.date}
        setDate={(date) => mutate((next) => (next.date = date))}
      />
      <EditUma
        uma={contest.rule.uma}
        setUma={(uma) => mutate((next) => (next.rule.uma = uma))}
      />
      <EditRule
        rule={contest.rule}
        setRule={(rule) => mutate((next) => (next.rule = rule))}
      />
      <EditPlayers
        nameByID={nameByID}
        players={contest.players}
        setPlayers={(players) =>
          mutate((next) => {
            next.players = players;
          })
        }
        rule={contest.rule}
        setRule={(rule) => mutate((next) => (next.rule = rule))}
      />
      {contest.results.map((results, i) => (
        <div key={i}>
          <div>{i + 1}回戦</div>
          {results.map((result, j) => (
            <EditTable
              key={j}
              nameByID={nameByID}
              result={result}
              setResult={(contest) => {
                mutate((next) => {
                  next.results[i][j] = contest;
                });
              }}
            />
          ))}
          <button
            type="button"
            onClick={() =>
              mutate((next) =>
                next.results[i].push({
                  table: "",
                  players: [0, 0, 0, 0],
                  scores: null,
                }),
              )
            }
          >
            卓追加
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => mutate((next) => next.results.push([]))}
      >
        追加
      </button>
      <button type="button" onClick={() => mutate(generateTable)}>
        卓生成
      </button>
      <button type="button" onClick={() => saveContest()}>
        保存
      </button>
      <CopyContest srcID={id} />
    </div>
  );
};

export default EditContest;
