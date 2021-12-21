import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function getPrescriptionsByAppointmentId(payload) {
  const response = await api.get(`${ApiEndpoints.GET_PRESCRIPTION_BY_APPOINTMENT_ID}`, payload);
  return response;
}

async function getPrescriptionItemsByAppointmentId(id) {
  const response = await api.get(`${ApiEndpoints.GET_PRESCRIPTION_ITEMS_BY_APPOINTMENT_ID}/${id}`);
  return response;
}

async function getDrugsByPrescriptionId(id) {
  const response = await api.get(
    `${ApiEndpoints.GET_DRUGS_BY_PRESCRIPTION_ID}?drug_prescription_id=${id}`,
  );
  return response;
}

async function deletePrescriptionItem(id) {
  const response = await api.post(`${ApiEndpoints.DELETE_PRESCRIPTION_ITEM}/${id}`);
  return response;
}

export default {
  useGetPrescriptionsByAppointmentIdService: (...args) =>
    useMutation(getPrescriptionsByAppointmentId, ...args),
  useGetPrescriptionItemsByAppointmentId: (...args) =>
    useMutation(getPrescriptionItemsByAppointmentId, ...args),
  useGetDrugsByPrescriptionIdService: (...args) => useMutation(getDrugsByPrescriptionId, ...args),
  useDeletePrescriptionItem: (...args) => useMutation(deletePrescriptionItem, ...args),
};
