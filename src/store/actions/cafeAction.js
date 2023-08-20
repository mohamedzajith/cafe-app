import API from "../../utils/API";
import {
  DELETE_CAFE,
  FETCH_CAFE,
  FETCH_CAFES,
  SUBMIT_CAFE,
  UPDATE_CAFE,
} from "../../utils/constants";
import { fetchFailed, fetchSucceeded } from "./index";

export const fetchCafes = (query) => {
  return async (dispatch) => {
    try {
      const res = await API.cafeServiceApi({
        method: "GET",
        url: FETCH_CAFES,
        params: query,
      });
      if (res) {
        dispatch(
          fetchSucceeded({
            key: "cafes",
            data: res.data.result,
            override: true,
          }),
        );
      }
      return res;
    } catch (error) {
      dispatch(
        fetchFailed({
          key: "cafes",
          error: error.response.data.result,
          override: true,
        }),
      );
      return error.response;
    }
  };
};

export const fetchCafeInfo = (id) => {
  return async (dispatch) => {
    try {
      const res = await API.cafeServiceApi({
        method: "GET",
        url: FETCH_CAFE.replaceAll("{id}", id),
      });
      if (res) {
        dispatch(
          fetchSucceeded({
            key: "cafeInfo",
            data: res.data.result,
            override: true,
          }),
        );
      }
      return res;
    } catch (error) {
      dispatch(
        fetchFailed({
          key: "cafeInfo",
          error: error.response.data.result,
          override: true,
        }),
      );
      return error.response;
    }
  };
};

export const createCafe = (payload) => {
  return async () => {
    try {
      return await API.cafeServiceApi({
        method: "POST",
        url: SUBMIT_CAFE,
        data: payload,
      });
    } catch (error) {
      return error.response;
    }
  };
};

export const updateCafe = (id, payload) => {
  return async () => {
    try {
      return await API.cafeServiceApi({
        method: "PUT",
        url: UPDATE_CAFE.replaceAll("{id}", id),
        data: payload,
      });
    } catch (error) {
      return error.response;
    }
  };
};

export const deleteCafe = (id) => {
  return async () => {
    try {
      return await API.cafeServiceApi({
        method: "DELETE",
        url: DELETE_CAFE.replaceAll("{id}", id),
      });
    } catch (error) {
      return error.response;
    }
  };
};
