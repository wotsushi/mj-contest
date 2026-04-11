import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Contest } from "../contest";
import { useState } from "react";
import SelectBox from "./SelectBox";
import { generateTables } from "./generateTables";

type Props = {
  nameByID: Map<number, string>;
  contest: Contest;
  mutateContest: (mutate: (next: Contest) => void) => void;
  saveContest: () => void;
};

const EditTables: React.FC<Props> = ({
  contest,
  nameByID,
  mutateContest,
  saveContest,
}) => {
  const [round, setRound] = useState(0);
  const players = Array.from(nameByID).map(([value, label]) => ({
    value,
    label,
  }));
  return (
    <Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
      <SelectBox
        id="round"
        label="ラウンド"
        items={contest.results.map((_, i) => ({
          value: i,
          label: `${i + 1}回戦`,
        }))}
        value={round}
        onChange={(value) => setRound(value)}
      />
      <Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
        {contest.results[round].map((result, i) => (
          <Card key={i} variant="outlined">
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  label="卓"
                  variant="standard"
                  value={result.table}
                  onChange={(e) =>
                    mutateContest((next) => {
                      next.results[round][i].table = e.target.value;
                    })
                  }
                />
                <IconButton
                  aria-label="削除"
                  onClick={() =>
                    mutateContest((next) => {
                      next.results[round].splice(i, 1);
                    })
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
                {result.players.map((player, j) => (
                  <SelectBox
                    key={j}
                    id={`player-${j}`}
                    items={players}
                    value={player}
                    onChange={(value) =>
                      mutateContest((next) => {
                        next.results[round][i].players[j] = value;
                      })
                    }
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
        <Button
          variant="outlined"
          onClick={() =>
            mutateContest((next) => {
              next.results[round] = generateTables(next, round);
            })
          }
        >
          卓自動生成
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            mutateContest((next) => {
              next.results[round].push({
                table: "",
                players: [0, 0, 0, 0],
                scores: null,
              });
            })
          }
        >
          卓追加
        </Button>
      </Box>
      <Button variant="contained" onClick={() => saveContest()}>
        保存
      </Button>
    </Box>
  );
};

export default EditTables;
