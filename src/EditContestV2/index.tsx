import { AppBar, Tabs, Tab, Box } from "@mui/material";
import { useParams } from "react-router";
import { useContest } from "../contest";
import { useMaster } from "../master";
import { useState } from "react";
import EditTable from "./EditTables";
import EditRule from "./EditRule";
import EditPlayers from "./EditPlayers";

const EditContestV2 = () => {
  const { id } = useParams<{ id: string }>();
  const { contest, mutateContest: mutate, saveContest } = useContest(id ?? "");
  const { nameByID } = useMaster();
  const [value, setValue] = useState(0);

  if (id === undefined || contest === null || nameByID === null) return null;
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab label="卓" />
          <Tab label="参加者" />
          <Tab label="ルール" />
        </Tabs>
      </AppBar>

      <Box p={2}>
        {value === 0 && (
          <EditTable
            nameByID={nameByID}
            contest={contest}
            mutateContest={mutate}
            saveContest={saveContest}
          />
        )}
        {value === 1 && (
          <EditPlayers
            nameByID={nameByID}
            contest={contest}
            mutateContest={mutate}
            saveContest={saveContest}
          />
        )}
        {value === 2 && (
          <EditRule
            rule={contest.rule}
            setRule={(rule) => mutate((next) => (next.rule = rule))}
            saveContest={saveContest}
          />
        )}
      </Box>
    </Box>
  );
};

export default EditContestV2;
