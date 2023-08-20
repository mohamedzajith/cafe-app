import { createSelector } from "reselect";
import { isEmpty, get } from "lodash";

const cafeResultDomain = (state) => get(state, "api.cafes.data", {});

export const cafesResultSelector = createSelector(
  cafeResultDomain,
  (cafesResults) => {
    return isEmpty(cafesResults) ? [] : cafesResults;
  },
);

export const makeCafesList = () => cafesResultSelector;
