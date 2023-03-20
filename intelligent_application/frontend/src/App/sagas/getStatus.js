import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createAxiosErrorNotification } from "../../Notifications";
import { GET_STATUS, getStatusFulfilled, getStatusPending, getStatusRejected } from "../actions";

export const statusUrl = "/api/status";

function* executeGetStatus(action) {
  yield put(getStatusPending());
  try {
    const response = yield call(axios.get, statusUrl);
    yield put(getStatusFulfilled(response));
  } catch (error) {
    yield put(createAxiosErrorNotification(error));
    yield put(getStatusRejected(error));
  }
}

export function* watchGetStatus() {
  yield takeLatest(GET_STATUS, executeGetStatus);
}
