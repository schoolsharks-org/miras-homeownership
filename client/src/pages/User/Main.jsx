import React, { useEffect } from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Question from "./Question/Question";
import Finished from "./Finished/Finished";
import { initializeAuth } from "../../services/auth/initializeAuth";
import { useDispatch } from "react-redux";
import AnimatedPage from "../../utils/AnimatedPage";

const Main = () => {
  const theme = useTheme();
  const location = useLocation();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    initializeAuth(navigate, dispatch);
  }, [dispatch]);



  return (
    <Stack
      width="100%"
      maxWidth="900px"
      margin={"auto"}
      sx={{
        overflow: isLargeScreen ? "" : "hidden",
      }}
    >
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/home" element={<AnimatedPage Component={Home} />} />
          <Route path="/login" element={<AnimatedPage Component={Login} />} />
          <Route
            path="/questions"
            element={<AnimatedPage Component={Question} />}
          />
          <Route
            path="/completed"
            element={<AnimatedPage Component={Finished} />}
          />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </AnimatePresence>
    </Stack>
  );
};

export default Main;
