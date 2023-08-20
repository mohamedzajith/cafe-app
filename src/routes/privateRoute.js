import { Navigate } from "react-router-dom";
import React from "react";
import AccountLayout from "../components/layouts/AdminLayout";
import CafeContainer from "../containers/Cafe";
import EmployeeContainer from "../containers/Employee";

export const PrivateRoutes = [
  {
    path: "/",
    element: <AccountLayout />,
    children: [{ path: "*", element: <Navigate to="/404" /> }],
  },
  {
    path: "/admin",
    element: <AccountLayout />,
    children: [
      { path: "/admin/cafes", element: <CafeContainer /> },
      { path: "/admin/employees", element: <EmployeeContainer /> },
    ],
  },
];
