import * as React from "react";
import { Box, Stack } from "@mui/system";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { memo } from "react";
import { reduxForm } from "redux-form";
import { forms } from "../../utils/constants";
import Typography from "@mui/material/Typography";
import { fetchEmployees } from "../../store/actions/employeeAction";
import { makeEmployeesList } from "../../store/selector/employeeSelector";
import {useNavigate} from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";
import EmployeeForm from "../../components/forms/EmployeeForm";

const EmployeeCreateHOC = (props) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/employees")
  }

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
        <EmployeeForm clickCancel={() => goBack()} />
      </Box>
    </AdminLayout>
  );
};

const mapStateToProps = createStructuredSelector({
  employeesList: makeEmployeesList(),
});

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmployees: (query) => dispatch(fetchEmployees(query)),
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
