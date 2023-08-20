import API from "../../utils/API";
import { FETCH_CAFES } from "../../utils/constants";
import { fetchSucceeded } from "./index";

export const fetchCafes = (query) => {
  return async (dispatch) => {
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
  };
};
