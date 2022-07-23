import { React, useState } from "react";
import { FormControl, Autocomplete, TextField } from "@mui/material";

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
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          props.handleSelectedExerciseChange(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        disablePortal
        id="autocomplete-box"
        options={options}
        renderInput={(params) => <TextField {...params} label="Exercise" />}
      />
    </FormControl>
  );
}
