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
            exerciseId: selectedExercise,
            minutesExercised: minutesCompleted,
            userId: userId,
            date: generateDate(),
          }
        )
        .then(function (response) {
          setSubmitLoading(false);
          props.setShowSuccess(true);
          props.setShowForm(false);
          props.refreshExerciseTable(true);
        })
        .catch(function (error) {
          props.setShowError(true);
          setSubmitLoading(false);
          props.setSubmissionError(error.toString());
        });
    }
  };

  var exerciseList = props.exerciseList;

  return (
    <div>
      <div style={{ paddingBottom: "20px" }}>
        <Box sx={{ minWidth: 120 }}>
          {props.exerciseListLoading === true && <CircularProgress />}

          {props.exerciseListLoading === false && (
            <FormControl fullWidth>
              <InputLabel id="exercise-select-label">Exercise</InputLabel>
              <Select
                required
                labelId="exercise-select-label"
                id="exercise-select"
                value={selectedExercise}
                label="Exercise"
                onChange={handleSelectedExerciseChange}
              >
                {exerciseList.map(({ index, exerciseId, exerciseName }) => (
                  <MenuItem
                    key={index}
                    value={exerciseId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {exerciseName}
                  </MenuItem>
                ))}
              </Select>
              <br />
              <TextField
                required
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
          )}
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
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </div>
    </div>
  );
}
