import { createSelector } from "reselect";
import { isEmpty, get } from "lodash";
import { forms } from "../../utils/constants";

const employeesResultDomain = (state) => get(state, "api.employees.data", {});

export const employeesResultSelector = createSelector(
  employeesResultDomain,
  (employeesResults) => {
    return isEmpty(employeesResults) ? [] : employeesResults;
  },
);

const employeeFormDomain = (state) =>
  get(state, ["form", forms.EMPLOYEE_FORM, "values"], {});

export const employeeFormSelector = createSelector(
  employeeFormDomain,
  ({email, ...employeeValues}) => {
    return {
      ...employeeValues,
      email_address: email
    }
  },
);

export const makeEmployeesList = () => employeesResultSelector;

export const makeEmployeePayload = () => employeeFormSelector;
