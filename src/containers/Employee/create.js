import * as React from "react";
import { Box, Stack } from "@mui/system";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { memo, useEffect } from "react";
import { reduxForm } from "redux-form";
import { forms } from "../../utils/constants";
import Typography from "@mui/material/Typography";
import Button from "../../components/core/Button";
import EmployeeTable from "../../components/tables/employeeTable";
import { fetchEmployees } from "../../store/actions/employeeAction";
import { makeEmployeesList } from "../../store/selector/employeeSelector";
import { useSearchParams } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";

const EmployeeCreateHOC = (props) => {
  const { fetchEmployees, employeesList } = props;
  let [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries([...searchParams]);

  useEffect(() => {
    fetchEmployees(query);
  }, [query, fetchEmployees]);
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
            Employees List
          </Typography>
          <Button title={"Create Employee"} />
        </Stack>
        <EmployeeTable employees={employeesList} />
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
