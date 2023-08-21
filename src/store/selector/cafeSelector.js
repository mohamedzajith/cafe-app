import { createSelector } from "reselect";
import { isEmpty, get, map } from "lodash";
import {
  employeeCreateInitialValuesSelector,
  employeeFormSelector,
  employeeInfoSelector,
  employeeInitialValuesSelector,
} from "./employeeSelector";
import { forms } from "../../utils/constants";
import dayjs from "dayjs";

const cafeResultDomain = (state) => get(state, "api.cafes.data", {});

const cafeInfoDomain = (state) => get(state, "api.cafeInfo.data", {});

export const cafesResultSelector = createSelector(
  cafeResultDomain,
  (cafesResults) => {
    return isEmpty(cafesResults) ? [] : cafesResults;
  },
);

export const cafeInfoSelector = createSelector(cafeInfoDomain, (cafeInfo) => {
  return isEmpty(cafeInfo) ? {} : cafeInfo;
});

export const cafesOptionsSelector = createSelector(
  cafesResultSelector,
  (cafesResults) => {
    const results = map(cafesResults, ({ id, name }) => {
      return { value: id, label: name };
    });
    return [{ value: "", label: "None" }, ...results];
  },
);

export const cafeInitialValuesSelector = createSelector(
  cafeInfoSelector,
  (cafeInfo) => cafeInfo,
);

const cafeFormDomain = (state) =>
  get(state, ["form", forms.CAFE_FORM, "values"], {});

export const cafeFormSelector = createSelector(
  cafeFormDomain,
  ({ name, description, logo, location }) => {
    return {
      name,
      description,
      logo,
      location,
    };
  },
);

export const cafeCreateInitialValuesSelector = createSelector(
  cafeFormDomain,
  ({ name, description, logo, location }) => {
    return {
      name: "",
      description: "",
      logo: "",
      location: "",
    };
  },
);

export const makeCafesOptions = () => cafesOptionsSelector;

export const makeCafesList = () => cafesResultSelector;

export const makeCafePayload = () => cafeFormSelector;

export const makeCafeInitialValues = () => cafeInitialValuesSelector;

export const makeCafeCreateInitialValues = () =>
  cafeCreateInitialValuesSelector;

export const makeCafeInfo = () => cafeInfoSelector;
