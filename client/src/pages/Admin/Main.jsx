import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "../../utils/AnimatedPage";
import Login from "./Login/Login";
import Sessions from "./Sessions/Sessions";
import Scoreboard from "../Scoreboard";
import PreviousSession from "./PreviousSession/PreviousSession";
import Home from "./Home/Home";

const Main = () => {
  const { loggedIn } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (loggedIn === undefined) return;
    if (loggedIn) {
      navigate(location.pathname);
    } else {
      navigate("/admin/login");
    }
  }, [loggedIn]);

  return (
    <Stack
      width="100%"
      margin={"auto"}
      sx={{
        overflowX: "hidden",
      }}
    >
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<AnimatedPage Component={Login} />} />
          <Route path="/home" element={<AnimatedPage Component={Home} />} />
          <Route
            path="/sessions"
            element={<AnimatedPage Component={Sessions} />}
          />
          <Route
            path="/sessions/current-session/scoreboard"
            element={<AnimatedPage Component={Scoreboard} role={"admin"} />}
          />
          <Route
            path="/sessions/past-session/:id"
            element={
              <AnimatedPage Component={PreviousSession} role={"admin"} />
            }
          />
        </Routes>
      </AnimatePresence>
    </Stack>
  );
};

export default Main;
