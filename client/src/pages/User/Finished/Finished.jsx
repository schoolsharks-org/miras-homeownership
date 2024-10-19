import { HomeOutlined } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import OurButton from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import TotalPlayers from "../../../components/TotalPlayers";
import { useNavigate } from "react-router-dom";
import "./Finished.css";
import { resetState } from "../../../app/userSlice";

const Finished = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { name, wealth, investment, totalPlayers, goalReachPercentage } =
    useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleReset = () => {
    localStorage.clear();
    dispatch(resetState());
    navigate("/home");
  };

  return (
    <Stack className="user-completed-page" height="100vh">
      <Typography
        variant="h5"
        fontWeight="700"
        textAlign="center"
        color={theme.palette.primary.main}
        marginTop="16px"
      >
        Challenge Completed
      </Typography>
      <TotalPlayers players={totalPlayers} />

      <Stack
        color={theme.palette.primary.main}
        borderRadius="16px"
        padding="1rem"
        border={`2px solid ${theme.palette.primary.main}`}
        margin="4em 24px 0"
        gap="8px"
      >
        <Typography fontSize={"1.5rem"} fontWeight="500">
          {name}
        </Typography>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography>Bank Balance</Typography>
          <Typography fontWeight="700">{wealth}</Typography>
        </Stack>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography>Investments</Typography>
          <Typography fontWeight="700">{investment}</Typography>
        </Stack>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography>Total Wealth</Typography>
          <Typography fontWeight="700">{wealth + investment}</Typography>
        </Stack>
      </Stack>
      <Stack
        color={"#ffffff"}
        borderRadius="16px"
        padding="1rem"
        border={`2px solid #ffffff`}
        margin="1rem 24px 0"
        gap="8px"
      >
        <Typography fontSize={"1.5rem"} fontWeight="500">
          Goal update
        </Typography>
        <Stack
          sx={{
            width: "max-content",
            borderRadius: "50px",
            background: `conic-gradient(${theme.palette.primary.main} 0% ${goalReachPercentage}%,#ffffff ${
              100 - goalReachPercentage
            }% 100%)`,
            overflow: "hidden",
            margin: "auto",
          }}
        >
          <Stack
            sx={{
              margin: "4px",
              borderRadius: "50px",
              padding: "14px 20px",
              // background: "linear-gradient(#a69a85, #68797b)"
              background: "#D6B48D"
            }}
          >
            <Typography fontSize={"1.57rem"} fontWeight={"500"}>
              {Math.round(Number(goalReachPercentage))}% Reached
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        alignItems="center"
        position="fixed"
        bottom="50px"
        left="0"
        width="100%"
      >
        <Box width="80%" height="4px" bgcolor="#fff" borderRadius="4px" />
        <Box
          onClick={handleReset}
          position="absolute"
          left="50%"
          sx={{
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        >
          <OurButton>
            <HomeOutlined sx={{ fontSize: "1.7rem" }} />
          </OurButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Finished;
