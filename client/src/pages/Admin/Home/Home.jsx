import { Button, CircularProgress, Dialog, Stack, Typography, useTheme } from "@mui/material";
import qrCode from "../../../QR_CODE/qr-code.webp";
import { useNavigate } from "react-router-dom";
import { closeSession } from "../../../app/adminSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import graphic from "../../../assets/sniff-and-tail-bg.webp"

const Home = () => {
  const theme = useTheme();
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const [closeDialog, setCloseDialog] = useState(false);
  const [closeSessionLoading,setCloseSessionLoading]=useState(false)

  const handleSessionClose = () => {
    setCloseSessionLoading(true);
    dispatch(closeSession())
      .unwrap()
      .then(() => {
        setCloseSessionLoading(false);
      })
      .catch((error) => {
        console.error("Failed to close session:", error);
      })
      .finally(() => {
        setCloseSessionLoading(false);
        setCloseDialog(false);
      });
  };

  return (
    <>
    <Stack padding={"60px 120px"}>
      <Typography
        fontSize="3.5rem"
        color={theme.palette.primary.main}
        fontWeight={"700"}
        sx={{textShadow:"0 0 10px #ffffff"}}
      >
        Mira’s Path to Homeownership
      </Typography>
      <Typography
        fontSize="2rem"
        color={theme.palette.primary.main}
        fontWeight={"500"}
        marginTop={"26px"}
      >
        The goal is to accumulate enough wealth to purchase a home worth INR 75 lakhs by making smart financial decisions.
      </Typography>
      <Typography
        fontSize="2rem"
        color={theme.palette.primary.main}
        fontWeight={"500"}
        marginTop={"12px"}
      >
        Starting Bank Balance: INR 10,000 <br/>
        Investment : INR 500 is invested every month, with a 10% annual increase.
      </Typography>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        marginTop={"24px"}
      >
        <Stack flex={"1"} justifyContent={"space-between"}>
          <Stack direction={"row"} gap={"30px"}>
          {/* <Typography color={"#ffffff"} fontSize={"1.5rem"} fontWeight="500">
            Play to: <br />
            Maximise Wealth <br />
            Maximise Customer Happiness
          </Typography> */}
          <Button
            variant="outlined"
            onClick={()=>navigate("/admin/sessions/current-session/scoreboard")}
            sx={{
              color: "#ffffff",
              marginTop:"24px",
              border: "3px solid #ffffff",
              width: "max-content",
              textTransform: "none",
              fontSize: "1.5rem",
              borderRadius: "16px",
              "&:hover": { border: "3px solid #ffffff" },
            }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            onClick={()=>navigate("/admin/sessions")}
            sx={{
              color: "#ffffff",
              marginTop:"24px",
              border: "3px solid #ffffff",
              width: "max-content",
              textTransform: "none",
              borderRadius: "12px",
              fontSize:"1.5rem",
              "&:hover": { border: "3px solid #ffffff" },
            }}
          >
            View All Reports
          </Button>
          </Stack>
          <Stack marginTop={"18px"}>
            <img src={graphic} alt="" style={{width:"380px"}} />
          {/* <Button
            variant="outlined"
            onClick={()=>setCloseDialog(true)}
            sx={{
              color: "#ffffff",
              marginTop:"24px",
              border: "2px solid #ffffff",
              width: "max-content",
              textTransform: "none",
              borderRadius: "12px",
              fontSize:"1.25rem",
              "&:hover": { border: "2px solid #ffffff" },
            }}
          >
            Create New
          </Button> */}
          {/* <Button
            variant="outlined"
            onClick={()=>navigate("/admin/sessions")}
            sx={{
              color: "#ffffff",
              marginTop:"24px",
              border: "2px solid #ffffff",
              width: "max-content",
              textTransform: "none",
              borderRadius: "12px",
              fontSize:"1.25rem",
              "&:hover": { border: "2px solid #ffffff" },
            }}
          >
            View All Reports
          </Button> */}
          </Stack>
        </Stack>

        <img
          src={qrCode}
          alt=""
          style={{ borderRadius: "12px", maxWidth: "320px" }}
        />
      </Stack>
    </Stack>
    <Dialog open={closeDialog} onClose={() => setCloseDialog(false)}>
    <Stack padding="1.5rem">
      <Typography fontSize={"20px"}>
        Are you sure you want to create new session?
      </Typography>
      <Stack
        direction={"row"}
        marginTop={"1rem"}
        gap="20px"
        marginLeft={"auto"}
      >
        <Button variant="contained" onClick={handleSessionClose}>
          {closeSessionLoading?<Stack width="100%" justifyContent="center" alignItems={"center"} height="100%"><CircularProgress size={18} sx={{color:"#fff"}}/></Stack>:"Yes"}
        </Button>
        <Button variant="outlined" onClick={() => setCloseDialog(false)}>
          Cancel{" "}
        </Button>
      </Stack>
    </Stack>
  </Dialog>
  </>
  );
};

export default Home;
