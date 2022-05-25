import { React, useState } from "react";

import axios from "axios";

import { apiRoot } from "../Globals/globals";

import CreateChallenge from "../Components/Challenge/CreateChallenge";

export default function Challenges(props) {
  const [showCreateChallenge, setShowCreateChallenge] = useState(true);

  function handleCreateChallengeSubmit(body) {
    axios({
      method: "post",
      url: `${apiRoot}/admin/create-challenge`,
      responseType: "json",
      data: body,
    });
    setShowCreateChallenge(false);
  }

  return (
    <main style={{ padding: "20px" }}>
      <h2>Challenge Setup</h2>

      <div>
        {showCreateChallenge && (
          <CreateChallenge
            handleCreateChallengeSubmit={handleCreateChallengeSubmit}
          />
        )}
      </div>
    </main>
  );
}
