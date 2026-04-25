import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
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
      <Button variant="contained" onClick={() => saveContest()}>
        保存
      </Button>
    </Box>
  );
};

export default EditRule;
