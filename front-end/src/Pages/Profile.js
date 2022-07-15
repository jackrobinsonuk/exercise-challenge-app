import { React, useState } from "react";
import { Grid, CircularProgress } from "@mui/material";

import axios from "axios";

import { apiRoot } from "../Globals/globals";

export default function Profile(props) {
  const [loading, setLoading] = useState(true);
  const [teamDetails, setTeamDetails] = useState();
  const [challengeName, setChallengeName] = useState();
  const [error, setError] = useState();

  async function getInfo() {
    if (props.userInfo) {
      const challengeId = props.userInfo["custom:Challenge"];

      await axios({
        method: "get",
        url: `${apiRoot}/admin/get-challenge-details?challengeName=${challengeId}`,
        responseType: "json",
      })
        .then(function (response) {
          setChallengeName(response.data.challengeName);
          return response;
        })
        .then(function (response) {
          const teamDetails = response.data.teamData.find(
            ({ teamId }) => teamId === props.userInfo["custom:Team"]
          );

          setTeamDetails(teamDetails);
        })
        .then(function () {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setError(error);
          setLoading(false);
        });
    } else return;
  }

  // function handleUploadClick() {
  //   console.log("Upload button clicked");
  // }

  if (!challengeName && !error) {
    getInfo();
  }

  return (
    <main style={{ padding: "20px" }}>
      <h2>Profile</h2>

      {/* <Grid container spacing={1}>
        <Grid item xs>
          <Avatar
            alt="User Image"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 56, height: 56 }}
          />
          <br />
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleUploadClick}
          />
        </Grid> */}
      {loading && !error && <CircularProgress />}

      {!loading && !error && (
        <Grid item xs={10}>
          <div>
            <b>Name: </b>
            {props.userInfo?.name}
          </div>
          <div>
            <b>Team: </b>
            {teamDetails.teamName}
          </div>
          <div>
            <b>Current challenge: </b>
            {challengeName}
          </div>
          <div>
            <b>Email: </b>
            {props.userInfo?.email}
          </div>
        </Grid>
      )}

      {error && (
        <div>
          <Grid item xs={10}>
            <div>
              <b>Name: </b>
              {props.userInfo?.name}
            </div>
            <div>
              <b>Team: </b>
              No Team
            </div>
            <div>
              <b>Current challenge: </b>
              No Challenge
            </div>
            <div>
              <b>Email: </b>
              {props.userInfo?.email}
            </div>
          </Grid>
        </div>
      )}
    </main>
  );
}
