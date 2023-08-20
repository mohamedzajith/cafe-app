import React from "react";
import { reduxForm } from "redux-form";
import Button from "@mui/material/Button";
import { forms } from "../../utils/constants";
import TextField from "../formFields/TextFeild";
import { Box } from "@mui/system";

const EmployeeForm = (props) => {
  const { handleSubmit, clickCancel } = props;

  const onSubmit = (formData) => {
    console.log(formData);
  };
  const redirectTo = () => {
    clickCancel && clickCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        field={"name"}
        label={"Name"}
        type={"text"}
        placeholder={"Enter your name"}
      />
      <TextField
        field={"email"}
        label={"Email address"}
        type={"email"}
        placeholder={"Enter your email"}
      />
      <TextField
        field={"phone_number"}
        label={"Phone number"}
        type={"number"}
        placeholder={"Enter your phone number"}
      />
      <Box>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => redirectTo()}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default reduxForm({
  form: forms.EMPLOYEE_FORM,
  destroyOnUnmount: false,
})(EmployeeForm);
