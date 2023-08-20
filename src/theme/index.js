import { createTheme } from "@mui/material/styles";

// color Variables
const WHITE = "#ffffff";
const PETROL_GREEN = "#1f262b";
const GREEN = "#529969";
const LIGHT_GREEN = "#b6d948";
const YELLOW = "#f0cf4a";
const ORANGE = "#ed884a";
const PINK = "#ed99b2";
const LIGHT_BLUE = "#f0f5f7";

// Create a theme instance.
const theme = createTheme({
  direction: "ltr",
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export default theme;
