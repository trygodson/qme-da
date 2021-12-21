import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function getUserInfo() {
  const response = await api.get(`${ApiEndpoints.GET_USER_INFO}`);
  return response;
}

async function updateUserInfo(payload) {
  const response = await api.patch(`${ApiEndpoints.UPDATE_USER_INFO}`, payload);
  return response;
}

async function changeUserPassword(payload) {
  const response = await api.post(`${ApiEndpoints.CHANGE_PASSWORD}`, payload);
  return response;
}

async function getUserById(id) {
  const response = await api.get(`${ApiEndpoints.GET_USER_DETAILS_BY_ID}/${id}`);
  return response;
}

export default {
  useGetUserInfoService: (...args) => useMutation(getUserInfo, ...args),
  updateUserInfoService: (...args) => useMutation(updateUserInfo, ...args),
  changeUserPasswordService: (...args) => useMutation(changeUserPassword, ...args),
  useGetUserByIdService: (...args) => useMutation(getUserById, ...args),
};
