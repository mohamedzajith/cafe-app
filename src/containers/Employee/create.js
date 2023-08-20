import * as React from "react";
import { Box, Stack } from "@mui/system";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { memo, useEffect } from "react";
import { reduxForm, reset } from "redux-form";
import { forms } from "../../utils/constants";
import Typography from "@mui/material/Typography";
import { submitEmployee } from "../../store/actions/employeeAction";
import {
  makeEmployeeCreateInitialValues,
  makeEmployeePayload,
} from "../../store/selector/employeeSelector";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";
import EmployeeForm from "../../components/forms/EmployeeForm";
import {
  makeCafesList,
  makeCafesOptions,
} from "../../store/selector/cafeSelector";
import { fetchCafes } from "../../store/actions/cafeAction";
import { initializeForm } from "../../store/actions";

const EmployeeCreateHOC = (props) => {
  const {
    cafesOptions,
    fetchCafes,
    createEmployee,
    payload,
    resetForm,
    initializeForm,
    initialValues,
  } = props;
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/employees");
  };
  const create = async () => {
    const res = await createEmployee(payload);
    if (res.status === 200) {
      goBack();
    }
  };

  useEffect(() => {
    fetchCafes();
    resetForm();
    initializeForm(initialValues);
  }, []);

  return (
    <AdminLayout>
      <Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "space-between", sm: "space-between" }}
          alignItems="center"
          spacing={{ xs: 1, sm: 2 }}
          sx={{ py: 2 }}
        >
          <Typography component={"h1"} variant="h3" gutterBottom>
            Create New Employees
          </Typography>
        </Stack>
        <EmployeeForm
          clickCancel={() => goBack()}
          cafesOptions={cafesOptions}
          onFormSubmit={() => create()}
        />
      </Box>
    </AdminLayout>
  );
};

const mapStateToProps = createStructuredSelector({
  cafesOptions: makeCafesOptions(),
  payload: makeEmployeePayload(),
  initialValues: makeEmployeeCreateInitialValues(),
});

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchCafes: (query) => dispatch(fetchCafes(query)),
    createEmployee: (payload) => dispatch(submitEmployee(payload)),
    resetForm: () => dispatch(reset(forms.EMPLOYEE_FORM)),
    initializeForm: (initialValues) =>
      dispatch(
        initializeForm({
          form: forms.EMPLOYEE_FORM,
          data: initialValues,
        }),
      ),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  reduxForm({
    form: forms.EMPLOYEE_FORM,
    destroyOnUnmount: false,
  }),
  memo,
)(EmployeeCreateHOC);
