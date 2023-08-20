import { createAction, createActions } from "redux-actions";
import { change, initialize } from "redux-form";

export const clearFormValues = createAction("CLEAR_FORM_VALUES");
export const setFormValues = createAction("SET_FORM_VALUES");

export const resetLoadingApis = createAction("RESET_LOADING_APIS");

export const { fetchRequested, fetchSucceeded, fetchFailed } = createActions({
  FETCH_REQUESTED: (payload) => payload,
  FETCH_SUCCEEDED: (payload) => payload,
  FETCH_FAILED: (payload) => payload,
});

export const initializeForm = ({ form, data, keepDirty = true }) => {
  return initialize(form, data, keepDirty);
};
