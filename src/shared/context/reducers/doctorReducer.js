import { doctorAction } from './doctoractionTypes';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const { DoctorSuccess, DoctorFail } = doctorAction;

const DoctorReducer = (state, action) => {
  switch (action.type) {
    case DoctorFail:
      return {
        ...state,
        id: null,
        isactivated: null,
      };
    case DoctorSuccess:
      return {
        ...state,
        doctor: action.payload.doctordetail,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { DoctorReducer };
