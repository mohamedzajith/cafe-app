import * as React from "react";
import { Box, Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import AdminLayout from "../../components/layouts/AdminLayout";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { memo, useEffect } from "react";
import CafeForm from "../../components/forms/CafeForm";
import { useNavigate, useParams } from "react-router-dom";
import { reset } from "redux-form";
import { forms } from "../../utils/constants";
import { initializeForm } from "../../store/actions";
import {
  createCafe,
  fetchCafeInfo,
  updateCafe,
} from "../../store/actions/cafeAction";
import {
  makeCafeInfo,
  makeCafeInitialValues,
  makeCafePayload,
} from "../../store/selector/cafeSelector";

const CafeEditHOC = (props) => {
  const {
    fetchCafeInfo,
    payload,
    resetForm,
    initializeForm,
    initialValues,
    cafeInfo,
    updateCafe,
  } = props;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchCafeInfo(id);
  }, []);

  useEffect(() => {
    initializeForm(initialValues);
  }, [cafeInfo?.id, id]);

  const goBack = () => {
    resetForm();
    navigate("/cafes");
  };
  const create = async () => {
    const res = await updateCafe(id, payload);
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
  initialValues: makeCafeInitialValues(),
  cafeInfo: makeCafeInfo(),
});

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchCafeInfo: (id) => dispatch(fetchCafeInfo(id)),
    updateCafe: (id, payload) => dispatch(updateCafe(id, payload)),
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

export default compose(withConnect, memo)(CafeEditHOC);
