import { useState } from "react";
import * as React from "react";
import { Grid, Box, Divider, CircularProgress, Tab, Tabs } from "@mui/material";

import LeagueTable from "../Components/Leagues/LeagueTable";
import { apiRoot } from "../Globals/globals";
import axios from "axios";

// TODO: Add a way to display multiple weeks

export default function Leagues() {
  const [leagues, setLeagues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [error, setError] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);

  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

  if (initialLoad && !leagues) {
    var weekIndex = 0;

    getLeagueDetails(weekIndex);
  }

  async function getLeagueDetails(weekIndex) {
    const challengeName = "Challenge";
    setError(null);
    setInitialLoad(false);

    axios({
      method: "get",
      url: `${apiRoot}/user/get-league?challengeName=${challengeName}&weekIndex=${weekIndex}`,
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
          maxWidth: { xs: 320, sm: 480 },
          bgcolor: "background.paper",
          paddingBottom: "10px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {weeks.map((week) => (
            <Tab label={week} />
          ))}
        </Tabs>
      </Box>

      {loading === true && (
        <div align="center">
          <CircularProgress />
        </div>
      )}

      {loading === false && (
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
