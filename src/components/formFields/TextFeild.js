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
  multiline,
  rows,
  defaultValue,
  type,
  ...custom
}) => {
  return (
    <Box sx={{ py: 1 }}>
      <FormLabel id={custom.name}>{label}</FormLabel>
      <CustomTextField
        variant="outlined"
        fullWidth={true}
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        type={type}
        multiline={multiline}
        rows={rows}
        defaultValue={defaultValue}
        {...input}
        {...custom}
      />
    </Box>
  );
};

const TextField = ({
  field,
  type,
  pattern,
  label,
  placeholder,
  onChange,
  onEnter,
  onBlur,
  multiline = false,
  rows = 1,
  defaultValue = "",
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
      multiline={multiline}
      rows={rows}
      defaultValue={defaultValue}
    />
  );
};

export default TextField;
