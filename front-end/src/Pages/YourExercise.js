import { React, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Divider } from "@mui/material";
import axios from "axios";

import ExerciseTable from "../Components/ExerciseTable";
import AddExercise from "./AddExercise";
import { apiRoot } from "../Globals/globals";

export default function YourExercise(props) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(null);
  const [setAddExerciseDisplay] = useState(false);
  const [setLoadingError] = useState(false);
  const userId = props.userId;

  function handleExerciseDelete(exerciseIdToDelete) {
    deleteExerciseFromDb(exerciseIdToDelete);
  }

  function deleteExerciseFromDb(exerciseIdToDelete) {
    axios({
      method: "post",
      url: `${apiRoot}/user/delete-exercise?id=${exerciseIdToDelete}`,
      responseType: "json",
    }).then(setLoading(true));
  }

  function calculateTotalPoints(response) {
    var totalPoints = response.data.reduce(function (prev, cur) {
      return prev + cur.points;
    }, 0);
    setTotalPoints(totalPoints);
  }

  function getMyExercises() {
    axios({
      method: "get",
      url: `${apiRoot}/user/get-my-exercise?userId=${userId}`,
      responseType: "json",
    })
      .then(function (response) {
        setExercises(response.data);
        return response;
      })
      .then(function (response) {
        calculateTotalPoints(response);
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
          <ExerciseTable
            exercises={exercises}
            handleExerciseDelete={handleExerciseDelete}
          />
          <h4>Total Points: {totalPoints}</h4>
        </div>
      )}
      <Divider variant="full-width" />
      <div>
        <AddExercise
          setAddExerciseDisplay={setAddExerciseDisplay}
          setLoading={setLoading}
          userId={props.userId}
        />
      </div>
    </main>
  );
}
