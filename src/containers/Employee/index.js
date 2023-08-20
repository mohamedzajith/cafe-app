import * as React from "react";
import { Box, Stack } from "@mui/system";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { memo, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "../../components/core/Button";
import EmployeeTable from "../../components/tables/employeeTable";
import { fetchEmployees } from "../../store/actions/employeeAction";
import { makeEmployeesList } from "../../store/selector/employeeSelector";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const EmployeeHOC = (props) => {
  const { fetchEmployees, employeesList } = props;
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
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
          <Button
            title={"Create Employee"}
            onClick={() => navigate("/employee/create")}
          />
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

export default compose(withConnect, memo)(EmployeeHOC);
