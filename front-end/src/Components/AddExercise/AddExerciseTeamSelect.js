import { React } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function AddExerciseTeamSelect(props) {
  var teamList = props.teamList;

  return (
    <FormControl fullWidth>
      <InputLabel id="team-select-label">Team</InputLabel>
      <Select
        required
        id="team-select"
        labelId="team-select-label"
        value={props.selectedTeam}
        label="Team"
        onChange={props.handleSelectedTeamChange}
      >
        {teamList.map(({ index, teamId, teamName }) => (
          <MenuItem
            key={teamId}
            value={teamId}
            label="Team"
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            {teamName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
