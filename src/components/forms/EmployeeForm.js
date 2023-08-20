import React from "react";
import { reduxForm } from "redux-form";
import Button from "@mui/material/Button";
import { forms } from "../../utils/constants";
import TextField from "../formFields/TextFeild";
import { Stack } from "@mui/system";
import RadioGroup from "../formFields/RadioGroup";
import SelectInput from "../formFields/SelectInput";

const EmployeeForm = (props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    clickCancel,
    cafesOptions,
    onFormSubmit,
  } = props;

  const onSubmit = (formData) => {
    onFormSubmit && onFormSubmit()
  };
  const redirectTo = () => {
    reset();
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
      <RadioGroup
        field={"gender"}
        label={"Gender"}
        options={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
        ]}
      />
      <TextField
        field={"phone_number"}
        label={"Phone number"}
        type={"number"}
        placeholder={"Enter your phone number"}
      />
      <SelectInput field={"cafe"} label={"Cafe"} options={cafesOptions} />
      {/*<DateFeild*/}
      {/*  field={"start_date"}*/}
      {/*  label={"Start Date"}*/}
      {/*  defaultValue={"04/12/2023"}*/}
      {/*/>*/}
      <Stack
        direction={{ xs: "row" }}
        // justifyContent={{ xs: "space-between", sm: "space-between" }}
        alignItems="center"
        spacing={{ xs: 1 }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitting}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => redirectTo()}
          disabled={pristine || submitting}
        >
          Cancel
        </Button>
      </Stack>
    </form>
  );
};

export default reduxForm({
  form: forms.EMPLOYEE_FORM,
  destroyOnUnmount: false,
})(EmployeeForm);
