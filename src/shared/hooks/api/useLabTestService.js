import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function addLabTest(payload) {
  const response = await api.post(ApiEndpoints.ADD_LABTEST, payload);
  return response;
}

async function getLabTestByAppointmentId(id) {
  const response = await api.get(`${ApiEndpoints.GET_LABTEST_BY_APPOINTMENT_ID}/${id}`);
  return response;
}

async function updateToInternal(id) {
  const response = await api.patch(`${ApiEndpoints.UPDATE_LABTEST_EXTERNAL_STATUS}/${id}`);
  return response;
}

async function updateToExternal(id) {
  const response = await api.patch(`${ApiEndpoints.UPDATE_LABTEST_INTERNAL_STATUS}/${id}`);
  return response;
}

async function updateLabTestResult(id, payload) {
  const response = await api.patch(`${ApiEndpoints.UPDATE_LABTEST_RESULT}/${id}`, payload);
  return response;
}

export default {
  addLabTest: (...args) => useMutation(addLabTest, ...args),
  useGetLabTestByAppointmentIdService: (...args) => useMutation(getLabTestByAppointmentId, ...args),
  useUpdateToInternalService: (...args) => useMutation(updateToExternal, ...args),
  useUpdateToExternalService: (...args) => useMutation(updateToInternal, ...args),
  useUpdateLabTestResultService: (...args) => useMutation(updateLabTestResult, ...args),
};
