import { React, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Divider } from "@mui/material";
import axios from "axios";

import ExerciseTable from "../Components/ExerciseTable";
import AddExercise from "./AddExercise";

export default function YourExercise() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(null);
  const [addExerciseDisplay, setAddExerciseDisplay] = useState(false);
  const userId = "robinson.jack97@gmail.com";
  const [loadingError, setLoadingError] = useState(false);

  function calculateTotalPoints() {
    var totalPoints = exercises.reduce(function (prev, cur) {
      return prev + cur.points;
    }, 0);
    setTotalPoints(totalPoints);
  }

  function getMyExercises() {
    axios({
      method: "get",
      url: `https://pu3iwm6kxc.execute-api.eu-west-1.amazonaws.com/Prod/user/get-my-exercise?userId=${userId}`,
      responseType: "json",
    })
      .then(function (response) {
        setExercises(response.data);
      })
      .then(function () {
        calculateTotalPoints();
      })
      .then(function () {
        setLoading(false);
      })
      .catch(function () {
        setLoadingError(true);
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
      <Divider variant="full-width" />
      <div>
        <AddExercise setAddExerciseDisplay={setAddExerciseDisplay} />
      </div>
    </main>
  );
}
