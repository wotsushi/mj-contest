import { useParams } from "react-router";
import { saveContest, useContest } from "../contest";

const EditContest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { contest, mutateContest: mutate } = useContest(id ?? "");
  if (id === undefined || contest === null) return null;
  return (
    <div>
      {contest.results.map((results, i) => (
        <div key={i}>
          <div>{i + 1}回戦</div>
          {results.map((result, j) => (
            <div key={j}>
              <div>
                <input
                  type="text"
                  value={result.table}
                  size={10}
                  onChange={(e) =>
                    mutate((next) => {
                      next.results[i][j].table = e.target.value;
                    })
                  }
                />
              </div>
              <div>
                {result.players.map((player, k) => (
                  <input
                    key={k}
                    min={0}
                    max={100}
                    type="number"
                    value={player}
                    onChange={(e) =>
                      mutate((next) => {
                        next.results[i][j].players[k] = parseInt(
                          e.target.value,
                        );
                      })
                    }
                  />
                ))}
              </div>
            </div>
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
      <button type="button" onClick={() => saveContest(id, contest)}>
        保存
      </button>
    </div>
  );
};

export default EditContest;
