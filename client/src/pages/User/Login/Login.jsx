import { Box, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import Logo from "../../../assets/SchoolSharks-logo.webp";
import SwipeBar from "../../../components/SwipeBar";
import { Navigate, useNavigate } from "react-router-dom";
import { loginValidation } from "../../../utils/loginValidation";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../app/userSlice";
import "../../../App.css";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const { user, error: userError, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/questions");
    } else if (status === "failed") {
      setError(userError);
    }
  }, [status, userError, navigate]);

  const handleSubmit = () => {
    setError("");
    const response = loginValidation(email, name);
    if (!response.success) {
      setError(response.error);
    } else {
      dispatch(createUser({ username: name, email, phone }));
    }
  };

  if (user) {
    return <Navigate to="/questions" />;
  }

  return (
    <Stack
      className="user-login"
      width="100%"
      height={`${window.innerHeight < 616 ? 616 : window.innerHeight}px`}
      position="relative"
      alignItems={"center"}
    >
      <Stack alignItems={"center"} marginTop={"25px"}>
        <Typography fontSize="0.7rem" fontWeight={"700"} color="#B79470">
          A Game By
        </Typography>
        <Box
          width="120px"
          height="auto"
          sx={{
            aspectRatio: "116/45",
            background: `url(${Logo})`,
            backgroundSize: "cover",
            opacity: "0.2",
          }}
        ></Box>
      </Stack>
      <Stack>
        <Typography
          variant="h5"
          fontWeight={"700"}
          fontSize="2rem"
          marginTop={"40px"}
          color={theme.palette.primary.main}
        >
          Login
        </Typography>
      </Stack>
      <Stack
        width={"80%"}
        gap="1rem"
        sx={{ maxWidth: "430px" }}
        marginTop={"1rem"}
      >
        <TextField
          label="Name *"
          variant="standard"
          placeholder="eg. Vanessa Jenson"
          value={name}
          onChange={(e) => {
            setError("");
            setName(e.target.value);
          }}
        />
        <TextField
          label="Email"
          type="email"
          variant="standard"
          placeholder="eg. xoxo@gmail.com"
          value={email}
          onChange={(e) => {
            setError("");
            setEmail(e.target.value);
          }}
        />
        <TextField
          label="Phone Number"
          variant="standard"
          type="number"
          placeholder="eg. xxxxxxxxxx"
          value={phone}
          onChange={(e) => {
            setError("");
            setPhone(e.target.value);
          }}
        />
        <Typography color="#d61a1a" sx={{ minHeight: "1rem" }}>
          {error}
        </Typography>
      </Stack>

      <Stack
        position={"fixed"}
        bottom={"1.5rem"}
        width={"100%"}
        maxWidth={"900px"}
      >
        <SwipeBar onSwipe={handleSubmit} />
      </Stack>
    </Stack>
  );
};

export default Login;
