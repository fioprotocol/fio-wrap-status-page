export const GET_FIO_BALANCE = "GET_BALANCE_PRICE";
export const GET_FIO_BALANCE_SUCCESS = "GET_BALANCE_PRICE_SUCCESS";
export const GET_FIO_BALANCE_FAIL = "GET_BALANCE_PRICE_FAIL";

export const getBalance = () => {
  return {
    type: GET_FIO_BALANCE,
  };
};