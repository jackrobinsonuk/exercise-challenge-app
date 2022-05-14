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
  const [teamPointsLoading, setTeamPointsLoading] = useState(true);

  // setTeamPointsLoading will need to be readded

  var desiredTeamPoints = [
    { team: "1d7eebb8-2071-4bfa-baa5-85f2fc6fa6e2", sum: 160 },
    { team: "1319401c-de12-4a5d-99ff-e30f69d9e45f", sum: 300 },
  ];

  async function getTeamPoints(teamId) {
    const teamData = props.challengeDetails.teamData;

    const points = await axios
      .get(`${apiRoot}/user/get-team-exercise?teamId=${teamId}`)
      .then(function (response) {
        // Sum points and team ID

        const sum = response.data.reduce((accumulator, object) => {
          return accumulator + object.points;
        }, 0);
        console.log(sum);

        return sum;
      });

    return await points;
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
          <b>{props.challengeDetails.challengeName}</b>
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
                      <TableCell key={teamId} defaultValue={"Test"}>
                        Need to fix this
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
