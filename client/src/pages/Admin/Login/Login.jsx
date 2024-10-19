import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { PIN } from "../../../components/Admin/Pin";
import QRCode from "../../../QR_CODE/qr-code.webp";
import { checkAuth } from "../../../services/auth/adminAuth";
import { useDispatch, useSelector } from "react-redux";
import {Navigate, useNavigate} from "react-router-dom"

const Login = () => {
  const [pin, setPin] = useState("");
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const {loggedIn,error} = useSelector(state=>state.admin)

  const handleSubmit = () => {
    const response=checkAuth(pin, dispatch);
    if(response.success){
      navigate("/admin/home")
    }
  };

  useEffect(()=>{
    if(loggedIn){
      navigate("/admin/home")
    }
  },[loggedIn,navigate])
  
  return (
    <Stack alignItems={"center"} minHeight={`${window.innerHeight<616?616:window.innerHeight}px`} height={"max-content"} >
      <Stack marginTop="3em" alignItems={"center"}>
        <Typography
          fontSize={"2rem"}
          fontWeight={"700"}
          color={theme.palette.primary.main}
        >
          Admin Login
        </Typography>
        <Stack marginTop="43px">
          <PIN value={pin} onChange={setPin} length={4} />
        </Stack>
        <Typography textAlign="center" color="#d81d1d" marginTop={"16px"}>{error}</Typography>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ borderRadius: "24px", padding: "8px 48px", marginTop: "43px" }}
        >
          Login
        </Button>
        <Box
          sx={{
            width: "250px",
            marginTop: "48px",
          }}
        >
          <img src={QRCode} style={{ width: "100%" }} />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Login;
