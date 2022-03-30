import { React, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import AddExerciseForm from "../Components/AddExerciseForm";
import AddExerciseSuccess from "../Components/AddExerciseSuccess";

export default function AddExercise(props) {
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAddExerciseButton, setShowAddExerciseButton] = useState(true);

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
    </div>
  );
}
