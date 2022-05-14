import { React } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function AddExerciseExerciseSelect(props) {
  return (
    <FormControl fullWidth>
      <InputLabel id="exercise-select-label">Exercise</InputLabel>
      <Select
        fullWidth
        required
        id="outlined-basic"
        value={props.selectedExercise}
        label="Exercise"
        labelId="exercise-select-label"
        onChange={props.handleSelectedExerciseChange}
        variant="outlined"
      >
        {props.exerciseList.map(
          ({ index, exerciseId, exerciseName, points }) => (
            <MenuItem
              key={exerciseId}
              value={exerciseId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {`${exerciseName} | ${points} ppm`}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
}
