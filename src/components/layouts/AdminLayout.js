import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";
import Container from "../core/Container";

const AdminLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default AdminLayout;
