import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function addBankDetail(payload) {
  const response = await api.post(ApiEndpoints.ADD_BANK_DETAIL, payload);
  return response;
}

export default {
  addBankDetail: (...args) => useMutation(addBankDetail, ...args),
};
