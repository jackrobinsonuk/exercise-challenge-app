import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ExerciseTable(props) {
  const exercises = props.exercises;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Exercise ID</TableCell>
            <TableCell>Exercise Name</TableCell>
            <TableCell>Minutes</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises.map((exercise) => (
            <TableRow
              key={exercise.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {exercise.id}
              </TableCell>
              <TableCell>{exercise.Name}</TableCell>
              <TableCell>{exercise.minutesExercised}</TableCell>
              <TableCell>{exercise.date}</TableCell>
              <TableCell>{exercise.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
