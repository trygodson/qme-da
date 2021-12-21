import api from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../../config/Endpoints';

async function getPharmacyOrdersByTenantId(id) {
  const response = await api.get(
    `${ApiEndpoints.GET_PHARMACY_ORDERS_BY_TENANT_ID}?tenant_id=${id.args.id}`,
  );
  return response;
}

async function completePharmacyOrder(id) {
  const response = await api.patch(
    `${ApiEndpoints.COMPLETE_PHARMACY_ORDER}/${id}`,
  );
  return response;
}


export default {
  useGetPharmacyOrdersByTenantIdService: (...args) =>
    useMutation(getPharmacyOrdersByTenantId, ...args),
      useCompletePharmacyOrderService: (...args) =>
    useMutation(completePharmacyOrder, ...args),
};
