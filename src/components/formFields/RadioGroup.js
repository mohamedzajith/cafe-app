import React from "react";
import { Field } from "redux-form";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as CustomRadioGroup,
} from "@mui/material";

const radioButton = ({ input, options, ...rest }) => {
  return (
    <Box sx={{ py: 1 }}>
      <FormLabel id={rest.name}>{rest.label}</FormLabel>
      <CustomRadioGroup {...input} {...rest} row={true}>
        {options.map(({ value, label }) => {
          return (
            <FormControlLabel value={value} control={<Radio />} label={label} />
          );
        })}
      </CustomRadioGroup>
    </Box>
  );
};

const RadioGroup = ({
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
      component={radioButton}
      options={options}
    />
  );
};

export default RadioGroup;
