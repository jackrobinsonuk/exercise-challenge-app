import { React } from "react";

export default function AddExerciseError(props) {
  return (
    <div>
      <h4>Failed to add exercise</h4>
      <div>{props.submissionError}</div>
    </div>
  );
}
