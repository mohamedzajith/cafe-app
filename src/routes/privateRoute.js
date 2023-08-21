import React from "react";
import CafeContainer from "../containers/Cafe/index";
import CafeCreateContainer from "../containers/Cafe/create";
import CafeEditContainer from "../containers/Cafe/edit";
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
    path: "/cafe/:id",
    element: <CafeEditContainer />,
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
