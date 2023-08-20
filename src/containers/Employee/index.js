import * as React from "react";
import { Box, Stack } from "@mui/system";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { memo, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "../../components/core/Button";
import EmployeeTable from "../../components/tables/employeeTable";
import {deleteEmployee, fetchEmployees} from "../../store/actions/employeeAction";
import { makeEmployeesList } from "../../store/selector/employeeSelector";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {get, isEmpty} from "lodash"

const EmployeeHOC = (props) => {
  const { fetchEmployees, employeesList, deleteEmployee } = props;
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries([...searchParams]);
  const isAction = get(query, "name") || get(query, "cafe")

  useEffect(() => {
    fetchEmployees(query);
  }, []);

  const isEmployeeDelete = (employeeInfo) => {
    MySwal.fire({
      title: `Are you sure delete ${employeeInfo.name} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteEmployee(employeeInfo.id)
        if (res.status === 200) {
          Swal.fire("Deleted!", "Your cafe has been deleted.", "success");
          navigate(0);
        }

      }
    });
  };

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
           { isEmpty(isAction) &&<Button
            title={"Create Employee"}
            onClick={() => navigate("/employee/create")}
          />}
        </Stack>
        <EmployeeTable employees={employeesList} employeeDelete={isEmployeeDelete} actionView={isEmpty(isAction)}/>
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
    deleteEmployee: (id) => dispatch(deleteEmployee(id)),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(EmployeeHOC);
