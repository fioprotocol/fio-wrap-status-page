// import moment from "moment";
export const getFIOBalanceApi = async () => {
  try {
    console.debug("Base api call implementation");
    const url =   "http://35.81.84.194:8889/v1/chain/get_table_rows";
    const data = {
      "code": "fio.oracle",
      "scope": "fio.oracle",
      "table": "oracleldgrs",
      "key_type": "i64",
      "index_position": "1",
      "limit": 10,
      "json": true 
    }
    var tokenRawAbi = await fetch(url, {body: data, method: 'POST' });
    return 1;
  } catch (error) {
    return 0;
  }
};