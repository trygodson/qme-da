import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function getTenant(id) {
  const response = await api.get(`${ApiEndpoints.GET_TENANT_DETAIL}/${id}`);
  return response;
}

async function getTenantMember(id) {
  const response = await api.get(`${ApiEndpoints.GET_TENANT_MEMBER}/${id}`);
  return response;
}

export default {
  getTenant: (...args) => useMutation(getTenant, ...args),
  getTenantMember: (...args) => useMutation(getTenantMember, ...args),
};
