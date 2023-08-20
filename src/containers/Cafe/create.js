import * as React from "react";
import { Box, Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import AdminLayout from "../../components/layouts/AdminLayout";
import { createStructuredSelector } from "reselect";
import { makeEmployeesList } from "../../store/selector/employeeSelector";
import { fetchEmployees } from "../../store/actions/employeeAction";
import { connect } from "react-redux";
import { compose } from "redux";
import { memo } from "react";
import CafeForm from "../../components/forms/CafeForm";
import {useNavigate} from "react-router-dom";

const CafeCreateHOC = (props) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/cafes")
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
            Create New Cafe
          </Typography>
        </Stack>
      </Box>
      <CafeForm clickCancel={() => goBack()}/>
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

export default compose(withConnect, memo)(CafeCreateHOC);
