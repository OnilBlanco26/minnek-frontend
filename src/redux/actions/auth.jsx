import axios from "axios";
import Swal from "sweetalert2";
import { setIsLoading } from "./ui";
import { types } from "../types/types";

export const startLogin = (email, password) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .post(
        "https://pruebasminnek-production.up.railway.app/minnerk/api/v1/auth/login",
        {
          email,
          password,
        }
      )
      .then((resp) => {
        console.log(resp)
        localStorage.setItem("token", resp.data.token);
        dispatch(
          login({
            id: resp.data.user.id,
            name: resp.data.user.name,
          })
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: resp.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response?.data?.message,
        });
      })
      .finally(() => dispatch(setIsLoading(true)));
  };
};

export const startRegister = (name, lastname,email, password) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .post(
        "https://pruebasminnek-production.up.railway.app/minnerk/api/v1/auth/signup",
        { name, lastname, email, password }
      )
      .then((resp) => {
        console.log(resp.data)
        localStorage.setItem("token", resp.data.token);
        dispatch(
          login({
            id: resp.data.user.id,
            email: resp.data.user.email,
          })
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: resp.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const startChecking = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get(
        "https://pruebasminnek-production.up.railway.app/minnerk/api/v1/auth/renew",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((resp) => {
        console.log("LEEME! 🙌", resp);
        localStorage.setItem("token", resp.data.token);
        dispatch(
          login({
            id: resp.data.user.id,
            email: resp.data.user.email,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({
  type: types.authLogout,
});
