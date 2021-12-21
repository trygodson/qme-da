import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from './../shared/context/useAuthContext';

const PermissionedRoute = ({ key, path, component, permissions, exact, ...props }) => {
  const { user } = useAuthState();

  return !permissions ||
    permissions.length === 0 ||
    permissions.some(r => user.permissions?.indexOf(r) >= 0) ? (
    <Route key={key} path={path} component={component} exact={exact} />
  ) : (
    <Redirect to={'/error'} />
  );
};

export default PermissionedRoute;
