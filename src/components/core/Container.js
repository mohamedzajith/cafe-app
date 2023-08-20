import { Container as CustomizeContainer } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import theme from "../../theme";

const Container = (props) => {
  const { maxWidth = "lg", children, sx, psx } = props;
  return (
    <CustomizeContainer
      sx={{
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
          px: 2,
        },
        [theme.breakpoints.between("sm", "lg")]: {
          px: 4,
        },
        ...psx,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: maxWidth, ...sx }}>{children}</Box>
    </CustomizeContainer>
  );
};

export default Container;
