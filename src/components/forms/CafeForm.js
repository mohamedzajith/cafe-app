import React from "react";
import { reduxForm } from "redux-form";
import Button from "@mui/material/Button";
import { forms } from "../../utils/constants";
import TextField from "../formFields/TextFeild";
import { Box, Stack } from "@mui/system";

const CafeForm = (props) => {
  const { handleSubmit, reset, submitting, clickCancel, onFormSubmit } = props;

  const onSubmit = (formData) => {
    onFormSubmit && onFormSubmit();
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
        placeholder={"Enter your cafe name"}
      />
      <TextField
        field={"description"}
        label={"Description"}
        type={"text"}
        placeholder={"Enter your cafe description"}
        multiline={true}
        rows={4}
        defaultValue={"Type here"}
      />
      <TextField
        field={"logo"}
        label={"Logo"}
        type={"text"}
        placeholder={"Enter your cafe logo url"}
      />
      <TextField
        field={"location"}
        label={"Location"}
        type={"text"}
        placeholder={"Enter your cafe location"}
      />
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
          disabled={submitting}
        >
          Cancel
        </Button>
      </Stack>
    </form>
  );
};

export default reduxForm({
  form: forms.CAFE_FORM,
  destroyOnUnmount: false,
})(CafeForm);
