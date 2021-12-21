import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function getDoctorByUserId(id) {
  const response = await api.get(`${ApiEndpoints.GET_DOCTOR_INFO_USERID}/${id}`);
  return response;
}
async function getAllDoctors(id) {
  const response = await api.get(`${ApiEndpoints.GET_ALL_DOCTORS}?page=${id.pageIndex}`);
  return response;
}
async function registerDoctor(payload) {
  const response = await api.post(ApiEndpoints.DOCTOR_REGISTER, payload);
  return response;
}
async function changeStatus(payload) {
  const response = await api.patch(
    `${ApiEndpoints.CHANGE_DOCTOR_STATUS}/${payload.id}`,
    payload.data,
  );
  return response;
}
async function addSpecialization(payload) {
  const response = await api.post(ApiEndpoints.ADD_SPECIALIZATION, payload);
  return response;
}

export default {
  useDoctorDetailByUserIdService: (...args) => useMutation(getDoctorByUserId, ...args),
  useRegisterDoctorService: (...args) => useMutation(registerDoctor, ...args),
  useAddSpecialization: (...args) => useMutation(addSpecialization, ...args),
  useAllDoctors: (...args) => useMutation(getAllDoctors, ...args),
  useChangeDoctorState: (...args) => useMutation(changeStatus, ...args),
};
