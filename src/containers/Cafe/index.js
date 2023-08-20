import * as React from "react";
import { Box, Stack } from "@mui/system";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { memo, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {deleteCafe, fetchCafes} from "../../store/actions/cafeAction";
import { useNavigate, useSearchParams } from "react-router-dom";
import { makeCafesList } from "../../store/selector/cafeSelector";
import CafeTable from "../../components/tables/cafeTable";
import Button from "../../components/core/Button";
import AdminLayout from "../../components/layouts/AdminLayout";
import {deleteEmployee} from "../../store/actions/employeeAction";

const CafeHOC = (props) => {
  const { fetchCafes, cafesList, deleteCafe } = props;
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries([...searchParams]);

  useEffect(() => {
    fetchCafes(query);
  }, []);

  const isCafeDelete = (cafeInfo) => {
    MySwal.fire({
      title: `Are you sure delete ${cafeInfo.name} cafe?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      const res = await deleteCafe(cafeInfo.id);
      if (res.status === 200) {
        Swal.fire("Deleted!", "Your cafe has been deleted.", "success");
        navigate(0);
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
            Cafes List
          </Typography>
          <Button
            title={"Create Cafe"}
            onClick={() => navigate("/cafe/create")}
          />
        </Stack>
        <CafeTable
          cafes={cafesList}
          path={"/employees"}
          cafeDelete={isCafeDelete}
        />
      </Box>
    </AdminLayout>
  );
};

const mapStateToProps = createStructuredSelector({
  cafesList: makeCafesList(),
});

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchCafes: (query) => dispatch(fetchCafes(query)),
    deleteCafe: (id) => dispatch(deleteCafe(id)),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CafeHOC);
