import { React, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import AddExerciseForm from "../Components/AddExercise/AddExerciseForm";
import AddExerciseSuccess from "../Components/AddExercise/AddExerciseSuccess";
import AddExerciseError from "../Components/AddExercise/AddExerciseError";
import { apiRoot } from "../Globals/globals";

export default function AddExercise(props) {
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [showAddExerciseButton, setShowAddExerciseButton] = useState(true);
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseListLoading, setExerciseListLoading] = useState(true);
  const [challengeListLoading, setChallengeListLoading] = useState(true);
  const [challengeList, setChallengeList] = useState(null);
  const [teamList, setTeamList] = useState(null);

  const getExerciseList = () => {
    setExerciseListLoading(true);
    axios
      .get(`${apiRoot}/user/get-exercises-list`)
      .then(function (response) {
        setExerciseList(response.data);
      })

      .then(function () {
        setExerciseListLoading(false);
      });
  };

  const getChallengeList = () => {
    setChallengeListLoading(true);
    axios
      .get(`${apiRoot}/admin/get-challenges`)
      .then(function (response) {
        setChallengeList(response.data);
      })

      .then(function () {
        setChallengeListLoading(false);
      });
  };

  const getTeamsInChallenge = (selectedChallenge) => {
    axios
      .get(
        `${apiRoot}/admin/get-challenge-details?challengeName=${selectedChallenge}`
      )
      .then(function (response) {
        setTeamList(response.data.teamData);
      });
  };

  return (
    // If submitSuccess === false show the form, else if submitSuccess === true, show a success screen
    <div>
      <h3>Add Exercise</h3>
      {showAddExerciseButton && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            setShowForm(true);
            setShowAddExerciseButton(false);
            getExerciseList();
            getChallengeList();
            setTeamList(null);
          }}
        >
          <AddIcon />
        </Fab>
      )}
      {showForm && (
        <AddExerciseForm
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
          showForm={showForm}
          setShowForm={setShowForm}
          setShowAddExerciseButton={setShowAddExerciseButton}
          setSubmissionError={setSubmissionError}
          setShowError={setShowError}
          exerciseList={exerciseList}
          exerciseListLoading={exerciseListLoading}
          refreshExerciseTable={props.setLoading}
          userId={props.userId}
          challengeListLoading={challengeListLoading}
          challengeList={challengeList}
          teamList={teamList}
          getTeamsInChallenge={getTeamsInChallenge}
          userInfo={props.userInfo}
        />
      )}
      {showSuccess && (
        <AddExerciseSuccess
          showForm={showForm}
          setShowForm={setShowForm}
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
          setShowAddExerciseButton={setShowAddExerciseButton}
        />
      )}
      {showError && <AddExerciseError submissionError={submissionError} />}
    </div>
  );
}
