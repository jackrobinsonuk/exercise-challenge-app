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

  async function getTeamPoints() {
    const teamData = props.challengeDetails.teamData;

    teamData.forEach((element) =>
      axios
        .get(`${apiRoot}/user/get-team-exercise?teamId=${element.teamId}`)
        .then(function (response) {
          // Sum points and team ID

          var pointsPerId = Array.from(
            response.data.reduce((a, { team, points }) => {
              return a.set(team, (a.get(team) || 0) + points);
            }, new Map())
          ).map(([team, sum]) => ({
            team,
            sum,
          }));

          return pointsPerId;
        })
        .then(function (pointsPerId) {
          // Add the points per id as an object to the teamPoints array
        })
        .then(function (pointsToAdd) {
          // set the new array
          setTeamPoints(desiredTeamPoints);
        })
        .then(function () {
          setTeamPointsLoading(false);
        })
    );
  }

  if (teamPoints.length < 1) {
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
                      {teamPointsLoading === true && (
                        <TableCell key={teamId}>Loading...</TableCell>
                      )}
                      {teamPointsLoading === false && teamPoints && (
                        <div>
                          {teamPoints.map(({ sum }, team) => (
                            <TableCell key={team}>{sum}</TableCell>
                          ))}
                        </div>
                      )}
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
