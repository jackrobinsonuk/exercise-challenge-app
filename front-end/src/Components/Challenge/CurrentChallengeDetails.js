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
  const [teamPoints, setTeamPoints] = useState([]);

  function getTeamPoints(teamId) {
    axios
      .get(`${apiRoot}/user/get-team-exercise?teamId=${teamId}`)
      .then(function (response) {
        setTeamPoints((teamPoints) => [...teamPoints, { teamId: 0 }]);
        return response;
      });
  }

  if (teamPoints === [] && props.challengeDetails.teamData) {
    getTeamPoints();
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
                      <TableCell key={index}>{teamId}</TableCell>
                      <TableCell component="th" scope="row" key={index}>
                        {teamName}
                      </TableCell>
                      <TableCell key={index}>{teamPoints}</TableCell>
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
