import React from "react";
import { Field } from "redux-form";
import { Box, TextField as CustomTextField } from "@mui/material";

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <Box sx={{ py: 1 }}>
    <CustomTextField
      variant="outlined"
      label={label}
      fullWidth={true}
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  </Box>
);

const TextField = ({
  field,
  type,
  pattern,
  label,
  placeholder,
  onChange,
  onEnter,
  onBlur,
}) => {
  if (!field) {
    return null;
  }

  const inputType = type === "number" ? "text" : type;

  return (
    <Field
      name={field}
      type={inputType}
      label={label}
      placeholder={placeholder}
      component={renderTextField}
    />
  );
};

export default TextField;
