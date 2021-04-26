import axios from "axios";
import {
    SAVE_ONE_TIME_TXN,
    SAVE_ONE_TIME_TXN_EXT,
    SAVE_RECCUR_TXN,
    SAVE_RECCUR_TXN_EXT
} from "./types";

export const saveExternalReccurTxn = (requestExtRecurrObject,fromAccountId,toExternalPayeeId) => async (dispatch) => {
    console.log(requestExtRecurrObject);
    console.log(fromAccountId);
    console.log(toExternalPayeeId);
    const res = await axios.post(process.env.REACT_APP_URL + "/api/transaction/external_transaction",requestExtRecurrObject,
    { params: { fromAccountId: fromAccountId, toExternalPayeeId: toExternalPayeeId }});
    console.log(res);
    dispatch({type: SAVE_RECCUR_TXN_EXT, payload: res.data });
};

export const saveReccurTxn = (requestReccurTxnObject,fromAccountId) => async (dispatch) => {
    const res = await axios.post(process.env.REACT_APP_URL + "/api/transaction", requestReccurTxnObject,
    { params: { fromAccountId, toAccountNumber: requestReccurTxnObject.toAccountNumber }});
    console.log(res);
    dispatch({type: SAVE_RECCUR_TXN, payload: res.data });
};

export const saveExternalOneTimeTxn = (requestExtOneTimeObject,fromAccountId,toExternalPayeeId) => async (dispatch) => {
    const res = await axios.post(process.env.REACT_APP_URL + "/api/transaction/one_time_external",requestExtOneTimeObject,
    { params: { fromAccountId: fromAccountId, toExternalPayeeId: toExternalPayeeId }});
    console.log(res);
    dispatch({type: SAVE_ONE_TIME_TXN_EXT, payload: res.data });
};

export const saveOneTimeTxn = (requestTxnObject,fromAccountId) => async (dispatch) => {
    const res = await axios.post(process.env.REACT_APP_URL + "/api/transaction/one_time",requestTxnObject,
    { params: { fromAccountId, toAccountNumber: requestTxnObject.toAccountNumber }});
    console.log(res);
    dispatch({type: SAVE_ONE_TIME_TXN, payload: res.data });
};
