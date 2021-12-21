import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function getAllDrugs(id) {
  const response = await api.get(`${ApiEndpoints.GET_ALL_DRUGS}?page=${id.pageIndex}`);
  return response;
}
async function addDrugs(payload) {
  const response = await api.post(ApiEndpoints.ADD_ALL_DRUGS, payload);
  return response;
}

export default {
  getAllDrugs: (...args) => useMutation(getAllDrugs, ...args),
  addlDrugs: (...args) => useMutation(addDrugs, ...args),
};
