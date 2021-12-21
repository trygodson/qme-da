import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function registerUser(payload) {
  const response = await api.post(ApiEndpoints.USER_REGISTER, payload);
  return response;
}

export default {
  useRegisterService: (...args) => useMutation(registerUser, ...args),
};
