import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Rule } from "../contest";

type Props = {
  rule: Rule;
  setRule: (rule: Rule) => void;
  saveContest: () => void;
};

const EditRule: React.FC<Props> = ({ rule, setRule, saveContest }) => {
  return (
    <Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={rule.splitTie ?? true}
            onChange={(e) =>
              setRule({ ...rule, splitTie: e.target.checked })
            }
          />
        }
        label="同点時に折半する"
      />
      <Box sx={{ display: "flex", gap: 1 }}>
        {rule.uma.map((point, i) => (
          <TextField
            key={`${i}-${point}`}
            label={`${i + 1}位`}
            type="number"
            defaultValue={point}
            onBlur={(e) =>
              setRule({
                ...rule,
                uma: rule.uma.map((p, j) =>
                  j === i ? Number(e.target.value) : p,
                ) as Rule["uma"],
              })
            }
          />
        ))}
      </Box>
      <Button variant="contained" onClick={() => saveContest()}>
        保存
      </Button>
    </Box>
  );
};

export default EditRule;
