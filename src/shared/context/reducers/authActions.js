import { authAction } from "./actionTypes";

const { AuthSuccess, AuthFail,AuthAddAccount } = authAction;

export const AuthActionSuccess = (payload) => {
  return {
    type: AuthSuccess,
    payload: payload,
  };
};

export const AuthActionAddAccount = (payload) => {
  return {
    type: AuthAddAccount,
    payload: payload,
  };
};

export const AuthActionFailed = (payload) => {
  return {
    type: AuthFail,
    payload: payload,
  };
};
