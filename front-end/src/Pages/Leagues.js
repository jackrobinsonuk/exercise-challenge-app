import { useState } from "react";
import * as React from "react";
import { Grid, Box, Divider, CircularProgress, Tab, Tabs } from "@mui/material";

import LeagueTable from "../Components/Leagues/LeagueTable";
import { apiRoot } from "../Globals/globals";
import axios from "axios";

export default function Leagues(props) {
  const [leagues, setLeagues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [error, setError] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);
  const [weeks, setWeeks] = useState();

  // TODO: Update this to be the challenge the user is taking part in
  const challengeId = props.userInfo["custom:Challenge"];

  if (initialLoad && !leagues) {
    var weekIndex = 0;

    getLeagueDetails(weekIndex);
    getChallengeDetailsHandler();
  }

  async function getChallengeDetailsHandler() {
    axios({
      method: "get",
      url: `https://staging.api.exercisechallengeapp.com/admin/get-challenge-details?challengeName=${challengeId}`,
      responseType: "json",
    }).then(function (response) {
      setWeeks(Array.from({ length: response.data.weeks }, (_, i) => i + 1));
    });
  }

  async function getLeagueDetails(weekIndex) {
    // This needs to be able to know which challenge the user is in
    // This needs adding to a user on create

    setError(null);
    setInitialLoad(false);

    axios({
      method: "get",
      url: `${apiRoot}/user/get-league?challengeName=${challengeId}&weekIndex=${weekIndex}`,
      responseType: "json",
    })
      .then(function (response) {
        setLeagues(response.data);
        setLoading(false);

        return response;
      })
      .catch(function (error) {
        setError(
          "The data you wanted does not exist yet. Please wait for that week to finish."
        );
        setLoading(false);
        setLeagues([]);
        return error;
      });
  }

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    setLoading(true);
    getLeagueDetails(newValue);
  };

  return (
    <main>
      <h2
        style={{
          paddingLeft: "20px",
          paddingBottom: "10px",
          paddingTop: "10px",
        }}
      >
        Leagues
      </h2>
      <Box
        sx={{
          maxWidth: { xs: 320, sm: 1000 },
          bgcolor: "background.paper",
          paddingBottom: "10px",
        }}
      >
        {weeks && (
          <Tabs
            value={value}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs"
          >
            {weeks.map((week) => (
              <Tab key={week} label={"Week " + week} />
            ))}
          </Tabs>
        )}
      </Box>

      {loading === true && (
        <div align="center">
          <CircularProgress />
        </div>
      )}

      {loading === false && leagues && (
        <div>
          {leagues.map((league) => (
            <Grid item xs={2} sm={3} md={3}>
              <Box
                key={league.leagueName}
                sx={{
                  my: 1,
                  mx: 3,
                  flexDirection: "column",
                }}
              >
                <LeagueTable
                  leagueResults={league.results}
                  leagueName={league.leagueName}
                  key={league.leagueName}
                />
              </Box>
              <Divider />
            </Grid>
          ))}
        </div>
      )}
      {error && <div style={{ padding: "20px" }}>{error}</div>}
    </main>
  );
}
