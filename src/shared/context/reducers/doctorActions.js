import { doctorAction } from './doctoractionTypes';

const { DoctorSuccess, DoctorFail, DoctorAddAccount } = doctorAction;

export const DoctorActionSuccess = payload => {
  return {
    type: DoctorSuccess,
    payload: payload,
  };
};

export const DoctorActionFailed = payload => {
  return {
    type: DoctorFail,
    payload: payload,
  };
};
