import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#01416A",
    },
    secondary: {
      main: "#F48274"
    },
    background: {
      main: "#F9E6CE",
      secondary: "#FFFBF6"
    },
    text: {
      main: "#1A1A1A",
      secondary: "#444444",
      tertiary: "#6C6C6C"
    }
  },
  typography: {
    fontFamily: "Poppins",
    h1: {
      fontFamily: "Roboto"
    },
    h2: {
      fontFamily: "Roboto"
    },
    h3: {
      fontFamily: "Roboto"
    },
    h4: {
      fontFamily: "Roboto"
    },
    h5: {
      fontFamily: "Roboto"
    },
    h6: {
      fontFamily: "Roboto"
    },
    body1: {
      fontFamily: "DM Sans"
    },
    body2: {
      fontFamily: "DM Sans"
    }
  }
});

export default theme;
