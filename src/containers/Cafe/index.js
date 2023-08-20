import * as React from "react";
import { Box, Stack } from "@mui/system";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { memo, useEffect } from "react";
import { reduxForm } from "redux-form";
import { forms } from "../../utils/constants";
import { fetchCafes } from "../../store/actions/cafeAction";
import { useSearchParams } from "react-router-dom";
import { makeCafesList } from "../../store/selector/cafeSelector";
import CafeTable from "../../components/tables/cafeTable";
import Typography from "@mui/material/Typography";
import Button from "../../components/core/Button";

const CafeHOC = (props) => {
  const { fetchCafes, cafesList } = props;
  let [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries([...searchParams]);

  useEffect(() => {
    fetchCafes(query);
  }, []);

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent={{ xs: "space-between", sm: "space-between" }}
        alignItems="center"
        spacing={{ xs: 1, sm: 2 }}
        sx={{ py: 2 }}
      >
        <Typography component={"h1"} variant="h3" gutterBottom>
          Cafes List
        </Typography>
        <Button title={"Create Cafe"}/>
      </Stack>
      <CafeTable cafes={cafesList} path={"/admin/employees"} />
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  cafesList: makeCafesList(),
});

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchCafes: (query) => dispatch(fetchCafes(query)),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  reduxForm({
    form: forms.CAFE_FORM,
    destroyOnUnmount: false,
  }),
  memo,
)(CafeHOC);
