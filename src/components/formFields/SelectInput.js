import React, { useState } from "react";
import { Field } from "redux-form";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  Select,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const renderSelectField = ({
  input,
  options,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <Box sx={{ py: 1 }}>
      <FormLabel id={custom.name}>{label}</FormLabel>
      <Select
        fullWidth={true}
        {...input}
        {...custom}
        inputProps={{
          name: input.name,
          id: "color-native-simple",
        }}
      >
        {options.map(({ value, label }) => {
          return <MenuItem value={value}>{label}</MenuItem>;
        })}
      </Select>
      {renderFromHelper({ touched, error })}
    </Box>
  );
};

const SelectInput = ({
  field,
  type,
  pattern,
  label,
  placeholder,
  onChange,
  onEnter,
  onBlur,
  options,
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
      component={renderSelectField}
      options={options}
    />
  );
};

export default SelectInput;
