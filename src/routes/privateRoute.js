import React from "react";
import CafeContainer from "../containers/Cafe/index";
import CafeCreateContainer from "../containers/Cafe/create";
import EmployeeContainer from "../containers/Employee";
import EmployeeCreateContainer from "../containers/Employee/create";
import EmployeeEditContainer from "../containers/Employee/edit";

export const PrivateRoutes = [
  {
    path: "/cafes",
    element: <CafeContainer />,
  },
  {
    path: "/cafe/create",
    element: <CafeCreateContainer />,
  },
  {
    path: "/employees",
    element: <EmployeeContainer />,
  },
  {
    path: "/employee/create",
    element: <EmployeeCreateContainer />,
  },
  {
    path: "/employee/:id",
    element: <EmployeeEditContainer />,
  },
  { path: "*", element: <CafeCreateContainer /> },
];
