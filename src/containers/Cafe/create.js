import * as React from "react";
import { Box, Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import AdminLayout from "../../components/layouts/AdminLayout";

const CafeCreateHOC = (props) => {
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
    </AdminLayout>
  );
};

export default CafeCreateHOC;
