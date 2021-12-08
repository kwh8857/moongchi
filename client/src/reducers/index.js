import { combineReducers } from "redux";
import config from "./config";
import test from "./test";
import database from "./database";
const rootReducers = combineReducers({
  config,
  test,
  database,
});

export default rootReducers;
