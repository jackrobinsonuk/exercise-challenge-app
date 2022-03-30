import { React, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { CircularProgress } from "@mui/material";

export default function AddExerciseForm(props) {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [minutesCompleted, setMinutesCompleted] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState("disabled");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSelectedExerciseChange = (event) => {
    setSelectedExercise(event.target.value);
    if (selectedExercise && minutesCompleted !== "") {
      setSubmitEnabled("");
    } else return;
  };

  const handleMinutesCompletedChange = (event) => {
    setMinutesCompleted(event.target.value);
    if (selectedExercise && minutesCompleted !== "") {
      setSubmitEnabled("");
    } else return;
  };

  const handleSubmit = () => {
    if (!submitLoading) {
      setSubmitSuccess(false);
      setSubmitLoading(true);
    }
    // TODO: This should submit the form data to the API and change if successful
    //props.setAddExerciseDisplay(false);
  };

  return (
    // If submitSuccess === false show the form, else if submitSuccess === true, show a success screen
    <div>
      <div style={{ paddingBottom: "20px" }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="exercise-select-label">Exercise</InputLabel>
            <Select
              labelId="exercise-select-label"
              id="exercise-select"
              value={selectedExercise}
              label="Exercise"
              onChange={handleSelectedExerciseChange}
            >
              <MenuItem value={"Swimming"}>Swimming</MenuItem>
              <MenuItem value={"Rowing"}>Rowing</MenuItem>
              <MenuItem value={"Running"}>Running</MenuItem>
            </Select>
            <div style={{ paddingTop: "20px" }}>
              <TextField
                id="outlined-basic"
                label="Minutes Completed"
                variant="outlined"
                value={minutesCompleted}
                onChange={handleMinutesCompletedChange}
              />
            </div>
          </FormControl>
        </Box>
      </div>

      <div>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            disabled={submitEnabled}
            onClick={handleSubmit}
          >
            Submit
          </Button>

          {submitLoading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </div>
    </div>
  );
}
