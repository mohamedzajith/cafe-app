import { Button as CustomizeButton } from "@mui/material";
import * as React from "react";

const Button = ({ children, title, ...props }) => {
  return (
    <CustomizeButton variant={"contained"} size={"medium"} {...props}>
      {title}
    </CustomizeButton>
  );
};

export default Button;
