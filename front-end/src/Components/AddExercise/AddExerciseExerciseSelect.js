import { React, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  TextField,
} from "@mui/material";

export default function AddExerciseExerciseSelect(props) {
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  var options = [];

  props.exerciseList.map(({ exerciseName, exerciseId, points }, index) =>
    options.push({
      label: `${exerciseName} - ${points} ppm`,
      id: exerciseId,
      exerciseId: exerciseId,
    })
  );

  return (
    <FormControl fullWidth>
      <Autocomplete
        disablePortal
        id="autocomplete-box"
        options={options}
        renderInput={(params) => <TextField {...params} label="Exercise" />}
      />

      {/* <Select
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
      </Select> */}
    </FormControl>
  );
}
