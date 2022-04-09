import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { React, useState } from "react";

export default function CreateChallenge(props) {
  const dayList = [
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" },
    { day: "Sunday" },
  ];

  const [challengeName, setChallengeName] = useState("");
  const [challengeStartDay, setChallengeStartDay] = useState("");
  const [challengeStartDate, setChallengeStartDate] = useState("");
  const [challengeTeams, setChallengeTeams] = useState([]);

  function handleChallengeNameInput(event) {
    setChallengeName(event.target.value);
  }

  function handleChallengeStartDayInput(event) {
    setChallengeStartDay(event.target.value);
  }

  function handleChallengeStartDateInput(event) {
    setChallengeStartDate(event.target.value);
  }

  function handleChallengeTeamsInput(event) {
    console.log("update team");
  }

  function handleCreateChallengeSubmit() {
    console.log("Submitted");
  }

  return (
    <div>
      <h3>Create Challenge</h3>
      <FormControl fullWidth>
        <TextField
          required
          id="outlined-basic"
          label="Challenge Name"
          variant="outlined"
          value={challengeName}
          onChange={handleChallengeNameInput}
        />

        <Select
          required
          labelId="day-select-label"
          id="day-select"
          value={challengeStartDay}
          onChange={handleChallengeStartDayInput}
        >
          {dayList.map(({ index, day }) => (
            <MenuItem
              key={index}
              value={day}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {day}
            </MenuItem>
          ))}
        </Select>
        <div>Which date does this challenge start?</div>
        <div>Which date does this challenge End?</div>
        <div>Add Teams</div>
        <div style={{ paddingTop: "20px" }}>
          <Button variant="contained">Create</Button>
        </div>
      </FormControl>
    </div>
  );
}
