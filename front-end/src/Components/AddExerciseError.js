import { React } from "react";
import { Button } from "@mui/material";

export default function AddExerciseError(props) {
  const handleAddAnotherExercise = () => {
    props.setShowForm(true);
    props.setShowSuccess(false);
  };

  const handleClose = () => {
    props.setShowForm(false);
    props.setShowSuccess(false);
    props.setShowAddExerciseButton(true);
  };

  return (
    <div>
      <h4>Failed to add exercise</h4>
      <div>{props.submissionError}</div>
    </div>
  );
}
