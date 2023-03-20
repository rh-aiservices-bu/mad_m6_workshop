import { all } from "redux-saga/effects";
import socketSagas from "../Socket/sagas";
import appSagas from "../App/sagas";
import photoSagas from "../Photo/sagas";

export default function* rootSaga() {
  yield all([...socketSagas, ...appSagas, ...photoSagas, ]);
}
