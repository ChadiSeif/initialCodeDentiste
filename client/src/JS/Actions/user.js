import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  USER_LOAD,
  REGISTER_SUCCESS,
  USER_FAIL,
  LOGIN_SUCCESS,
  CURRENT_USER,
  CURRENT_USER_FAIL,
  LOGOUT,
  PRENDRE_RDV,
  PRENDRE_RDV_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../ActionType/user";

export const RegisterUser = (newUser, navigate) => async (dispatch) => {
  dispatch({ type: USER_LOAD });
  try {
    const result = await axios.post("/api/user/Register", newUser);
    localStorage.setItem("token", result.data.token);
    navigate("/");
    return dispatch({ type: REGISTER_SUCCESS, payload: result.data }); //msg.newuser.token
  } catch (error) {
    return dispatch({ type: USER_FAIL, payload: error.response });
  }
};

export const LoginUser = (User, navigate) => async (dispatch) => {
  dispatch({ type: USER_LOAD });
  try {
    const result = await axios.post("/api/user/Login", User);
    localStorage.setItem("token", result.data.token);
    navigate(`/Profil/Rdv`);
    return dispatch({ type: LOGIN_SUCCESS, payload: result.data });
  } catch (error) {
    return dispatch({ type: USER_FAIL, payload: error.response });
  }
};

export const Current = () => async (dispatch) => {
  dispatch({ type: USER_LOAD });
  try {
    const config = {
      headers: { authorization: localStorage.getItem("token") },
    };
    const result = await axios.get("/api/user/Current", config);
    return dispatch({ type: CURRENT_USER, payload: result.data });
  } catch (error) {
    dispatch({ type: CURRENT_USER_FAIL, payload: error.response });
  }
};

export const Logout = () => {
  localStorage.removeItem("token");
  return {
    type: LOGOUT,
    payload: "",
  };
};

export const PrendreRdv = (medecinid) => async (dispatch) => {
  try {
    const result = await axios.get(`/api/medecin/onedoctor/${medecinid}`);
    return dispatch({ type: PRENDRE_RDV, payload: result.data.doctorfound });
  } catch (error) {
    return dispatch({ type: PRENDRE_RDV_FAIL, payload: error.response.data });
  }
};

export const UpdateUser = (userid, userupdated) => async (dispatch) => {
  try {
    // const token = {
    //   Headers: { authorization: Window.localStorage.getItem("token") },
    // };
    await axios.put(`/api/user/updateuser/${userid}`, userupdated);
    return dispatch({ type: UPDATE_USER_SUCCESS });
  } catch (error) {
    return dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data });
  }
};
