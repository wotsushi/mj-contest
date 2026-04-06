import { AppBar, Tabs, Tab, Box } from "@mui/material";
import { useParams } from "react-router";
import { useContest } from "../contest";
import { useMaster } from "../master";
import { useState } from "react";
import EditTable from ".//EditTables";

const EditContestV2 = () => {
  const { id } = useParams<{ id: string }>();
  const { contest, mutateContest: mutate } = useContest(id ?? "");
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
          />
        )}
        {value === 1 && <div>参加者一覧</div>}
        {value === 2 && <div>ルール設定</div>}
      </Box>
    </Box>
  );
};

export default EditContestV2;
