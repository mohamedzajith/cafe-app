import React from "react";
import { Field } from "redux-form";
import { Box, TextField as CustomTextField } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const renderDateFeild = ({
  input,
  label,
  defaultValue,
  meta: { touched, error },
  ...custom
}) => (
  <Box sx={{ py: 1 }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DemoItem label={label}>
          <DatePicker
            defaultValue={dayjs(defaultValue).format("DD/MM/YYYY")}
            {...input}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  </Box>
);

const DateFeild = ({
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
      component={renderDateFeild}
    />
  );
};

export default DateFeild;
