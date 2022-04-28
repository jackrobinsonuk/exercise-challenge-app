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
  const [teamPointsLoading] = useState(true);

  // setTeamPointsLoading will need to be readded

  function getTeamPoints() {
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

          var stateTeamPoints = teamPoints;

          var pointsToAdd = stateTeamPoints.concat(pointsPerId);

          console.log(pointsToAdd);
          setTeamPoints(pointsToAdd);

          // setTeamPointsLoading(false);
        })
    );
  }

  // if (teamPoints.length === 0) {
  //   getTeamPoints();
  // }

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
                          {teamPoints.map((index, team, sum) => (
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
