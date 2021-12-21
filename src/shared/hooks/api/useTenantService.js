import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function getAllTenants(args) {
  const response = await api.get(`${ApiEndpoints.GET_ALL_TENANTS}?page=${args.pageIndex}`);
  return response;
}

async function _getAllTenants() {
  const response = await api.get(`${ApiEndpoints.GET_ALL_TENANTS}`);
  return response;
}

async function addTenant(payload) {
  const response = await api.post(ApiEndpoints.ADD_TENANT, payload);
  return response;
}

export default {
  useGetAllTenantsService: (...args) => useMutation(getAllTenants, ...args),
  _useGetAllTenantsService: (...args) => useMutation(_getAllTenants, ...args),
  useAddTenantService: (...args) => useMutation(addTenant, ...args),
};
