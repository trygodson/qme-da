import React, { useEffect, useReducer } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DoctorReducer } from './reducers/doctorReducer';

const DoctorStateContext = React.createContext();

const DoctorProvider = ({ ...props }) => {
  const [doctordetail, setDoctorId] = useLocalStorage('doctordetail', null);

  const initialState = {
    doctor: '' || doctordetail,
  };
  const [doctor, dispatchdoctor] = useReducer(DoctorReducer, initialState);

  const value = {
    doctor,
    dispatchdoctor,
  };

  useEffect(() => {
    setDoctorId(doctor.doctor);
    console.log(doctor);
  }, [doctor]);

  return <DoctorStateContext.Provider value={value} {...props} />;
};

function useDoctorState() {
  const context = React.useContext(DoctorStateContext);
  if (context === undefined) {
    throw new Error('useDoctorState must be used within a DoctorProvider');
  }

  return context;
}

export { DoctorProvider, useDoctorState };
