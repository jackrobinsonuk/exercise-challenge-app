import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./Components/NavBar";
import Team from "./Pages/Team";
import YourExercise from "./Pages/YourExercise";
import Profile from "./Pages/Profile";

const App = () => {
  return (
    <div>
      <NavBar />
      <br />
      <div>
        <Routes>
          <Route path="/" element={<YourExercise />} />
          <Route path="/Exercise" element={<YourExercise />} />
          <Route path="/Team" element={<Team />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
