import { React } from "react";

import AddExerciseForm from "../Components/AddExerciseForm";

export default function AddExercise() {
  return (
    // If submitSuccess === false show the form, else if submitSuccess === true, show a success screen
    <div>
      <AddExerciseForm />
    </div>
  );
}
