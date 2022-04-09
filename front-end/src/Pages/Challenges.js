import { React, useState } from "react";
import { Button, CircularProgress, Divider } from "@mui/material";

import axios from "axios";

import { apiRoot } from "../Globals/globals";

import CurrentChallengesSelector from "../Components/Challenge/CurrentChallengesSelector";
import CurrentChallengesDetails from "../Components/Challenge/CurrentChallengeDetails";
import CreateChallenge from "../Components/Challenge/CreateChallenge";

export default function Challenges(props) {
  const [loading, setLoading] = useState(true);
  const [allChallenges, setAllChallenges] = useState([]);
  const [setLoadingError] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [challengeDetails, setChallengeDetails] = useState({});
  const [challengeDetailsLoading, setChallengeDetailsLoading] = useState(true);
  const [showCreateChallengeButton, setShowCreateChallengeButton] =
    useState(true);
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);

  const handleSelectedChallengeChange = (event) => {
    setSelectedChallenge(event.target.value);
  };

  const handleCreateChallengeClick = () => {
    setShowCreateChallengeButton(false);
    setShowCreateChallenge(true);
  };

  function getAllChallenges() {
    axios({
      method: "get",
      url: `${apiRoot}/admin/get-challenges`,
      responseType: "json",
    }).then(function (response) {
      setAllChallenges(response.data);
      setLoading(false);

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
      <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        {selectedChallenge && (
          <CurrentChallengesDetails
            challengeDetails={challengeDetails}
            challengeDetailsLoading={challengeDetailsLoading}
          />
        )}
      </div>
      <div>
        <Divider />
      </div>
      <div style={{ paddingTop: "20px" }}>
        {showCreateChallengeButton && (
          <Button variant="contained" onClick={handleCreateChallengeClick}>
            Create Challenge
          </Button>
        )}
      </div>
      <div>{showCreateChallenge && <CreateChallenge />}</div>
    </main>
  );
}
