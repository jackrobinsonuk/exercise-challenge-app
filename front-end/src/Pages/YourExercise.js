import { React, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

export default function YourExercise() {
  const [exercises, setExercises] = useState([]);

  function getMyExercises() {
    axios({
      method: "get",
      url: "https://mmhbb4sn0k.execute-api.eu-west-1.amazonaws.com/Prod/user/get-exercise/Jack",
      responseType: "json",
    }).then(function (response) {
      setExercises(response.data.toString());
    });
  }
  getMyExercises();
  return (
    <main style={{ paddingLeft: "20px" }}>
      <h2>Your Exercise</h2>
      Add a table here with exercises done by the user. {exercises}
      <h3>Add Exercise</h3>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => console.log("Add Exercise Clicked")}
      >
        <AddIcon />
      </Fab>
    </main>
  );
}
