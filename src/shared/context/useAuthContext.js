import React, { useEffect, useReducer } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AuthReducer } from './reducers/authReducer';

const AuthStateContext = React.createContext();

const AuthProvider = ({ ...props }) => {
  const [token, setToken] = useLocalStorage('token', null);
  const [currentUser, setUser] = useLocalStorage('currentUser', null);
  const [permission, setPermission] = useLocalStorage('permission', null);
  const [accounts, setAccounts] = useLocalStorage('accounts', null);

  const initialState = {
    user: '' || currentUser,
    token: '' || token,
    accounts: accounts,
    permission: permission,
    loading: false,
    errorMessage: null,
  };
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  const value = {
    user,
    dispatch,
  };

  useEffect(() => {
    console.log('test' + user);
    setToken(user.token);
    setUser(user.user);
    setPermission(user.permission);
    setAccounts(user.accounts);
  }, [user]);

  return <AuthStateContext.Provider value={value} {...props} />;
};

function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuthState };
