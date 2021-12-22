import { all, put } from "redux-saga/effects";
import { takeLatest } from "@redux-saga/core/effects";
import {
  GET_FIO_BALANCE,
  GET_FIO_BALANCE_FAIL,
  GET_FIO_BALANCE_SUCCESS,
} from "../actions/fioActions";

import { getFIOBalanceApi } from "../../api";

import { APP_API_CALL_FAIL } from "../../config";

function* getBalancePriceSaga() {
  try {
    const result = yield getFIOBalanceApi();
    yield put({ type: GET_FIO_BALANCE_SUCCESS, balancePrice: result });
  } catch (e) {
    yield put({ type: GET_FIO_BALANCE_FAIL });
    yield put({
      type: APP_API_CALL_FAIL,
      message: "Error when get FIO balance",
      err: e.message,
    });
  }
}

export function* watchGetFIOBalance() {
  yield takeLatest(GET_FIO_BALANCE, getBalancePriceSaga);
}

export default function* rootSaga() {
  yield all([watchGetFIOBalance()]);
}
