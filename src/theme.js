import { createTheme } from "@material-ui/core/styles";

const MuiWeldonBlue = "#7e93b3";
const MuiImperialRed = "#EF233C";
const MuiAliceBlue = "#edf2f4";

export default createTheme({
  palette: {
    primary: {
      main: MuiWeldonBlue,
    },
    secondary: {
      main: MuiImperialRed,
    },
    background: {
      default: MuiAliceBlue,
    },
  },
});
