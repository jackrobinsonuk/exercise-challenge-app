import { React, useState } from "react";

import axios from "axios";

import SortableExerciseTable from "../Components/SortableExerciseTable";

import { apiRoot } from "../Globals/globals";
import { CircularProgress } from "@mui/material";

export default function AllExercises(props) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  function getAllExercises() {
    axios({
      method: "get",
      url: `${apiRoot}/user/get-exercises-list`,
      responseType: "json",
    }).then(function (response) {
      setExercises(response.data);
      setLoading(false);
      return response;
    });
  }
  if (loading === true) {
    getAllExercises();
  }
  return (
    <main style={{ padding: "20px" }}>
      {loading && <CircularProgress />}

      {loading === false && (
        <div>
          <SortableExerciseTable exercises={exercises} />
        </div>
      )}
    </main>
  );
}
