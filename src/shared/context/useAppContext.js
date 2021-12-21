import React, { useEffect, useReducer } from 'react';
import { AppReducer } from './reducers/appReducer';
import { AuthProvider } from './useAuthContext';
import { DoctorProvider } from './useDoctorContext';

const AppStateContext = React.createContext();

const initialState = {};

const AppProvider = ({ children, ...props }) => {
  const [appState, dispatch] = useReducer(AppReducer, initialState);

  const value = {
    appState,
    dispatch,
  };

  return (
    <AppStateContext.Provider value={value} {...props}>
      <AuthProvider>
        <DoctorProvider>{children}</DoctorProvider>
      </AuthProvider>
    </AppStateContext.Provider>
  );
};

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }

  return context;
}

export { AppProvider, useAppState };
