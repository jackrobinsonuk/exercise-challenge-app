import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ResponsiveAppBar from "./Components/AppBar";
import Team from "./Pages/Team";
import YourExercise from "./Pages/YourExercise";
import Profile from "./Pages/Profile";

const App = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <br />
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<YourExercise />} />
            <Route path="/your-exercise" element={<YourExercise />} />
            <Route path="/team" element={<Team />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
