import React from "react";
import { Field } from "redux-form";
import { Box, FormLabel, TextField as CustomTextField } from "@mui/material";

const required = (value) => (value ? undefined : "Required");
const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <Box sx={{ py: 1 }}>
    <FormLabel id={custom.name}>{label}</FormLabel>
    <CustomTextField
      variant="outlined"
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
