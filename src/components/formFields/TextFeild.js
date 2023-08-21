import React from "react";
import { Field } from "redux-form";
import { Box, FormLabel, TextField as CustomTextField } from "@mui/material";

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
        error={touched && error}
        helperText={touched && error}
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
      onChange={onChange}
      onEnter={onEnter}
      onBlur={onBlur}
    />
  );
};

export default TextField;
