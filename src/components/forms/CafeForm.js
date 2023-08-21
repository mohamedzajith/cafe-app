import React from "react";
import {getFormSyncErrors, reduxForm} from "redux-form";
import Button from "@mui/material/Button";
import { forms } from "../../utils/constants";
import TextField from "../formFields/TextFeild";
import { Box, Stack } from "@mui/system";
import validate from "../../utils/validate";
import {connect} from "react-redux";
import {compose} from "redux";

const validations = [
  {
    field: "location",
    message: "cannot be blank",
    type: "presence",
  },
  {
    field: "name",
    message: "cannot be blank",
    type: "presence",
  },
  {
    field: "name",
    message: "Maximum length 10 digits",
    max_length: 10,
    type: "maxLength",
  },
  {
    field: "name",
    message: "Minimum length 6 digits",
    min_length: 6,
    type: "minLength",
  },
  {
    field: "description",
    message: "cannot be blank",
    type: "presence",
  },
  {
    field: "description",
    message: "Maximum length 256 digits",
    max_length: 256,
    type: "maxLength",
  },
]
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


const mapStateToProps = state => ({
  validations: validations,
  syncErrors: getFormSyncErrors(forms.CAFE_FORM)(state),
})

const mapDispatchToProps = dispatch => ({
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: forms.CAFE_FORM,
    destroyOnUnmount: false,
    validate
  })
)(CafeForm)
