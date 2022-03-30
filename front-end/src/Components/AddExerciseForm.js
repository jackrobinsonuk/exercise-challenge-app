import { React, useState } from "react";
import {
  Box,
  Button,
  Select,
  FormControl,
  MenuItem,
  TextField,
  CircularProgress,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import axios from "axios";

export default function AddExerciseForm(props) {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [minutesCompleted, setMinutesCompleted] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const [submission, setSubmission] = useState({});

  var userId = "Jack";

  const handleSelectedExerciseChange = (event) => {
    setSelectedExercise(event.target.value);
    if (selectedExercise && minutesCompleted !== "") {
      setSubmitDisabled(false);
    } else return;
  };

  const handleMinutesCompletedChange = (event) => {
    setMinutesCompleted(event.target.value);
    if (selectedExercise && minutesCompleted !== "") {
      setSubmitDisabled(false);
    } else return;
  };

  const handleSubmit = () => {
    if (!submitLoading) {
      setSubmitDisabled(true);
      setSubmitLoading(true);

      axios
        .post(`/Prod/${userId}`, {
          submission,
        })
        .then(function (response) {
          console.log(response);
          props.setShowSuccess(true);
          // TODO: This should submit the form data to the API and change if successful
        })
        .catch(function (error) {
          console.log(error);
          props.setShowError(true);
          setSubmitLoading(false);
          props.setSubmissionError(error.toString());
        });
    }
  };

  return (
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
            <br />
            <TextField
              id="outlined-basic"
              label="Time"
              variant="outlined"
              value={minutesCompleted}
              onChange={handleMinutesCompletedChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mins</InputAdornment>
                ),
              }}
            />
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
            disabled={submitDisabled}
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
