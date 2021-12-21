import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function getWithDrawalRequestByUserId(id) {
  const response = await api.get(
    `${ApiEndpoints.GET_WITHDRAWAL_REQUEST_BY_USER_ID}/${id.args.id}?page=${id.pageIndex}`,
  );
  console.log(response);
  return response;
}
async function makeWithWithdrawalRequest(payload) {
  const response = await api.post(ApiEndpoints.MAKE_WITHDRAWAL_REQUEST, payload);
  return response;
}
async function getAmount(payload) {
  const response = await api.get(ApiEndpoints.GET_AMOUNT);
}
async function getAllWithdrawals(id) {
  const response = await api.get(`${ApiEndpoints.GET_ALL_WITHDRAWALS}?page=${id.pageIndex}`);
  return response;
}

export default {
  getWithDrawalRequestByUserId: (...args) => useMutation(getWithDrawalRequestByUserId, ...args),
  makeWithWithdrawalRequest: (...args) => useMutation(makeWithWithdrawalRequest, ...args),
  getAmount: (...args) => useMutation(getAmount, ...args),
  getAllWithdrawals: (...args) => useMutation(getAllWithdrawals, ...args),
};
