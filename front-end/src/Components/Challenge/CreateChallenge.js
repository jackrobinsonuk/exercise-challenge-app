import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { React, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateChallenge(props) {
  const [challengeName, setChallengeName] = useState("");
  const [challengeStartDay, setChallengeStartDay] = useState([]);
  const [numberOfWeeks, setNumberOfWeeks] = useState();
  const [teamName1, setTeamName1] = useState("");
  const [teamName2, setTeamName2] = useState("");

  function handleChallengeNameInput(event) {
    setChallengeName(event.target.value);
  }

  function handleNumberOfWeeksChange(event) {
    var numberOfWeeks = parseInt(event.target.value);
    setNumberOfWeeks(numberOfWeeks);
  }

  function handleChallengeStartDayInput(event) {
    setChallengeStartDay(event.target.value);
  }
  function handleTeamName1Change(event) {
    setTeamName1(event.target.value);
  }

  function handleTeamName2Change(event) {
    setTeamName2(event.target.value);
  }

  function handleCreateChallengeSubmit() {
    var body = {
      challengeName: challengeName,
      weeks: numberOfWeeks,
      startDay: challengeStartDay,
      teamData: [
        {
          teamName: teamName1,
          teamId: uuidv4(),
        },
        {
          teamName: teamName2,
          teamId: uuidv4(),
        },
      ],
    };
    props.handleCreateChallengeSubmit(body);
  }

  const dayList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div>
      <FormControl fullWidth>
        <TextField
          margin="normal"
          required
          id="outlined-basic"
          label="Challenge Name"
          variant="outlined"
          value={challengeName}
          onChange={handleChallengeNameInput}
        />
        <br />
        <FormControl fullWidth>
          <InputLabel id="start-day-select-label">Start Day</InputLabel>
          <Select
            margin="normal"
            required
            label="Start Day"
            labelId="start-day-select-label"
            value={challengeStartDay}
            onChange={handleChallengeStartDayInput}
          >
            {dayList.map((day, index) => (
              <MenuItem
                key={index}
                value={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <br />
        <TextField
          type="number"
          onChange={handleNumberOfWeeksChange}
          label="Number of Weeks"
        >
          {numberOfWeeks}
        </TextField>

        <h3>Teams</h3>

        <TextField onChange={handleTeamName1Change} label="Team Name 1">
          {teamName1}
        </TextField>
        <br />
        <TextField onChange={handleTeamName2Change} label="Team Name 2">
          {teamName2}
        </TextField>

        <div style={{ paddingTop: "20px" }}>
          <Button onClick={handleCreateChallengeSubmit} variant="contained">
            Create
          </Button>
        </div>
      </FormControl>
    </div>
  );
}
