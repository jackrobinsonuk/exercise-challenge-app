import { React, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import AddExerciseChallengeSelect from "./AddExerciseChallengeSelect";
import AddExerciseTeamSelect from "./AddExerciseTeamSelect";

import AddExerciseExerciseSelect from "./AddExerciseExerciseSelect";
import AddExerciseMinutesCompleted from "./AddExerciseMinutesCompleted";

export default function AddExerciseForm(props) {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [minutesCompleted, setMinutesCompleted] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [teamSelectLoading] = useState(true);

  var userId = props.userId;
  var exerciseList = props.exerciseList;
  var challengeList = props.challengeList;
  var teamList = props.teamList;

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
  };

  const handleMinutesCompletedChange = (event) => {
    if (event.target.value < 0) {
      props.setShowError(true);
    } else {
      setMinutesCompleted(event.target.value);
      props.setShowError(false);
    }
  };

  const handleSelectedChallenge = (event) => {
    setSelectedChallenge(event.target.value);
  };

  const handleSelectedTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleClose = () => {
    props.setShowForm(false);
    props.setShowAddExerciseButton(true);
  };

  const handleSubmit = () => {
    if (!submitLoading) {
      setSubmitLoading(true);

      axios
        .post(
          "https://pu3iwm6kxc.execute-api.eu-west-1.amazonaws.com/Prod/user/add-exercise",
          {
            exerciseId: selectedExercise,
            minutesExercised: minutesCompleted,
            userId: userId,
            date: generateDate(),
            team: selectedTeam,
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

  if (selectedChallenge && teamSelectLoading && !teamList) {
    props.getTeamsInChallenge(selectedChallenge);
  }

  return (
    <div>
      <div style={{ paddingBottom: "20px" }}>
        <Box sx={{ minWidth: 120 }}>
          {props.challengeListLoading === true &&
            props.exerciseListLoading === true && <CircularProgress />}

          {props.challengeList && (
            <AddExerciseChallengeSelect
              selectedChallenge={selectedChallenge}
              handleSelectedChallenge={handleSelectedChallenge}
              challengeList={challengeList}
            />
          )}

          {props.teamList === null && selectedChallenge && <CircularProgress />}

          {props.teamList && (
            <AddExerciseTeamSelect
              handleSelectedTeamChange={handleSelectedTeamChange}
              teamList={props.teamList}
              selectedTeam={selectedTeam}
            />
          )}

          <div>
            {selectedTeam && (
              <AddExerciseExerciseSelect
                fullWidth
                selectedExercise={selectedExercise}
                handleSelectedExerciseChange={handleSelectedExerciseChange}
                exerciseList={exerciseList}
              />
            )}
          </div>
          <div>
            {selectedTeam && (
              <AddExerciseMinutesCompleted
                minutesCompleted={minutesCompleted}
                handleMinutesCompletedChange={handleMinutesCompletedChange}
              />
            )}
          </div>
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
          <Button variant="contained" onClick={handleSubmit}>
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