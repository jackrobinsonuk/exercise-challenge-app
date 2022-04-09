import { React, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import axios from "axios";

import { apiRoot } from "../Globals/globals";

import CurrentChallengesSelector from "../Components/CurrentChallengesSelector";
import CurrentChallengesDetails from "../Components/CurrentChallengeDetails";

export default function Challenges(props) {
  const [loading, setLoading] = useState(true);
  const [allChallenges, setAllChallenges] = useState([]);
  const [setLoadingError] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [challengeDetails, setChallengeDetails] = useState({});
  const [challengeDetailsLoading, setChallengeDetailsLoading] = useState(true);

  const handleSelectedChallengeChange = (event) => {
    setSelectedChallenge(event.target.value);
  };

  function getAllChallenges() {
    axios({
      method: "get",
      url: `${apiRoot}/admin/get-challenges`,
      responseType: "json",
    }).then(function (response) {
      setAllChallenges(response.data);
      setLoading(false);
      console.log(response.data);
      return response;
    });
  }
  if (loading === true) {
    getAllChallenges();
  }

  function getSelectedChallengeDetails(selectedChallenge) {
    axios({
      method: "get",
      url: `${apiRoot}/admin/get-challenge-details?challengeName=${selectedChallenge}`,
      responseType: "json",
    }).then(function (response) {
      setChallengeDetails(response.data);
      setChallengeDetailsLoading(false);
      console.log(response.data);
      return response;
    });
  }
  if (selectedChallenge && challengeDetailsLoading) {
    getSelectedChallengeDetails(selectedChallenge);
  }

  return (
    <main style={{ padding: "20px" }}>
      <h2>Challenges</h2>
      {loading === true && (
        <div>
          <CircularProgress />
          <h4>Total Points: Loading</h4>
        </div>
      )}
      <div>
        {loading === false && (
          <CurrentChallengesSelector
            loading={loading}
            selectedChallenge={selectedChallenge}
            handleSelectedChallengeChange={handleSelectedChallengeChange}
            allChallenges={allChallenges}
          />
        )}
      </div>
      <div>
        {selectedChallenge && (
          <CurrentChallengesDetails
            challengeDetails={challengeDetails}
            challengeDetailsLoading={challengeDetailsLoading}
          />
        )}
      </div>
    </main>
  );
}
