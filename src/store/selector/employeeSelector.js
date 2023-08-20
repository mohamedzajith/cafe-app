import { createSelector } from "reselect";
import { isEmpty, get } from "lodash";

const employeesResultDomain = (state) => get(state, "api.employees.data", {});

export const employeesResultSelector = createSelector(
  employeesResultDomain,
  (employeesResults) => {
    return isEmpty(employeesResults) ? [] : employeesResults;
  },
);

export const makeEmployeesList = () => employeesResultSelector;
