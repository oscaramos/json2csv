import { createMuiTheme } from "@material-ui/core/styles";

const MuiManatee = "#8D99AE";
const MuiImperialRed = "#EF233C";
const MuiAliceBlue = "#edf2f4";

export default createMuiTheme({
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
