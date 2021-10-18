import { createTheme } from "@material-ui/core/styles";

const MuiManatee = "#8D99AE";
const MuiImperialRed = "#EF233C";
const MuiAliceBlue = "#edf2f4";

export default createTheme({
  palette: {
    primary: {
      main: MuiManatee,
    },
    secondary: {
      main: MuiImperialRed,
    },
    background: {
      default: MuiAliceBlue,
    },
  },
});
