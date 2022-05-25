import { React, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import axios from "axios";

import AddExerciseExerciseSelect from "./AddExerciseExerciseSelect";
import AddExerciseMinutesCompleted from "./AddExerciseMinutesCompleted";
import AddExerciseCalendar from "./AddExerciseCalendar";
import { apiRoot } from "../../Globals/globals";

export default function AddExerciseForm(props) {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [minutesCompleted, setMinutesCompleted] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedChallenge] = useState(null);
  const [teamSelectLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState("");

  var userId = props.userId;
  var userInfo = props.userInfo;
  var exerciseList = props.exerciseList;
  var challengeList = props.challengeList;
  var teamList = props.teamList;

  const generateDate = () => {
    const date = new Date();

    return date;
  };

  const handleSelectedExerciseChange = (event) => {
    setSelectedExercise(event.target.value);
  };

  const handleMinutesCompletedChange = (event) => {
    if (event.target.value < 0) {
      props.setShowError(true);
    } else {
      setMinutesCompleted(event.target.value);
      props.setShowError(false);
    }
  };

  const handleClose = () => {
    props.setShowForm(false);
    props.setShowAddExerciseButton(true);
    props.setShowError(false);
  };

  const handleSubmit = () => {
    if (!submitLoading) {
      setSubmitLoading(true);
      setButtonDisabled("disabled");
      console.log(userInfo);

      var selectedTeam = userInfo["custom:Team"];
      var challengeId = userInfo["custom:Challenge"];

      var name = userInfo.name;

      axios
        .post(`${apiRoot}/user/add-exercise`, {
          exerciseId: selectedExercise,
          minutesExercised: minutesCompleted,
          userId: userId,
          date: generateDate(),
          team: selectedTeam,
          name: name,
          challengeId: challengeId,
        })
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

  if (selectedChallenge && teamSelectLoading && !teamList) {
    props.getTeamsInChallenge(selectedChallenge);
  }

  return (
    <div>
      <div style={{ paddingBottom: "20px" }}>
        <Box sx={{ minWidth: 120 }}>
          {props.challengeListLoading === true &&
            props.exerciseListLoading === true && <CircularProgress />}

          <div>
            {challengeList && (
              <AddExerciseExerciseSelect
                fullWidth
                selectedExercise={selectedExercise}
                handleSelectedExerciseChange={handleSelectedExerciseChange}
                exerciseList={exerciseList}
              />
            )}
          </div>
          <div style={{ paddingTop: "10px" }}>
            {challengeList && (
              <AddExerciseMinutesCompleted
                minutesCompleted={minutesCompleted}
                handleMinutesCompletedChange={handleMinutesCompletedChange}
              />
            )}
          </div>
          <AddExerciseCalendar />
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
            disabled={buttonDisabled}
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
