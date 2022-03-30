import { GET_FIO_BALANCE_SUCCESS } from "../actions/fioActions";
import { createSelector } from "reselect";

const initState = {
  balance: 0,
};

export const FIOReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_FIO_BALANCE_SUCCESS:
      return {
        ...state,
        balance: action.balance,
      };
    default:
      return state;
  }
};

const balanceSelector = (state) => state.fio.balance;

export const getBalancePriceSelector = createSelector(
  balanceSelector,
  (balancePrice) => balancePrice
);
