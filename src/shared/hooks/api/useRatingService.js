import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function rateDoctor(id, payload) {
  const response = await api.post(`${ApiEndpoints.RATE_DOCTOR}/${id}`, payload);
  return response;
}

async function getDoctorRating(id) {
  const response = await api.get(`${ApiEndpoints.GET_DOCTOR_RATING}/${id}`);
  return response;
}

export default {
  useRateDoctorService: (...args) => useMutation(rateDoctor, ...args),
  useGetDoctorRatingService: (...args) => useMutation(getDoctorRating, ...args),
};
