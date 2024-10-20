import {
  Box,
  Dialog,
  Stack,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import OurButton from "./Button";
import { HomeOutlined, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeSession } from "../app/adminSlice";
import homeIcon from "../assets/homeIcon.svg"

const ScoreboardButtons = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeDialog, setCloseDialog] = useState(false);
  const [closeSessionLoading, setCloseSessionLoading] = useState(false);

  const handleSessionClose = () => {
    setCloseSessionLoading(true);
    dispatch(closeSession())
      .unwrap()
      .then(() => {
        setCloseSessionLoading(false);
        navigate("/admin/home");
      })
      .catch((error) => {
        console.error("Failed to close session:", error);
      })
      .finally(() => {
        setCloseSessionLoading(false);
        setCloseDialog(false);
      });
  };

  // const handleRefresh=()=>{
  //   setRotateRefresh(true)
  //   setTimeout(()=>{
  //     setRotateRefresh(false)
  //   },1000)
  // }
  // useEffect(() => {
  //   const pathname = window.location.pathname;
  //   const parts = pathname.split("/");
  //   const lastEndpoint = parts[parts.length - 1];
  //   if (lastEndpoint === "leaderboard") {
  //     setPath("leaderboard");
  //   }
  //   if (lastEndpoint === "scoreboard") {
  //     setPath("scoreboard");
  //   }
  // }, []);

  if (!role) {
    return null;
  }

  return (
    <Stack
      alignItems="center"
      position="relative"
      marginTop={"auto"}
      marginBottom={"35px"}
      height="auto"
      // bottom="50px"
      left="0"
      width="100%"
    >
      <Box
        height="35px"
        sx={{ width: "12px", transform: "translateY(50%)" }}
      ></Box>
      <Box width="80%" height="4px" bgcolor="#fff" borderRadius="4px" />
      <Box
        position="absolute"
        height={"70px"}
        onClick={() => navigate("/admin/home")}
        sx={
          role != "prevSession"
            ? {
                top: "100%",
                left: "40%",
                transform: "translateX(-27%) translateY(-50%)",
              }
            : {
                top: "100%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
              }
        }
      >
        <OurButton>
            <img src={homeIcon} alt="Home" style={{width:"32px",objectFit:"contain"}}/>
        </OurButton>
      </Box>
      {role != "prevSession" && (
        <Box
          onClick={() => setCloseDialog(true)}
          position="absolute"
          right="40%"
          sx={{
            top: "100%",
            transform: "translateX(27%) translateY(-50%)",
          }}
        >
          <OurButton>
            <Refresh sx={{ fontSize: "1.9rem" }} />
          </OurButton>
        </Box>
      )}

      <Dialog open={closeDialog} onClose={() => setCloseDialog(false)}>
        <Stack padding="1.5rem">
          <Typography fontSize={"20px"}>
            Are you sure you want to reset the session?
          </Typography>
          <Stack
            direction={"row"}
            marginTop={"1rem"}
            gap="20px"
            marginLeft={"auto"}
          >
            <Button variant="contained" onClick={handleSessionClose}>
              {closeSessionLoading ? (
                <Stack
                  width="100%"
                  justifyContent="center"
                  alignItems={"center"}
                  height="100%"
                >
                  <CircularProgress size={18} sx={{ color: "#fff" }} />
                </Stack>
              ) : (
                "Yes"
              )}
            </Button>
            <Button variant="outlined" onClick={() => setCloseDialog(false)}>
              Cancel{" "}
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default ScoreboardButtons;
