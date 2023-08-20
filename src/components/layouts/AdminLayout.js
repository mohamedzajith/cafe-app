import React from "react";
import Header from "../header";
import Container from "../core/Container";

const AdminLayout = ({ children, ...props }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default AdminLayout;
