import { tenantAction } from './tenantactionTypes';

const { TenantSuccess, TenantFail } = tenantAction;

const TenantReducer = (state, action) => {
  switch (action.type) {
    case TenantFail:
      return {
        ...state,
        id: null,
        tenant: null,
        tenant_role: null,
      };
    case TenantSuccess:
      return {
        ...state,
        tenant: action.payload.tenantdetail,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { TenantReducer };
