import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function getAllTransactions() {
  const response = await api.get(`${ApiEndpoints.GET_ALL_TRANSACTION}`);
  return response;
}

export default {
  getAllTransactions: (...args) => useMutation(getAllTransactions, ...args),
};
