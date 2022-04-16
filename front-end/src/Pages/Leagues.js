import { React, useState } from "react";
import { Grid, Box } from "@mui/material";

import data from "../Globals/leagues.json";

import LeagueTable from "../Components/Leagues/LeagueTable";

// there will be a function here to get the league values
// for now it is mocked in the Static back-end folder

// TODO: Add a way to display multiple weeks

const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

export default function Leagues() {
  const [leagues, setLeagues] = useState(data);
  const [weekDisplay, setWeekDisplay] = useState(weeks[0]);
  console.log(leagues);
  return (
    <main style={{ padding: "20px" }}>
      <h2>Leagues</h2>

      {leagues.map((league) => (
        <Grid item xs={2} sm={3} md={3}>
          <Box
            sx={{
              my: 1,
              mx: 3,
              flexDirection: "column",
            }}
          >
            <LeagueTable
              leagueResults={league.results}
              leagueName={league.leagueName}
            />
          </Box>
        </Grid>
      ))}
    </main>
  );
}
