import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function getLabRequestByTenantId(args) {
  const response = await api.get(
    `${ApiEndpoints.GET_LAB_REQUEST_BY_TENANT_ID}?tenant_id=${args.args.id}`,
  );
  return response;
}
async function updateLabTestResult({ id, payload }) {
  const response = await api.patch(`${ApiEndpoints.UPDATE_LABTEST_RESULT}/${id}`, payload);
  return response;
}

export default {
  getLabRequestByTenantId: (...args) => useMutation(getLabRequestByTenantId, ...args),
  updateLabTestResult: (...args) => useMutation(updateLabTestResult, ...args),
};
