import { handleActions } from "redux-actions";
import { fetchFailed, fetchRequested, fetchSucceeded } from "../actions";
import { produce } from "immer";
import { get, isPlainObject, merge, set } from "lodash";

const initialApiState = {};
const apiReducer = handleActions(
  {
    [fetchRequested]: produce((draftState, { payload: { key, params } }) => {
      set(draftState, `${key}.loading`, true);
      set(draftState, `${key}.requestedAt`, new Date());
      set(draftState, `${key}.params`, params);
    }),
    [fetchSucceeded]: produce(
      (draftState, { payload: { key, data, override } }) => {
        set(draftState, `${key}.loading`, false);
        set(draftState, `${key}.completedAt`, new Date());
        set(draftState, `${key}.error`, undefined);
        set(draftState, `${key}.errorReason`, undefined);

        const currentData = get(draftState, `${key}.data`);

        if (isPlainObject(data) && isPlainObject(currentData)) {
          if (override) {
            for (const attr of Object.keys(data)) {
              set(draftState, `${key}.data.${attr}`, data[attr]);
            }
          } else {
            set(draftState, `${key}.data`, merge(currentData, data));
          }
        } else {
          set(draftState, `${key}.data`, data);
        }
      },
    ),
    [fetchFailed]: produce(
      (draftState, { payload: { key, error, errorReason } }) => {
        set(draftState, `${key}.loading`, false);
        set(draftState, `${key}.completedAt`, new Date());
        set(draftState, `${key}.data`, undefined);
        set(draftState, `${key}.error`, error);
        set(draftState, `${key}.errorReason`, errorReason);
      },
    ),
  },
  initialApiState,
);

export default apiReducer;
