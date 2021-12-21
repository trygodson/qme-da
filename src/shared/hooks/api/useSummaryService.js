import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function getAdminSummaryData(id) {
  const response = await api.get(`${ApiEndpoints.GET_ADMIN_SUMMARY_DATA}?page=${id.pageIndex}`);
  return response;
}
async function getDoctorSummaryData(id) {
  const response = await api.get(`${ApiEndpoints.GET_DOCTOR_SUMMARY_DATA}/${id}`);
  return response;
}
async function getDoctorSummaryMoneyData(id) {
  const response = await api.get(`${ApiEndpoints.GET_DOCOTR_MONEY}/${id}`);
  return response;
}

export default {
  getAdminSummaryData: (...args) => useMutation(getAdminSummaryData, ...args),
  getDoctorSummaryData: (...args) => useMutation(getDoctorSummaryData, ...args),
  getDoctorSummaryMoneyData: (...args) => useMutation(getDoctorSummaryMoneyData, ...args),
};
