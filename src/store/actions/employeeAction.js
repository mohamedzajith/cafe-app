import API from "../../utils/API";
import { FETCH_CAFES, FETCH_EMPLOYEE } from "../../utils/constants";
import { fetchSucceeded } from "./index";

export const fetchEmployees = (query) => {
  return async (dispatch) => {
    const res = await API.cafeServiceApi({
      method: "GET",
      url: FETCH_EMPLOYEE,
      params: query,
    });
    if (res) {
      dispatch(
        fetchSucceeded({
          key: "employees",
          data: res.data.result,
          override: true,
        }),
      );
    }
    return res;
  };
};
