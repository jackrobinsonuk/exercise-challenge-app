import { React, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { CircularProgress } from "@mui/material";
import axios from "axios";

import ExerciseTable from "../Components/ExerciseTable";
import AddExercise from "./AddExercise";

export default function YourExercise() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(null);
  const [addExerciseDisplay, setAddExerciseDisplay] = useState(false);

  function calculateTotalPoints() {
    var totalPoints = exercises.reduce(function (prev, cur) {
      return prev + cur.Points;
    }, 0);
    setTotalPoints(totalPoints);
  }

  function getMyExercises() {
    axios({
      method: "get",
      url: "https://mmhbb4sn0k.execute-api.eu-west-1.amazonaws.com/Prod/user/get-my-exercise/Jack",
      responseType: "json",
    })
      .then(function (response) {
        setExercises(response.data);
      })
      .then(function () {
        setLoading(false);
      })
      .then(function () {
        calculateTotalPoints();
      });
  }
  if (loading === true) {
    getMyExercises();
  }
  return (
    <main style={{ padding: "20px" }}>
      <h2>Your Exercise</h2>
      {loading === true && (
        <div>
          <CircularProgress />
          <h4>Total Points: Loading</h4>
        </div>
      )}

      {loading === false && (
        <div>
          <ExerciseTable exercises={exercises} />
          <h4>Total Points: {totalPoints}</h4>
        </div>
      )}
      <div align="right">
        <h3>Add Exercise</h3>
        {addExerciseDisplay === false && (
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setAddExerciseDisplay(true)}
          >
            <AddIcon />
          </Fab>
        )}
      </div>
      <div>
        {addExerciseDisplay === true && (
          <AddExercise setAddExerciseDisplay={setAddExerciseDisplay} />
        )}
      </div>
    </main>
  );
}
