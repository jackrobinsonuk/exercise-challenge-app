import { React } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function AddExerciseChallengeSelect(props) {
  return (
    <FormControl fullWidth>
      <InputLabel id="challenge-select-label">Challenge</InputLabel>
      <Select
        required
        id="challenge-select"
        labelId="challenge-select-label"
        value={props.selectedChallenge}
        label="Challenge"
        onChange={props.handleSelectedChallenge}
      >
        {props.challengeList.map(({ index, Key, ETag }) => (
          <MenuItem
            key={ETag}
            value={Key}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            {Key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
