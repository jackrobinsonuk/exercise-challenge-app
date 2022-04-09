import { React, useState } from "react";

import { Select, MenuItem } from "@mui/material";

export default function CurrentChallengesSelector(props) {
  return (
    <div>
      {props.loading === false && (
        <Select
          fullWidth
          required
          labelId="challenge-select-label"
          id="challenge-select"
          value={props.selectedChallenge}
          label="Challenge"
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
      )}
    </div>
  );
}
