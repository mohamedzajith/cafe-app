import React from "react";
import { reduxForm } from "redux-form";
import Button from "@mui/material/Button";
import { forms } from "../../utils/constants";
import TextField from "../formFields/TextFeild";
import { Box } from "@mui/system";

const CafeForm = (props) => {
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
        placeholder={"Enter your cafe name"}
      />
      <TextField
        field={"email"}
        label={"Email address"}
        type={"email"}
        placeholder={"Enter your cafe email"}
      />
      <TextField
        field={"location"}
        label={"Location"}
        type={"text"}
        placeholder={"Enter your cafe location"}
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
  form: forms.CAFE_FORM,
  destroyOnUnmount: false,
})(CafeForm);
