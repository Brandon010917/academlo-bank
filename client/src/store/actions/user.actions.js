import axios from "axios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { usersActions } from "../slices/user.slice";

const MySwal = withReactContent(Swal);

const API_URL = "http://localhost:4000/api/v1/users";

export const login = (accountNumber, password) => {
  return async (dispatch) => {
    try {
      // API REQUEST
      const { data } = await axios.post(`${API_URL}/login`, {
        accountNumber,
        password,
      });

      MySwal.fire({
        title: <p>Login success</p>,
      });

      dispatch(usersActions.login(data.user));
    } catch ({ response }) {
      MySwal.fire({
        title: <p>{response.data.message}</p>,
      });
    }
  };
};

export const signup = (name, password) => {
  return async (dispatch) => {
    try {
      if ((!name, !password)) {
        return;
      }

      // API REQUEST
      const { data } = await axios.post(`${API_URL}/signup`, {
        name,
        password,
      });

      MySwal.fire({
        title: <p>Your account number is {data.newUser.accountNumber}</p>,
      });
    } catch ({ response }) {
      MySwal.fire({
        title: <p>{response.data.message}</p>,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("currentAccount");
      dispatch(usersActions.logout());
    } catch ({ response }) {
      MySwal.fire({
        title: <p>{response.data.message}</p>,
      });
    }
  };
};
