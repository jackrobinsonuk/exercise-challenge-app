import { React } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function YourExercise() {
  return (
    <main style={{ paddingLeft: "20px" }}>
      <h2>Your Exercise</h2>
      Add a table here with exercise
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
