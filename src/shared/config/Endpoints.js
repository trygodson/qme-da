const BASE_URL = 'https://shop.scnip.net/api/v1/';
// const BASE_URL = 'http://localhost:8000/api/v1/';
const ApiEndpoints = {
  //Doctor
  GET_DOCTOR_INFO_USERID: `doctordetail/user`,
  DOCTOR_REGISTER: `doctor/create`,
  ADD_SPECIALIZATION: `doctorspecialization/create`,
  ADD_TENANT: `tenant/create`,
  GET_ALL_DOCTORS: `doctors`,
  GET_ALL_APPOINTMENT: `administrator/appointments`,
  CHANGE_DOCTOR_STATUS: `doctor/changestate`,
  GET_DOCTOR_SUMMARY_DATA: `doctor/detailscount`,
  GET_DOCOTR_MONEY: `doctor/account`,
  //Appointment
  GET_ALL_DOCTORS_APPOINTMENT: `appointment/doctor`,
  GET_APPOINTMENT_BY_CUSTOMER_ID: `appointment/customer`,
  //Tenants
  GET_ALL_TENANTS: `tenants`,
  ADD_TENANT: `tenant/create`,
  GET_LAB_REQUEST_BY_TENANT_ID: `labtestrequest/tenant`,

  //Tenant Member
  GET_TENANT_DETAIL: `tenant`,
  GET_TENANT_MEMBER: `tenantmember`,

  //Withdrawals
  GET_ALL_WITHDRAWALS: `wallet/withdrawals`,

  //Appointment
  GET_ALL_DOCTORS_APPOINTMENT: `appointment/doctor`,
  GET_APPOINTMENT_BY_CUSTOMER_ID: `appointment/customer`,
  GET_SINGLE_APPOINTMENT_BY_ID: `appointment/getbyid`,
  GET_LAST_APPOINTMENT_BY_USER_ID: `lastappointment/user`,
  GET_PRESCRIPTION_APPOINTMENT_BY_ID: `prescriptions/appointment`,
  CHANGE_STATUS: `appointment/changestatus`,
  CHANGE_APPOINTMENT_STATUS_TO_TWO: `appointment/update`,
  CREATE_DIAGNOSIS: `appointment/diagnosis/create`,
  //labtest
  ADD_LABTEST: `labtest/add`,
  GET_LABTEST_BY_USER_ID: `user/labtest`,
  UPDATE_LAB_RESULT: `updateresult/labtest`,

  //drug
  ADD_PRESCRIBED_DRUG: `drug/prescribe`,
  GET_DRUG_LIST: `drugs/byname`,

  // Prescription
  GET_PRESCRIPTION_BY_APPOINTMENT_ID: `drug/prescription/byappointment`,
  GET_PRESCRIPTION_ITEMS_BY_APPOINTMENT_ID: `prescriptions/appointment`,
  GET_DRUGS_BY_PRESCRIPTION_ID: `prescriptions/byprescriptionid`,
  DELETE_PRESCRIPTION_ITEM: `drug/prescription-item/delete`,

  // labtest
  ADD_LABTEST: `labtest/add`,
  GET_LABTEST_BY_APPOINTMENT_ID: `getlabtestbyappointmentid`,
  UPDATE_LABTEST_EXTERNAL_STATUS: `lab/external`,
  UPDATE_LABTEST_INTERNAL_STATUS: `lab/internal`,
  UPDATE_LABTEST_RESULT: `labtestrequest/result`,
  GET_LABTEST_REQUEST: `labtestrequest/tenant`,

  // tenants
  GET_ALL_TENANTS: `tenants`,

  //Admin
  GET_ADMIN_SUMMARY_DATA: `administrator/summary`,
  // Users
  GET_USER_INFO: `userinfo`,
  UPDATE_USER_INFO: `updateuser`,
  CHANGE_PASSWORD: `changepassword`,
  GET_BIO_DATA: `biodata/byid`,

  //withdrawal
  MAKE_WITHDRAWAL_REQUEST: `wallet/withdraw`,
  GET_WITHDRAWAL_REQUEST_BY_USER_ID: `wallet/withdrawals`,
  GET_AMOUNT: `getwallet-detail`,
  GET_ALL_TRANSACTION: `transactions/all`,
  //bank
  ADD_BANK_DETAIL: `bank-detail/add`,
  GET_USER_DETAILS_BY_ID: `get/user`,

  //Drugs
  GET_ALL_DRUGS: `drugs/all`,
  ADD_ALL_DRUGS: `drug/add`,

  // pharmacyorders
  GET_PHARMACY_ORDERS_BY_TENANT_ID: `pharmacyorder/tenant`,
  COMPLETE_PHARMACY_ORDER: `pharmacyorder/complete`,

  // ratings
  RATE_DOCTOR: `doctor/rate`,
  GET_DOCTOR_RATING: `doctor/rating`,
};

export { BASE_URL, ApiEndpoints };
