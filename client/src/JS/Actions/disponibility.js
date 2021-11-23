import axios from "axios";
import {
  UPDATE_DISPONIBILITY_FAIL,
  UPDATE_DISPONIBILITY_SUCCESS,
  VIEW_DISPONIBILITY_FAIL,
  VIEW_DISPONIBILITY_LOAD,
  VIEW_DISPONIBILITY_SUCCESS,
  UPDATE_DISPONIBILITY_DAY_SUCCESS,
  UPDATE_DISPONIBILITY_DAY_FAIL,
} from "../ActionType/disponibility";

export const getDisponibility = (medecinID) => async (dispatch) => {
  dispatch({ type: VIEW_DISPONIBILITY_LOAD });
  try {
    const result = await axios.get(`/api/Disponibility/View/${medecinID}`);
    dispatch({ type: VIEW_DISPONIBILITY_SUCCESS, payload: result.data });
    console.log("this is the result" + result);
  } catch (error) {
    dispatch({ type: VIEW_DISPONIBILITY_FAIL, payload: error });
  }
};

export const updateDisponibility =
  (medecinID, dispoUpdated) => async (dispatch) => {
    try {
      const result = await axios.put(
        `/api/Disponibility/Update/${medecinID}`,
        dispoUpdated
      );

      dispatch({ type: UPDATE_DISPONIBILITY_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: UPDATE_DISPONIBILITY_FAIL, payload: error });
    }
  };

export const updateDisponibilityDay =
  (medecinID, updateinformations) => async (dispatch) => {
    try {
      const result = await axios.put(
        `/api/Disponibility/UpdateDay/${medecinID}`,
        updateinformations
      );
      dispatch({
        type: UPDATE_DISPONIBILITY_DAY_SUCCESS,
        payload: result.data,
      });
    } catch (error) {
      dispatch({ type: UPDATE_DISPONIBILITY_DAY_FAIL, payload: error });
    }
  };
