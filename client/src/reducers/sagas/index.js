import axios from "axios";
import { call, put, takeEvery, spawn } from "redux-saga/effects";
import * as actions from "../actions";

function* fetchSearchSaga(action) {
  try {
    const json = {
      name: action.payload,
    };
    // const { data } = yield call([axios, "post"], "/api/nba/player", json);
    yield put(actions.searchSuccess("success"));
  } catch (error) {
    yield put(actions.searchFail(error.response));
  }
}

function* watchSearch() {
  yield takeEvery(actions.SEARCH, fetchSearchSaga);
}

export default function* rootSaga() {
  yield spawn(watchSearch);
}
