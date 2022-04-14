import { React } from "react";
import { TextField, InputAdornment, FormControl } from "@mui/material";

export default function AddExerciseMinutesCompleted(props) {
  return (
    <FormControl fullWidth>
      <TextField
        fullWidth
        required
        id="outlined-basic"
        label="Time"
        labelId="time-select-label"
        variant="outlined"
        value={props.minutesCompleted}
        onChange={props.handleMinutesCompletedChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">mins</InputAdornment>,
        }}
      />
    </FormControl>
  );
}
