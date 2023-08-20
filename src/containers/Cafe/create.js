import * as React from "react";
import { Box, Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import AdminLayout from "../../components/layouts/AdminLayout";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { memo, useEffect } from "react";
import CafeForm from "../../components/forms/CafeForm";
import { useNavigate } from "react-router-dom";
import { reset } from "redux-form";
import { forms } from "../../utils/constants";
import { initializeForm } from "../../store/actions";
import { createCafe } from "../../store/actions/cafeAction";
import {
  makeCafeCreateInitialValues,
  makeCafePayload,
} from "../../store/selector/cafeSelector";

const CafeCreateHOC = (props) => {
  const { createCafe, payload, resetForm, initializeForm, initialValues } =
    props;
  const navigate = useNavigate();

  useEffect(() => {
    resetForm();
    initializeForm(initialValues);
  }, []);

  const goBack = () => {
    navigate("/cafes");
  };
  const create = async () => {
    const res = await createCafe(payload);
    if (res.status === 200) {
      goBack();
    }
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
            Create New Cafe
          </Typography>
        </Stack>
      </Box>
      <CafeForm clickCancel={() => goBack()} onFormSubmit={() => create()} />
    </AdminLayout>
  );
};

const mapStateToProps = createStructuredSelector({
  payload: makeCafePayload(),
  initialValues: makeCafeCreateInitialValues(),
});

export const mapDispatchToProps = (dispatch) => {
  return {
    createCafe: (payload) => dispatch(createCafe(payload)),
    resetForm: () => dispatch(reset(forms.CAFE_FORM)),
    initializeForm: (initialValues) =>
      dispatch(
        initializeForm({
          form: forms.CAFE_FORM,
          data: initialValues,
        }),
      ),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CafeCreateHOC);
