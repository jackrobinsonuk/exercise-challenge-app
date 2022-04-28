import { React, useState } from "react";

export default function Admin() {
  const [userList, setUserList] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  async function getUserList() {}

  if (!userList) {
    getUserList();
  }
  return (
    <main style={{ padding: "20px" }}>
      <h2>Admin</h2>
      This will be where the admin page will be
      <div>User List</div>
    </main>
  );
}
