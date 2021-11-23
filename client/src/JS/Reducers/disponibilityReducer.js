import {
  UPDATE_DISPONIBILITY_FAIL,
  UPDATE_DISPONIBILITY_SUCCESS,
  VIEW_DISPONIBILITY_FAIL,
  VIEW_DISPONIBILITY_SUCCESS,
  VIEW_DISPONIBILITY_LOAD,
  UPDATE_DISPONIBILITY_DAY_SUCCESS,
  UPDATE_DISPONIBILITY_DAY_FAIL,
} from "../ActionType/disponibility";

const initstate = {
  load: true,
  disponibility: {},
  disponibilityDays: [],
  disponibility_Update: {},
  error: [],
  errorUpdate: {},
};

const disponibilityReducer = (state = initstate, { type, payload }) => {
  switch (type) {
    case VIEW_DISPONIBILITY_LOAD:
      return { ...state, load: true };
    case VIEW_DISPONIBILITY_SUCCESS:
      return {
        ...state,
        disponibility: payload.disponibiliteMedecin[0],
        disponibilityDays: payload.disponibiliteMedecin[0].Days,
        load: false,
      }; //msg , disponibiliteMedecin
    case VIEW_DISPONIBILITY_FAIL:
      return { ...state, error: payload, load: false };
    case UPDATE_DISPONIBILITY_SUCCESS:
      return {
        ...state,
        disponibility_Update: payload.msg,
        disponibility: payload.disponibility[0],
      };
    case UPDATE_DISPONIBILITY_FAIL:
      return { ...state, errorUpdate: payload };
    case UPDATE_DISPONIBILITY_DAY_SUCCESS:
      return {
        ...state,
        disponibilityDays: payload.disponibility[0].Days,
        load: false,
      };
    case UPDATE_DISPONIBILITY_DAY_FAIL:
      return { ...state, error: payload, load: false };
    default:
      return state;
  }
};

export default disponibilityReducer;
