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

  var userId = "robinson.jack97@gmail.com";

  const generateDate = () => {
    const d = new Date();

    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    var submissionDate = `${date}/${month}/${year}`;

    return submissionDate;
  };

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

  const handleClose = () => {
    props.setShowForm(false);
    props.setShowAddExerciseButton(true);
  };

  const handleSubmit = () => {
    if (!submitLoading) {
      setSubmitDisabled(true);
      setSubmitLoading(true);

      axios
        .post(
          "https://pu3iwm6kxc.execute-api.eu-west-1.amazonaws.com/Prod/user/add-exercise",
          {
            exerciseId: 21,
            minutesExercised: 80,
            userId: userId,
            date: generateDate(),
          }
        )
        .then(function (response) {
          setSubmitLoading(false);
          props.setShowSuccess(true);
          props.setShowForm(false);
        })
        .catch(function (error) {
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
          <Button variant="contained" onClick={handleClose}>
            Close
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
