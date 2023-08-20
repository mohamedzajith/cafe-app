import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/index";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";

export const persistConfig = {
  key: "root", // The key for the root of your state in the storage
  storage,
  blacklist: [""],
  // Add any blacklist or whitelist options if needed
  // blacklist: ['someReducer'], // State slices to be excluded from persisting
  // whitelist: ['anotherReducer'], // State slices to be persisted, ignore others
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: process.env.NODE_ENV !== "production",
  middleware: [sagaMiddleware, thunkMiddleware, logger],
});
export const persistor = persistStore(store);
