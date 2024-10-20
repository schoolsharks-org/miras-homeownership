import { Stack, Typography, useTheme, Grid, Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import TotalPlayers from "../components/TotalPlayers";
import FlipMove from "react-flip-move";
import CountUp from "react-countup";
import ScoreboardButtons from "../components/ScoreboardButtons";
import qrCode from "../QR_CODE/qr-code.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import homeIcon from "../assets/homeIcon.svg"
import { HomeOutlined } from "@mui/icons-material";

const Scoreboard = ({ role, totalPlayers, leaderboardData }) => {
  const theme = useTheme();
  const [players, setPlayers] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();
  const previousLeaderboardRef = useRef([]);

  useEffect(() => {
    let interval;

    if (role != "prevSession") {
      const getLeaderboard = async () => {
        const response = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/admin/scoreboard"
        );
        setLeaderboard(response.data?.leaderboard);
        setPlayers(response.data?.totalPlayers);
      };
      getLeaderboard();

      interval = setInterval(() => {
        getLeaderboard();
      }, 5000);
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    } else {
      setPlayers(totalPlayers);
      setLeaderboard(leaderboardData);
    }
  }, []);

  return (
    <Stack
      width="100%"
      height={`${window.innerHeight < 616 ? 616 : window.innerHeight}px`}
      margin={"auto"}
      alignItems={"center"}
      sx={{
        overflow: "hidden",
      }}
    >
      {role === "admin" ? (
        <Stack
          direction={"row"}
          alignItems={"center"}
          width={"98%"}
          padding={"48px 16px 12px"}
          position={"relative"}
        >
          <Box
            onClick={() => navigate("/admin/home")}
            bgcolor={theme.palette.primary.main}
            padding={"8px"}
            color={"#ffffff"}
            height={"max-content"}
            borderRadius={"8px"}
            sx={{ cursor: "pointer", position: "absolute", left: "16px" }}
          >
           <HomeOutlined sx={{fontSize:"1.7rem",color:"#ffffff"}}/>
          </Box>
          <Typography
            variant="h5"
            fontWeight="700"
            textAlign="center"
            justifySelf={"center"}
            flex={"1"}
            color={theme.palette.primary.main}
          >
            Score Board
          </Typography>
          <img
            src={qrCode}
            alt=""
            style={{
              width: "90px",
              borderRadius: "12px",
              justifySelf: "flex-end",
              position: "absolute",
              right: "16px",
            }}
          />
        </Stack>
      ) : (
        <Typography
          variant="h5"
          fontWeight="700"
          textAlign="center"
          color={theme.palette.primary.main}
          marginTop="16px"
        >
          Score Board
        </Typography>
      )}

      <TotalPlayers players={players} />
      <Box
        color={theme.palette.primary.main}
        component={FlipMove}
        sx={{
          display: "flex",
          maxWidth: "900px",
          flexDirection: "column",
          alignItems: "center",
          width: "90%",
          margin: "60px auto 0",
        }}
      >
        <Grid
          container
          sx={{ width: "100%", margin: "auto" }}
          gap={"12px"}
          justifyContent={"center"}
        >
          <Grid item xs={1.5}>
            <Typography fontWeight="700" fontSize="1rem" textAlign="left">
              Name
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography fontWeight="700" fontSize="1rem" textAlign="center">
              Rank
            </Typography>
          </Grid>
          <Grid item xs={1.5}>
            <Typography fontWeight="700" fontSize="1rem" textAlign="center">
              Time
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontWeight="700" fontSize="1rem" textAlign="center">
              Bank Balance
            </Typography>
          </Grid>
          <Grid item xs={1.5}>
            <Typography fontWeight="700" fontSize="1rem" textAlign="center">
              Investments
            </Typography>
          </Grid>
          <Grid item xs={1.5}>
            <Typography fontWeight="700" fontSize="1rem" textAlign="right">
              Total Wealth
            </Typography>
          </Grid>
        </Grid>
        {leaderboard?.map((player, index) => {
          const prevPlayer =
            previousLeaderboardRef.current.find(
              (p) => p.name === player?.name
            ) || {};
          return (
            <Grid
              container
              key={player?._id}
              gap={"12px"}
              justifyContent={"center"}
              sx={{
                color: index > 4 ? "#ffffff" : "inherit",
                marginTop: role === "admin" ? "8px" : "2px",
              }}
            >
              <Grid item xs={1.5}>
                <Typography
                  fontWeight="500"
                  textAlign="left"
                  fontSize={"1rem"}
                  margin="3px 0"
                >
                  {player?.name?.split(" ")[0].slice(0, 10)}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography
                  fontWeight="500"
                  textAlign="center"
                  fontSize={role === "admin" ? "1rem" : "0.9rem"}
                  margin="3px 0"
                >
                  {index + 1}
                </Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Typography
                  fontWeight="500"
                  textAlign="center"
                  fontSize={role === "admin" ? "1rem" : "0.9rem"}
                  margin="3px 0"
                >
                  {player?.avgResponseTime}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  fontWeight="500"
                  textAlign="center"
                  fontSize={role === "admin" ? "1rem" : "0.9rem"}
                  margin="3px 0"
                >
                  <CountUp
                    start={prevPlayer?.wealth || 0}
                    end={player?.wealth}
                    duration={1}
                  />
                </Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Typography
                  fontWeight="500"
                  textAlign="center"
                  fontSize={role === "admin" ? "1rem" : "0.9rem"}
                  margin="3px 0"
                >
                  <CountUp
                    start={prevPlayer?.investment || 0}
                    end={player?.investment}
                    duration={1}
                  />
                </Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Typography
                  fontWeight="500"
                  textAlign="right"
                  fontSize={role === "admin" ? "1rem" : "0.9rem"}
                  margin="3px 0"
                >
                  <CountUp
                    start={prevPlayer?.totalWealth || 0}
                    end={player?.totalWealth}
                    duration={1}
                  />
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Box>

      <ScoreboardButtons role={role} />
    </Stack>
  );
};

export default Scoreboard;
