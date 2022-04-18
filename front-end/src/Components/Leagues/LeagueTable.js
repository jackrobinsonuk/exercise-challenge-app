import { React } from "react";
import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Box,
} from "@mui/material";

export default function LeagueTable(props) {
  const leagueResults = props.leagueResults;
  const leagueName = props.leagueName;

  return (
    <TableContainer component={Paper}>
      <Box style={{ padding: "10px" }}>
        <b>{leagueName}</b>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Week Points</TableCell>
            <TableCell>Tier Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leagueResults.map((result) => (
            <TableRow
              key={result.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{result.rank}</TableCell>
              <TableCell component="th" scope="row">
                {result.name}
              </TableCell>
              <TableCell>{result.points}</TableCell>
              <TableCell>{result.tierPoints}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
