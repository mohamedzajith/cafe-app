import * as React from "react";
import { Box, Stack } from "@mui/system";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { memo, useEffect } from "react";
import { reduxForm } from "redux-form";
import { forms } from "../../utils/constants";
import Typography from "@mui/material/Typography";
import {
  fetchEmployees,
  submitEmployee,
} from "../../store/actions/employeeAction";
import {
  makeEmployeePayload,
  makeEmployeesList,
} from "../../store/selector/employeeSelector";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";
import EmployeeForm from "../../components/forms/EmployeeForm";
import {
  makeCafesList,
  makeCafesOptions,
} from "../../store/selector/cafeSelector";
import { fetchCafes } from "../../store/actions/cafeAction";

const EmployeeCreateHOC = (props) => {
  const { cafesOptions, fetchCafes, createEmployee, payload } = props;
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/employees");
  };
  const create = async () => {
    const res = await createEmployee(payload);
    if (res.status === 200 ){
      goBack()
    }
  };

  useEffect(() => {
    fetchCafes();
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
  employeesList: makeEmployeesList(),
  cafesOptions: makeCafesOptions(),
  payload: makeEmployeePayload(),
});

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmployees: (query) => dispatch(fetchEmployees(query)),
    fetchCafes: (query) => dispatch(fetchCafes(query)),
    createEmployee: (payload) => dispatch(submitEmployee(payload)),
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
