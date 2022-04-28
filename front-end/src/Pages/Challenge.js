import { React, useState } from "react";
import { Button, CircularProgress, Divider } from "@mui/material";

import axios from "axios";

import { apiRoot } from "../Globals/globals";

import CurrentChallengesSelector from "../Components/Challenge/CurrentChallengesSelector";
import CurrentChallengesDetails from "../Components/Challenge/CurrentChallengeDetails";
import CreateChallenge from "../Components/Challenge/CreateChallenge";

export default function Challenge(props) {
  const [challengeDetails, setChallengeDetails] = useState();
  const [challengeDetailsLoading, setChallengeDetailsLoading] = useState(true);

  function getSelectedChallengeDetails() {
    const challengeId = props.userInfo["custom:Challenge"];
    axios({
      method: "get",
      url: `${apiRoot}/admin/get-challenge-details?challengeName=${challengeId}`,
      responseType: "json",
    }).then(function (response) {
      setChallengeDetails(response.data);
      setChallengeDetailsLoading(false);

      return response;
    });
  }

  if (!challengeDetails) {
    getSelectedChallengeDetails();
  }

  return (
    <main style={{ padding: "20px" }}>
      <h2>Challenge Details</h2>

      <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        {challengeDetails && (
          <CurrentChallengesDetails
            challengeDetails={challengeDetails}
            challengeDetailsLoading={challengeDetailsLoading}
          />
        )}
      </div>
    </main>
  );
}
