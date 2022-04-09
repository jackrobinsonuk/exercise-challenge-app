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
  const [deleteIcon, setDeleteIcon] = useState(true);
  const [confirmButton, setConfirmButton] = useState(false);

  function confirmDelete() {
    setConfirmButton(true);
    setDeleteIcon(false);
  }

  const exercises = props.exercises;

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
              <TableCell>{exercise.date}</TableCell>
              <TableCell component="th" scope="row">
                {exercise.exerciseName}
              </TableCell>
              <TableCell>{exercise.minutesExercised}</TableCell>
              <TableCell>{exercise.points}</TableCell>
              <TableCell>
                {deleteIcon && (
                  <Tooltip title="Delete" onClick={confirmDelete}>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {confirmButton && (
                  <Button
                    onClick={() => props.handleExerciseDelete(exercise.id)}
                  >
                    Confirm Delete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
