import { React, useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./Components/NavBar";
import Team from "./Pages/Team";
import YourExercise from "./Pages/YourExercise";
import Profile from "./Pages/Profile";
import UserLoginSignUp from "./Pages/UserLoginSignUp";
import Welcome from "./Pages/Welcome";
import { Auth } from "aws-amplify";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState({});

  if (isLoggedIn === false) {
    Auth.currentAuthenticatedUser()
      .then((result) => {
        setIsLoggedIn(true);
        setUserId(result.attributes.sub);
        setUserInfo(result.attributes);
      })
      .catch((err) => {
        return;
      });
  }

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <br />
      <div>
        {isLoggedIn === true && (
          <Routes>
            <Route path="/" element={<YourExercise userId={userId} />} />
            <Route
              path="/Exercise"
              element={<YourExercise userId={userId} />}
            />
            <Route path="/Team" element={<Team userId={userId} />} />
            <Route path="/Profile" element={<Profile userId={userId} />} />
            <Route path="/*" element={<YourExercise userId={userId} />} />
          </Routes>
        )}
        {isLoggedIn === false && (
          <Routes>
            <Route
              path="/Login"
              element={
                <UserLoginSignUp
                  setIsLoggedIn={setIsLoggedIn}
                  userId={userId}
                  setUserId={setUserId}
                  setUserInfo={setUserInfo}
                  userInfo={userInfo}
                />
              }
            />
            <Route path="/*" element={<Welcome isLoggedIn={isLoggedIn} />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;
