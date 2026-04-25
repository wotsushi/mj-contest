import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Contest } from "../contest";
import SelectBox from "./SelectBox";

type Props = {
  nameByID: Map<number, string>;
  contest: Contest;
  mutateContest: (mutate: (next: Contest) => void) => void;
  saveContest: () => void;
};

const EditPlayers: React.FC<Props> = ({
  nameByID,
  contest,
  mutateContest,
  saveContest,
}) => {
  const items = Array.from(nameByID).map(([value, label]) => ({
    value,
    label,
  }));
  const defaultPlayerId =
    items.find((item) => !contest.players.includes(item.value))?.value ?? 0;
  return (
    <Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
      <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
        {contest.players.map((player, i) => (
          <Box
            key={i}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <SelectBox
                id={`player-${i}`}
                items={items.filter(
                  (item) =>
                    item.value === player ||
                    !contest.players.includes(item.value),
                )}
                value={player}
                onChange={(value) =>
                  mutateContest((next) => {
                    next.players[i] = value;
                  })
                }
              />
            </Box>
            <IconButton
              aria-label="削除"
              onClick={() =>
                mutateContest((next) => {
                  next.players.splice(i, 1);
                })
              }
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Button
        variant="outlined"
        onClick={() =>
          mutateContest((next) => {
            next.players.push(defaultPlayerId);
          })
        }
      >
        参加者追加
      </Button>
      <Button variant="contained" onClick={() => saveContest()}>
        保存
      </Button>
    </Box>
  );
};

export default EditPlayers;
