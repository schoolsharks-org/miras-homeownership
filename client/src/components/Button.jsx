import { Stack } from "@mui/material";
import React from "react";
import { handleHaptic } from "../utils/haptic";

const Button = ({ children }) => {
  return (
    <Stack
      onClick={() => handleHaptic()}
      border="6px solid #44799B"
      borderRadius={"50%"}
      width="fit-content"
      sx={{
        transition: "all 0.3s ease",
        cursor:"pointer",
        "&:active": { transform: "Scale(1.2)" },
      }}
      >
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        border={"4px solid #fff"}
        bgcolor="#ECD3B6"
        width="fit-content"
        padding="0.4rem"
        height="auto"
        borderRadius={"50%"}
        color="#00416A"
        sx={{ aspectRatio: "1/1" }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default Button;
