import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

const TotalPlayers = ({players}) => {
  const theme = useTheme();
  

  return (
    <Stack position="relative" marginTop={"2.5rem"} width="100%">
      <Box
        sx={{
          height: "4px",
          margin: "0 20px",
          borderRadius: "5px",
          bgcolor: theme.palette.primary.main,
        }}
      />
      <Stack
        sx={{
          alignItems:"center",
          justifyContent:"center",
          borderRadius: "50%",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          border: `6px solid #44799B`,
          aspectRatio: "1/1",
          width:"70px",
          height:"70px",
          // padding: "0.8rem",
          bgcolor: theme.palette.background.main,
          boxShadow: "inset 0px 0px 20px #ffffff",
        }}
      >
        <Typography
          fontSize="1rem"
          color={theme.palette.primary.main}
          fontWeight="900"
        >
          {players}
        </Typography>
        <Typography color="#B89472" fontSize={"0.7rem"} fontWeight="700">
          Players
        </Typography>
      </Stack>
    </Stack>
  );
};

export default TotalPlayers;
