import { React, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Auth } from "aws-amplify";

import NavBarAdmin from "./Components/NavBar/NavBarAdmin";
import NavBarLoggedIn from "./Components/NavBar/NavBarLoggedIn";
import NavBarLoggedOut from "./Components/NavBar/NavBarLoggedOut";
import Team from "./Pages/Team";
import YourExercise from "./Pages/YourExercise";
import Profile from "./Pages/Profile";
import UserLoginSignUp from "./Pages/UserLoginSignUp";
import Welcome from "./Pages/Welcome";
import ChallengeSetup from "./Pages/Challenge Setup";
import Leagues from "./Pages/Leagues";
import Admin from "./Pages/Admin";
import Challenge from "./Pages/Challenge";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
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

  if (isAdmin === false) {
    Auth.currentAuthenticatedUser()
      .then((result) => {
        if (result.attributes["custom:Admin"] === "1") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      })
      .catch((err) => {
        return;
      });
  }

  return (
    <div>
      {isLoggedIn === false && (
        <NavBarLoggedOut setIsLoggedIn={setIsLoggedIn} />
      )}

      {isLoggedIn === true && isAdmin === false && (
        <NavBarLoggedIn setIsLoggedIn={setIsLoggedIn} />
      )}

      {isLoggedIn === true && isAdmin && (
        <NavBarAdmin setIsLoggedIn={setIsLoggedIn} />
      )}

      <div>
        {isLoggedIn === true && (
          <Routes>
            <Route path="/" element={<YourExercise userId={userId} />} />
            <Route
              path="/Login"
              element={<YourExercise userId={userId} userInfo={userInfo} />}
            />
            <Route
              path="/Exercise"
              element={<YourExercise userId={userId} userInfo={userInfo} />}
            />
            <Route path="/Team" element={<Team userInfo={userInfo} />} />
            <Route
              path="/Profile"
              element={<Profile userId={userId} userInfo={userInfo} />}
            />
            <Route
              path="/Challenge"
              element={<Challenge userId={userId} userInfo={userInfo} />}
            />

            <Route path="/Leagues" element={<Leagues userInfo={userInfo} />} />
          </Routes>
        )}

        {isAdmin === true && isLoggedIn === true && (
          <Routes>
            <Route path="/Challenge-Setup" element={<ChallengeSetup />} />
            <Route path="/Admin" element={<Admin />} />
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
