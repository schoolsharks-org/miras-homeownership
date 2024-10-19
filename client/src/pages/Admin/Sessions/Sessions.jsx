import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createSession,
  fetchSessions,
  getPastSession,
  getPastSessionReport,
} from "../../../app/adminSlice";
import { useNavigate } from "react-router-dom";
import { ArrowBack, Description, Mail } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";

const Sessions = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pastSessions } = useSelector((state) => state.admin);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [reportLoading, setReportLoading] = useState(null);

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  const sessionCreationHandler = () => {
    navigate("/admin/sessions/current-session/scoreboard");
  };

  const handleGetSessionReport = (sessionId) => {
    setReportLoading(sessionId);
    dispatch(getPastSessionReport({ sessionId }))
      .unwrap()
      .then(() => {
        setSnackbarMessage("Report sent to your email");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setReportLoading(null);
      })
      .catch((error) => {
        setSnackbarMessage(error);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setReportLoading(null);
      });
  };

  const handleGetPastSession = (sessionId) => {
    dispatch(getPastSession({ sessionId, navigate }));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Stack padding="12px 28px" minHeight="100vh">
      <IconButton
        sx={{ position: "absolute", top: "48px" }}
        onClick={() => navigate("/admin/home")}
      >
        <ArrowBack sx={{ color: theme.palette.primary.main }} />
      </IconButton>
      <Typography
        fontSize={"2rem"}
        marginTop="2rem"
        fontWeight={"700"}
        color={theme.palette.primary.main}
        textAlign={"center"}
      >
        Session
      </Typography>

      <Stack padding="0 10px" marginTop={"32px"}>
        <Stack gap="20px" marginTop={"12px"}>
          {pastSessions.map((session, index) => (
            <Stack
              key={session._id}
              direction={"row"}
              justifyContent={"space-between"}
              sx={{
                border: "2px solid #fff",
                borderRadius: "12px",
                padding: "12px",
                mixBlendMode: "difference",
              }}
            >
              <Typography
                color="#ffffff"
                fontSize={"1.2rem"}
                fontWeight={"400"}
                sx={{ mixBlendMode: "difference" }}
              >
                {pastSessions.length - index}
                {". "}
                {session.name}
              </Typography>
              <Stack direction={"row"} gap="16px">
                <Button
                  variant="contained"
                  onClick={() => handleGetSessionReport(session._id)}
                  startIcon={<Mail />}
                  sx={{ minWidth: "135px" }}
                >
                  {reportLoading === session._id ? (
                    <Stack
                      width="100%"
                      justifyContent="center"
                      alignItems={"center"}
                      height="100%"
                    >
                      <CircularProgress size={18} sx={{ color: "#fff" }} />
                    </Stack>
                  ) : (
                    "Get Report"
                  )}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleGetPastSession(session._id)}
                  startIcon={<Description />}
                >
                  View
                </Button>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Stack>
  );
};

export default Sessions;
