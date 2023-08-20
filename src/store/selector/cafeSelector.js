import { createSelector } from "reselect";
import { isEmpty, get, map } from "lodash";

const cafeResultDomain = (state) => get(state, "api.cafes.data", {});

export const cafesResultSelector = createSelector(
  cafeResultDomain,
  (cafesResults) => {
    return isEmpty(cafesResults) ? [] : cafesResults;
  },
);
export const cafesOptionsSelector = createSelector(
  cafesResultSelector,
  (cafesResults) => {
    const results = map(cafesResults, ({ id, name }) => {
      return { value: id, label: name };
    });
    return [{ value: "", label: "None" }, ...results];
  },
);

export const makeCafesOptions = () => cafesOptionsSelector;

export const makeCafesList = () => cafesResultSelector;
