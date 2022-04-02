import { React, useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./Components/NavBar";
import Team from "./Pages/Team";
import YourExercise from "./Pages/YourExercise";
import Profile from "./Pages/Profile";
import UserLoginSignUp from "./Pages/UserLoginSignUp";
import Welcome from "./Pages/Welcome";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <br />
      <div>
        {isLoggedIn === true && (
          <Routes>
            <Route path="/" element={<YourExercise userName={userName} />} />
            <Route
              path="/Exercise"
              element={<YourExercise userName={userName} />}
            />
            <Route path="/Team" element={<Team userName={userName} />} />
            <Route path="/Profile" element={<Profile userName={userName} />} />
            <Route path="/*" element={<YourExercise userName={userName} />} />
          </Routes>
        )}
        {isLoggedIn === false && (
          <Routes>
            <Route
              path="/Login"
              element={
                <UserLoginSignUp
                  setIsLoggedIn={setIsLoggedIn}
                  userName={userName}
                  setUserName={setUserName}
                />
              }
            />
            <Route path="/*" element={<Welcome />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;
