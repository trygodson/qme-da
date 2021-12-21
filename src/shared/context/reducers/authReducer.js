import { authAction } from "./actionTypes";
import { useLocalStorage } from "../../hooks/useLocalStorage";


const { AuthSuccess, AuthFail,AuthAddAccount } = authAction;

const AuthReducer = (state, action) => {
  switch (action.type) {
    case AuthFail:
      return {
        ...state,
        token: null,
        user: null,
        permission: null,
        accounts:null
      };
    case AuthSuccess:
      
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.currentUser,
        permission: action.payload.permission,
      };

      case AuthAddAccount:
        return {
          ...state,
          accounts: action.payload.accounts,
         
        }; 

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};


export { AuthReducer };
