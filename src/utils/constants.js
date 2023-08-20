export const BASE = {
  CAFE_SERVICE: "CAFE_SERVICE",
};

export const BASE_URL = {
  [BASE.CAFE_SERVICE]: process.env.REACT_APP_CAFE_SERVICE,
};

export const VERSION_PATH = {
  [BASE.CAFE_SERVICE]: "/api/v1",
};

export const forms = {
  CAFE_FORM: "CafeForm",
  EMPLOYEE_FORM: "EmployeeForm",
};
// ********************** CAFE SERVICE API **********************
export const FETCH_CAFES = "/cafes";
export const SUBMIT_CAFE = "/cafe";
export const DELETE_CAFE = "/cafe/{id}";
export const FETCH_CAFE = "/cafe/{id}";
export const UPDATE_CAFE = "/cafe/{id}";

export const FETCH_EMPLOYEES = "/employees";
export const SUBMIT_EMPLOYEE = "/employee";
export const DELETE_EMPLOYEE = "/employee/{id}";
export const FETCH_EMPLOYEE = "/employee/{id}";
export const UPDATE_EMPLOYEE = "/employee/{id}";
