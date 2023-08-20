import { createSelector } from "reselect";
import { isEmpty, get } from "lodash";
import { forms } from "../../utils/constants";
import dayjs from "dayjs";

const employeesResultDomain = (state) => get(state, "api.employees.data", {});
const employeeInfoDomain = (state) => get(state, "api.employeeInfo.data", {});

export const employeesResultSelector = createSelector(
  employeesResultDomain,
  (employeesResults) => {
    return isEmpty(employeesResults) ? [] : employeesResults;
  },
);

export const employeeInfoSelector = createSelector(
  employeeInfoDomain,
  (employeeInfo) => {
    return isEmpty(employeeInfo) ? {} : employeeInfo;
  },
);

const employeeFormDomain = (state) =>
  get(state, ["form", forms.EMPLOYEE_FORM, "values"], {});

export const employeeFormSelector = createSelector(
  employeeFormDomain,
  ({ email, cafe, ...employeeValues }) => {
    const cafes = cafe
      ? { cafe_id: cafe, start_date: dayjs().format("YYYY-MM-DD") }
      : {};
    return {
      ...employeeValues,
      email_address: email,
      ...cafes,
    };
  },
);

export const employeeInitialValuesSelector = createSelector(
  employeeInfoSelector,
  (employeeInfo) => {
    const { name, email_address, phone_number, gender } = employeeInfo;
    return {
      name,
      email: email_address,
      phone_number,
      gender,
      cafe: "",
    };
  },
);

export const employeeCreateInitialValuesSelector = createSelector(
  employeeInfoSelector,
  (employeeInfo) => {
    return {
      name: "",
      email: "",
      phone_number: "",
      gender: "",
      cafe: "",
    };
  },
);

export const makeEmployeesList = () => employeesResultSelector;

export const makeEmployeePayload = () => employeeFormSelector;

export const makeEmployeeInitialValues = () => employeeInitialValuesSelector;

export const makeEmployeeCreateInitialValues = () =>
  employeeCreateInitialValuesSelector;

export const makeEmployeeInfo = () => employeeInfoSelector;
