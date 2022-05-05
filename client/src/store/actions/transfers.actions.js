import axios from "axios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { transfersActions } from "../slices/transfers.slice";

const MySwal = withReactContent(Swal);

const API_URL = "http://localhost:4000/api/v1";

export const getUsersTransfers = (userId) => {
  return async (dispatch) => {
    try {
      // API REQUEST
      const { data } = await axios.get(`${API_URL}/users/${userId}/history`);

      dispatch(transfersActions.getTransfers(data));
    } catch ({ response }) {
      MySwal.fire({
        title: <p>{response?.data?.message}</p>,
      });
    }
  };
};

export const newTransfer = (senderAccount, receiverAccount, amount) => {
  return async (dispatch) => {
    try {
      // API REQUEST
      const { data } = await axios.post(`${API_URL}/transfers/`, {
        senderAccount,
        receiverAccount,
        amount,
      });

      MySwal.fire({
        title: <p>Transfers success</p>,
      });

      dispatch(transfersActions.newTransfer(data));
    } catch ({ response }) {
      MySwal.fire({
        title: <p>{response.data.message}</p>,
      });
    }
  };
};
