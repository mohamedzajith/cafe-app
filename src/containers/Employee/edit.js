import * as React from "react";
import { Box, Stack } from "@mui/system";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { memo, useEffect } from "react";
import { reduxForm, reset } from "redux-form";
import { forms } from "../../utils/constants";
import Typography from "@mui/material/Typography";
import {
  fetchEmployeeInfo,
  updateEmployee,
} from "../../store/actions/employeeAction";
import {
  makeEmployeeInfo,
  makeEmployeeInitialValues,
  makeEmployeePayload,
} from "../../store/selector/employeeSelector";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";
import EmployeeForm from "../../components/forms/EmployeeForm";
import { makeCafesOptions } from "../../store/selector/cafeSelector";
import { fetchCafes } from "../../store/actions/cafeAction";
import { initializeForm } from "../../store/actions";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const EmployeeEditHOC = (props) => {
  const {
    fetchCafes,
    updateEmployee,
    payload,
    fetchEmployeeInfo,
    initialValues,
    cafesOptions,
    initializeForm,
    employeeInfo,
    resetForm,
  } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  const MySwal = withReactContent(Swal);

  const goBack = () => {
    navigate("/employees");
  };

  const create = async () => {
    const res = await updateEmployee(id, payload);
    if (res.status === 200) {
      resetForm();
      goBack();
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: res?.data?.result?.error[0]?.message
      })
    }
  };

  useEffect(() => {
    fetchCafes();
    fetchEmployeeInfo(id);
  }, []);

  useEffect(() => {
    initializeForm(initialValues);
  }, [employeeInfo?.id, id]);

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
            Edit employee details
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
  initialValues: makeEmployeeInitialValues(),
  employeeInfo: makeEmployeeInfo(),
});

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchCafes: (query) => dispatch(fetchCafes(query)),
    fetchEmployeeInfo: (id) => dispatch(fetchEmployeeInfo(id)),
    initializeForm: (initialValues) =>
      dispatch(
        initializeForm({
          form: forms.EMPLOYEE_FORM,
          data: initialValues,
        }),
      ),
    updateEmployee: (id, payload) => dispatch(updateEmployee(id, payload)),
    resetForm: () => dispatch(reset(forms.EMPLOYEE_FORM)),
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
)(EmployeeEditHOC);
