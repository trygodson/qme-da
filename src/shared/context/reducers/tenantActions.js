import { tenantAction } from './tenantactionTypes';

const { TenantSuccess, TenantFail, TenantAddAccount } = tenantAction;

export const TenantActionSuccess = payload => {
  return {
    type: TenantSuccess,
    payload: payload,
  };
};

export const TenantActionFailed = payload => {
  return {
    type: TenantFail,
    payload: payload,
  };
};
