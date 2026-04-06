import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Contest } from "../contest";
import { useState } from "react";

type Props = {
  nameByID: Map<number, string>;
  contest: Contest;
  mutateContest: (mutate: (next: Contest) => void) => void;
};

const EditTables: React.FC<Props> = ({ contest }) => {
  const [round, setRound] = useState(0);
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="round">ラウンド</InputLabel>
        <Select
          labelId="round"
          id="round"
          value={round}
          label="ラウンド"
          onChange={(e) => setRound(Number(e.target.value))}
        >
          {contest.results.map((_, i) => (
            <MenuItem key={i} value={i}>
              {i + 1}回戦
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* {contest.results[round].map((result) => {
        {
          result.table;
        }
      })} */}
    </Box>
  );
};

export default EditTables;
