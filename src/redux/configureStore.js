import { createStore, applyMiddleware } from "redux";
import authReducer from "./authReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const configureStore = (addLogger = true) => {
  let localStorageData = localStorage.getItem("report-auth");

  let persistedState = {
    token: "",
    isLoggedIn: false,
    email: "",
  };

  if (localStorageData) {
    try {
      persistedState = JSON.parse(localStorageData);
    } catch (error) {}
  }

  const middleware = addLogger
    ? applyMiddleware(thunk, logger)
    : applyMiddleware(thunk);
  const store = createStore(authReducer, persistedState, middleware);

  store.subscribe(() => {
    localStorage.setItem("report-auth", JSON.stringify(store.getState()));
  });

  return store;
};

export default configureStore;
