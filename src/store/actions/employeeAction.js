import API from "../../utils/API";
import {DELETE_EMPLOYEE, FETCH_EMPLOYEE, SUBMIT_EMPLOYEE} from "../../utils/constants";
import {fetchFailed, fetchSucceeded} from "./index";

export const fetchEmployees = (query) => {
  return async (dispatch) => {
    try {
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
    } catch (error) {
      dispatch(
        fetchFailed({
          key: "employees",
          error: error.response.data.result,
          override: true,
        }),
      );
      return error.response
    }
  };
};
export const deleteEmployee = (id) => {
  return async () => {
    try {
      return await API.cafeServiceApi({
        method: "DELETE",
        url: DELETE_EMPLOYEE.replaceAll("{id}", id)
      });
    } catch (error) {
      return error.response
    }
  };
};

export const submitEmployee = (payload) => {
  return async (dispatch) => {
    try {
      const res = await API.cafeServiceApi({
        method: "POST",
        url: SUBMIT_EMPLOYEE,
        data: payload,
      });
      if (res) {
        dispatch(
          fetchSucceeded({
            key: "submitEmployee",
            data: res.data.result,
            override: true,
          }),
        );
      }
      return res;
    } catch (error){
      dispatch(
        fetchFailed({
          key: "submitEmployee",
          error: error.response.data.result,
          override: true,
        }),
      );
      return error.response
    }
  };
};
