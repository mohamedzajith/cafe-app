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
export const FETCH_EMPLOYEE = "/employees";
export const SUBMIT_EMPLOYEE = "/employee";
export const DELETE_EMPLOYEE = "/employee/{id}";
export const USER_ACTIVITIES = "/user/activity";
export const GET_USER_ACTIVITY = "/user/activity/{id}";
export const SUBMIT_USER_ACTIVITY = "/user/activity/{id}";

// ********************** EXAMS SERVICE - ACTIVITY API **********************
export const GET_ACTIVITIES = "/activity";
export const GET_ACTIVITY = "/activity/{id}";

// ********************** USER SERVICE API **********************
export const USER_LOGIN = "/auth/login";
