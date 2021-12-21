import React, { useEffect, useReducer } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TenantReducer } from './reducers/tenantReducer';

const TenantStateContext = React.createContext();

const TenantProvider = ({ ...props }) => {
  const [tenantdetail, setTenantId] = useLocalStorage('tenantdetail', null);

  const initialState = {
    tenant: '' || tenantdetail,
  };
  const [tenant, dispatchtenant] = useReducer(TenantReducer, initialState);

  const value = {
    tenant,
    dispatchtenant,
  };

  useEffect(() => {
    setTenantId(tenant.tenant);
    console.log('test' + tenant);
  }, [tenant]);

  return <TenantStateContext.Provider value={value} {...props} />;
};

function useTenantState() {
  const context = React.useContext(TenantStateContext);
  if (context === undefined) {
    throw new Error('useTenantState must be used within a TenantProvider');
  }

  return context;
}

export { TenantProvider, useTenantState };
