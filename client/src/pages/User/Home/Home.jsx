import {Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import background from "../../../assets/sniff-and-tail-bg.webp";
import SwipeBar from "../../../components/SwipeBar";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleOnSwipe = () => {
    navigate("/login");
  };
  return (
    <Stack
      width="100%"
      height={`${window.innerHeight < 616 ? 616 : window.innerHeight}px`}
      position="relative"
    >
    
      <Typography
        variant={"h3"}
        fontSize="1.8rem"
        fontWeight="700"
        textAlign={"center"}
        zIndex={1}
        maxWidth={"200px"}
        color={theme.palette.primary.main}
        margin={"35px auto 22px"}
        sx={{
          [theme.breakpoints.up("sm")]: {
            fontSize: "2.5rem",
            maxWidth: "100%",
          },
        }}
      >
        Mira’s Path to Homeownership
      </Typography>
      <Stack>
        <img
          src={background}
          alt=""
          style={{ maxWidth: "480px", margin: "auto", width: "100%" }}
        />
      </Stack>
      <Stack padding="0 16px" marginTop={"32px"}>
        <Typography
          variant="body2"
          color={theme.palette.primary.main}
          fontWeight={"500"}
          fontSize={"1rem"}
          margin={"0 0 12px"}
        >
          The goal is to accumulate enough wealth to purchase a home worth INR 75
          lakhs by making smart financial decisions.
        </Typography>
        <Typography
          variant="body2"
          color={"#ffffff"}
          fontWeight={"500"}
          fontSize={"1rem"}
        >
          Starting Bank Balance: INR 10,000 <br/> Investment: INR 500 is invested
          every month, 10% annual increase
        </Typography>
      </Stack>
      <Stack
        position={"fixed"}
        bottom={"1.5rem"}
        width={"100%"}
        maxWidth={"900px"}
      >
        <SwipeBar onSwipe={handleOnSwipe} />
      </Stack>
    </Stack>
  );
};

export default Home;
