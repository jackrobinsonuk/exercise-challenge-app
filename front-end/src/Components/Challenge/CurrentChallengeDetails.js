import { React, useState } from "react";
import { CircularProgress } from "@mui/material";

export default function CurrentChallengesDetails(props) {
  const [loading, setLoading] = useState(true);

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
          {props.challengeDetails.data.map(({ index, teamId, teamName }) => (
            <div>
              Team ID: {teamId} || Team Name: {teamName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
