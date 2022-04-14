import { Button, TextField, FormControl } from "@mui/material";
import { React, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateChallenge(props) {
  const [challengeName, setChallengeName] = useState("");

  const [teamName1, setTeamName1] = useState("");
  const [teamName2, setTeamName2] = useState("");

  function handleChallengeNameInput(event) {
    setChallengeName(event.target.value);
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
      data: [
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

  return (
    <div>
      <h3>Create Challenge</h3>
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

        {/* <Select
          margin="normal"
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
        </Select> */}

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
