import { React, useState } from "react";
import {
  Button,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Tooltip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function ExerciseTable(props) {
  const [deleteIcon, setDeleteIcon] = useState("");
  const [confirmButton, setConfirmButton] = useState("");

  function confirmDelete(id) {
    setConfirmButton(id);
    console.log(id);
    setDeleteIcon(id);
  }

  function cancelDelete() {
    setConfirmButton("");
    setDeleteIcon("");
  }

  const exercises = props.exercises;

  const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Exercise Name</TableCell>
            <TableCell>Minutes</TableCell>
            <TableCell>Points</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises.map((exercise) => (
            <TableRow
              key={exercise.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                {new Date(exercise.date).toLocaleDateString(
                  "en-GB",
                  dateOptions
                )}
              </TableCell>
              <TableCell component="th" scope="row">
                {exercise.exerciseName}
              </TableCell>
              <TableCell>{exercise.minutesExercised}</TableCell>
              <TableCell>{exercise.points}</TableCell>
              <TableCell key={exercise.id}>
                {deleteIcon !== exercise.id && (
                  <Tooltip
                    title="Delete"
                    onClick={() => confirmDelete(exercise.id)}
                    key={exercise.id}
                  >
                    <IconButton key={exercise.id}>
                      <DeleteIcon key={exercise.id} />
                    </IconButton>
                  </Tooltip>
                )}
                {confirmButton === exercise.id && (
                  <div>
                    <Button
                      key={exercise.id}
                      onClick={() => props.handleExerciseDelete(exercise.id)}
                    >
                      Delete
                    </Button>

                    <Button key={exercise.id} onClick={cancelDelete}>
                      Cancel
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
