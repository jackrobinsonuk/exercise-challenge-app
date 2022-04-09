import { React, useState } from "react";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function CurrentChallengesSelector(props) {
  return (
    <div>
      {props.loading === false && (
        <FormControl fullWidth>
          <InputLabel id="challenge-select">Challenge Selector</InputLabel>
          <Select
            fullWidth
            labelId="challenge-select-label"
            id="challenge-select"
            value={props.selectedChallenge}
            label="Challenge Selector"
            onChange={props.handleSelectedChallengeChange}
          >
            {props.allChallenges.map(({ index, Key }) => (
              <MenuItem
                key={index}
                value={Key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
}
