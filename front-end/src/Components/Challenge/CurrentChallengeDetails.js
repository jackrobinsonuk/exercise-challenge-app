import { React, useState } from "react";
import {
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import axios from "axios";

import { apiRoot } from "../../Globals/globals";

export default function CurrentChallengesDetails(props) {
  const [teamPoints, setTeamPoints] = useState(null);

  function getTeamPoints(teamId) {
    axios
      .get(`${apiRoot}/user/get-team-exercise?teamId=${teamId}`)
      .then(function (response) {
        setTeamPoints();
      });
  }

  return (
    <div>
      {props.challengeDetailsLoading === true && (
        <div style={{ paddingTop: "10px" }}>
          <CircularProgress />
          <h4>Fetching Challenge Details...</h4>
        </div>
      )}
      {props.challengeDetailsLoading === false && (
        <div>
          <b>Current Challenge Details</b>
          <div>Start Day: {props.challengeDetails.startDay}</div>
          <div>Number of Weeks: {props.challengeDetails.weeks}</div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="challenge details table">
              <TableHead>
                <TableRow>
                  <TableCell>Team ID</TableCell>
                  <TableCell>Team Name</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.challengeDetails.teamData.map(
                  ({ index, teamId, teamName }) => (
                    <TableRow
                      key={teamId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{teamId}</TableCell>
                      <TableCell component="th" scope="row">
                        {teamName}
                      </TableCell>
                      <TableCell>
                        {!teamPoints && getTeamPoints(teamId)({ teamPoints })}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
