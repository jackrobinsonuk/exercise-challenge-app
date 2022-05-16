import { React, useState } from "react";
import {
  CircularProgress,
  TableContainer,
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import axios from "axios";

import { apiRoot } from "../Globals/globals";

export default function Admin() {
  const [userList, setUserList] = useState();
  const [loading, setLoading] = useState(true);

  function getUserList() {
    axios({
      method: "get",
      url: `${apiRoot}/admin/get-users`,
      responseType: "json",
    }).then(function (response) {
      setUserList(response.data.Users);
      setLoading(false);
    });
  }

  if (!userList) {
    getUserList();
  }

  return (
    <main style={{ padding: "20px" }}>
      <h2>Admin</h2>

      {loading && <CircularProgress />}

      {userList && (
        <div>
          <>User List</>
          <br />
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Team ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((user, id) => (
                  <TableRow
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{user.Username}</TableCell>
                    <TableCell>
                      {
                        user.Attributes.find(({ Name }) => Name === "name")
                          .Value
                      }
                    </TableCell>
                    <TableCell>
                      {
                        user.Attributes.find(
                          ({ Name }) => Name === "custom:Team"
                        )?.Value
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </main>
  );
}
