import axios from "axios";
import {
  LIST_MEDECINS_FAIL,
  LIST_MEDECINS_LOAD,
  LIST_MEDECINS_SUCCESS,
  GET_ONEDOCTOR_SUCCESS,
  GET_ONEDOCTOR_FAIL,
  LOGIN_MEDECIN_SUCCESS,
  LOGIN_MEDECIN_FAIL,
  UPDATE_MEDECIN_SUCCESS,
  UPDATE_MEDECIN_FAIL,
  CURRENT_DOCTOR,
  LOGOUT_MEDECIN,
  LOGIN_MEDECIN_LOAD,
} from "../ActionType/medecin";

export const GET_medecin = () => async (dispatch) => {
  dispatch({ type: LIST_MEDECINS_LOAD });
  try {
    const result = await axios.get("/api/medecin/Doctorlist");
    dispatch({ type: LIST_MEDECINS_SUCCESS, payload: result.data }); //msg,medecins
  } catch (error) {
    dispatch({ type: LIST_MEDECINS_FAIL, payload: error.response.data });
  }
};

export const currentMedecin = () => async (dispatch) => {
  try {
    const config = {
      headers: { authorization: localStorage.getItem("token") },
    };
    const result = await axios.get("/api/medecin/Doctor/", config);
    dispatch({ type: CURRENT_DOCTOR, payload: result.data });
  } catch (error) {
    // dispatch({ type: USER_FAIL, payload: error.response.data });
  }
};

export const GET_onemedecin = (medecinid) => async (dispatch) => {
  try {
    const result = await axios.get(`/api/medecin/onedoctor/${medecinid}`);
    return dispatch({ type: GET_ONEDOCTOR_SUCCESS, payload: result.data }); //msg,doctorfound
  } catch (error) {
    return dispatch({ type: GET_ONEDOCTOR_FAIL, payload: error.response.data });
  }
};

export const LoginMed = (Medecin, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_MEDECIN_LOAD });
  try {
    const result = await axios.post("/api/medecin/LoginMedecin", Medecin);
    const medecin_id = result.data.doctorfound._id;
    localStorage.setItem("token", result.data.token);
    navigate(`/Dr/${medecin_id}/Accueil`);
    return dispatch({ type: LOGIN_MEDECIN_SUCCESS, payload: result.data });
  } catch (error) {
    // dispatch({ type: LOGIN_MEDECIN_FAIL, payload: error.response.data });
  }
};

export const UpdateMedecin = (medecinid, doctorupdated) => async (dispatch) => {
  try {
    await axios.put(`/api/medecin/updatedoctor/${medecinid}`, doctorupdated);
    console.log(doctorupdated);
    dispatch({ type: UPDATE_MEDECIN_SUCCESS });
    dispatch(GET_onemedecin(medecinid));
    alert("vos données ont été modifiées");
  } catch (error) {
    dispatch({ type: UPDATE_MEDECIN_FAIL, payload: error.response.data });
  }
};

export const Logoutmedecin = () => {
  localStorage.removeItem("token");
  return {
    type: LOGOUT_MEDECIN,
    payload: "",
  };
};
