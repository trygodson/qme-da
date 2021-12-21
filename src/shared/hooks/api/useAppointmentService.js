import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function getAllDoctorsAppointment(id) {
  const response = await api.get(
    `${ApiEndpoints.GET_ALL_DOCTORS_APPOINTMENT}/${id.args.id}?page=${id.pageIndex}`,
  );
  return response;
}

async function getAllAppointment(id) {
  const response = await api.get(`${ApiEndpoints.GET_ALL_APPOINTMENT}?page=${id.pageIndex}`);
  return response;
}
async function getAppointmentsCustomerId(id) {
  const response = await api.get(
    `${ApiEndpoints.GET_APPOINTMENT_BY_CUSTOMER_ID}/${id.args.id}?page=${id.pageIndex}`,
  );
  return response;
}
async function getSingleAppointmentDetailbyId(id) {
  const response = await api.get(`${ApiEndpoints.GET_SINGLE_APPOINTMENT_BY_ID}/${id}`);
  return response;
}
async function getBioData(id) {
  const response = await api.get(`${ApiEndpoints.GET_BIO_DATA}?${id}`);
  return response;
}
async function getLastAppointmentUserId(id) {
  const response = await api.get(`${ApiEndpoints.GET_LAST_APPOINTMENT_BY_USER_ID}/${id}`);
  return response;
}
async function addPrescribedDrugs(payload) {
  const response = await api.post(ApiEndpoints.ADD_PRESCRIBED_DRUG, payload);
  return response;
}
async function createDiagnosis(payload) {
  const response = await api.post(ApiEndpoints.CREATE_DIAGNOSIS, payload);
  return response;
}
async function getDrugList(payload) {
  const response = await api.get(`${ApiEndpoints.GET_DRUG_LIST}?name=${payload}`);
  return response;
}
async function getPrescriptionByAppointment(payload) {
  const response = await api.get(`${ApiEndpoints.GET_PRESCRIPTION_APPOINTMENT_BY_ID}/${payload}`);
  return response;
}
async function changeStatus(data) {
  const response = await api.patch(`${ApiEndpoints.CHANGE_STATUS}/${data.id}`, data.payload);
  return response;
}
async function getLabtestByUserId(payload) {
  const response = await api.get(`${ApiEndpoints.GET_LABTEST_BY_USER_ID}/${payload}`);
  return response;
}

async function changeAppointmentStatusToTwo(data) {
  const response = await api.patch(
    `${ApiEndpoints.CHANGE_APPOINTMENT_STATUS_TO_TWO}/${data}`,
    data.payload,
  );
  return response;
}

async function getAppointmentDetailByCustomerId(id) {
  const response = await api.get(
    `${ApiEndpoints.GET_APPOINTMENT_BY_CUSTOMER_ID}/${id.args.id}?page=${id.pageIndex}`,
  );
  return response;
}

export default {
  useAllDoctorAppointment: (...args) => useMutation(getAllDoctorsAppointment, ...args),
  useAllAppointment: (...args) => useMutation(getAllAppointment, ...args),
  getAppointmentsCustomerId: (...args) => useMutation(getAppointmentsCustomerId, ...args),
  getLastAppointmentUserId: (...args) => useMutation(getLastAppointmentUserId, ...args),
  getLabtestByUserId: (...args) => useMutation(getLabtestByUserId, ...args),
  getPrescriptionByAppointmentId: (...args) => useMutation(getPrescriptionByAppointment, ...args),
  createDiagnosis: (...args) => useMutation(createDiagnosis, ...args),
  getBioData: (...args) => useMutation(getBioData, ...args),
  changeStatus: (...args) => useMutation(changeStatus, ...args),
  changeAppointmentStatusToTwo: (...args) => useMutation(changeAppointmentStatusToTwo, ...args),
  addPrescribedDrugs: (...args) => useMutation(addPrescribedDrugs, ...args),
  getDrugList: (...args) => useMutation(getDrugList, ...args),
  getSingleAppointmentDetailById: (...args) => useMutation(getSingleAppointmentDetailbyId, ...args),
  getAppointmentDetailByCustomerId: (...args) =>
    useMutation(getAppointmentDetailByCustomerId, ...args),
};
