import { React, useState } from "react";
import axios from "axios";

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";

import { apiRoot } from "../Globals/globals";

export default function Team(props) {
  const [teamData, setTeamData] = useState();
  const [dataLoading, setDataLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState();
  const [error, setError] = useState();

  function calculateTotalPoints(response) {
    var totalPoints = response.data.reduce(function (prev, cur) {
      return prev + cur.points;
    }, 0);
    setTotalPoints(totalPoints);
  }

  function getTeamData(userInfo) {
    var teamId = userInfo["custom:Team"];

    axios
      .get(`${apiRoot}/user/get-team-exercise?teamId=${teamId}`)
      .then(function (response) {
        if (response.data[0]) {
          setTeamData(response.data);
          return response;
        }
      })
      .then(function (response) {
        calculateTotalPoints(response);
      })
      .then(function () {
        setDataLoading(false);
      })
      .catch(function (error) {
        setDataLoading(false);
        setError(error);
      });
  }

  if (props.userInfo["custom:Team"] && !teamData) {
    getTeamData(props.userInfo);
  }

  if (!props.userInfo["custom:Team"]) {
    setDataLoading(false);
  }

  return (
    <main style={{ padding: "20px" }}>
      <h2>Team</h2>
      {!props.userInfo["custom:Team"] && (
        <div>
          You're not currently part of a team, please contact your
          administrator.
        </div>
      )}

      {error && (
        <div>There was an error loading team data. Please try again later.</div>
      )}

      {dataLoading && (
        <div>
          <CircularProgress />
        </div>
      )}
      {teamData !== undefined && (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Exercise Name</TableCell>
                  <TableCell>Minutes</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamData.map((entry, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell component="th" scope="row">
                      {entry.exerciseName}
                    </TableCell>
                    <TableCell>{entry.minutesExercised}</TableCell>
                    <TableCell>{entry.points}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            Total Team Points: <b>{totalPoints}</b>
          </div>
        </div>
      )}
    </main>
  );
}
