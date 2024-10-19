import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { handleHaptic } from "../utils/haptic";

const SwipeBar = ({ onSwipe }) => {
  const [isActive, setIsActive] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [side, setSide] = useState("");
  const theme=useTheme()
  const isLargeScreen=useMediaQuery(theme.breakpoints.up("md"))
  const handleStart = (x, type) => {
    setIsActive(true);
    setStartX(x);
    setStartTime(Date.now());
    setSide(x < window.innerWidth / 2 ? "LEFT" : "RIGHT");
    handleHaptic();
  };

  const handleEnd = (x) => {
    setIsActive(false);
    const endX = x;
    const elapsedTime = Date.now() - startTime;
    const distance = Math.abs(startX - endX);
    const velocity = distance / elapsedTime;
    if (distance > 150 && velocity > 0.5) {
      handleHaptic();
      if (onSwipe) {
        onSwipe();
      }
    }
  };

  const handleOnTouchStart = (e) => {
    handleStart(e.targetTouches[0].clientX, "touch");
  };

  const handleOnTouchEnd = (e) => {
    handleEnd(e.changedTouches[0].clientX);
  };

  const handleOnMouseDown = (e) => {
    handleStart(e.clientX, "mouse");
  };

  const handleOnMouseUp = (e) => {
    if(isLargeScreen){
      onSwipe();
    }
    handleEnd(e.clientX);
  };

  return (
    <Stack
      direction="row"
      onTouchStart={handleOnTouchStart}
      onTouchEnd={handleOnTouchEnd}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      sx={{
        margin: "0 32px",
        border: "2px solid #ffffff",
        color: "#ffffff",
        padding: "1rem",
        cursor:"pointer",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "20px",
        gap: "1.5rem",
        scale: isActive ? "1.05" : "1",
        transition: "scale 0.3s ease",
        userSelect: "none",
        position: "relative",
      }}
    >
     {!isLargeScreen && <ArrowBack
        sx={{
          fontSize: "1rem",
          display: isActive && side === "LEFT" ? "none" : "block",
          position: "absolute",
          left: "40px",
          transition: "all 0.3s ease",
          transform: isActive && side === "RIGHT" ? "translateX(-20px)" : "translateX(0)",
        }}
      />}
      <Typography
        variant="body1"
        fontSize={"1.25rem"}
        textAlign={"center"}
        sx={{
          transition: "all 0.3s ease",
          transform: isActive && !isLargeScreen
            ? side === "LEFT"
              ? "translateX(20px)"
              : "translateX(-20px)"
            : "none",
        }}
      >
        {isLargeScreen?"Get Started": "Swipe to Begin"}
      </Typography>
      {!isLargeScreen &&  <ArrowForward
        sx={{
          fontSize: "1rem",
          display: isActive && side === "RIGHT" ? "none" : "block",
          position: "absolute",
          right: "40px",
          transition: "all 0.3s ease",
          transform: isActive && side === "LEFT" ? "translateX(20px)" : "translateX(0)",
        }}
      />}
    </Stack>
  );
};

export default SwipeBar;
