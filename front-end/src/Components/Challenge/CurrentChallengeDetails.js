import { React, useState, useEffect, useCallback } from "react";
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
  const [pointsLoading, setPointsLoading] = useState(true);

  const getTeamPoints = useCallback((teamData) => {
    const teamId = teamData.teamId;

    axios
      .get(`${apiRoot}/user/get-team-exercise?teamId=${teamId}`)
      .then(function (response) {
        // Sum points and team ID

        const sum = response.data.reduce((accumulator, object) => {
          return accumulator + object.points;
        }, 0);

        setTeamPoints((teamPoints) => [
          ...teamPoints,
          { id: teamId, points: sum },
        ]);

        setPointsLoading(false);

        return sum;
      });
  }, []);

  useEffect(() => {
    const teamData = props.challengeDetails.teamData;
    teamData.forEach((element) => getTeamPoints(element));
    // eslint-disable-next-line
  }, [getTeamPoints]);

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
                      <TableCell component="th" scope="row" key={teamId}>
                        {teamName}
                      </TableCell>
                      {pointsLoading === false && (
                        <TableCell key={teamId}>
                          {teamPoints.find((x) => x.id === teamId)?.points}
                        </TableCell>
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
