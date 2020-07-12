import { all, fork, put, takeEvery } from "redux-saga/effects";

import * as UserActions from "@actions/UserActions";

export function* getBankUser() {
  try {
    yield put(UserActions.getBankUser.success(""));
  } catch (error) {
    yield put(UserActions.getBankUser.failure(error));
  }
}
/*
 * WATCHERS
 */

export function* watchGetBankUser() {
  yield takeEvery(UserActions.getBankUser.request, getBankUser);
}
export default function* root() {
  yield all([fork(watchGetBankUser)]);
}