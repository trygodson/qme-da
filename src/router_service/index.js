import Appointment from '../pages/Mainpage/appointment';
import AdminAppointment from '../pages/Mainpage/adminappointment';
import { lazy } from 'react';
import ForgetPassword from '../pages/Auth/ForgetPassword';
import DasboardSelector from '../pages/Mainpage/dashboard';
import Chat from '../pages/Mainpage/Chat/chat';
import PatientRecordDetails from '../pages/Mainpage/PatientRecordDetails/patientrecordetails';
import Tenants from '../pages/Mainpage/Tenants/createTenant';
import AllDoctors from '../pages/Mainpage/admin/doctors/alldoctors';
import Profile from '../pages/Mainpage/profile';
import UserProfile from '../pages/Mainpage/userprofile/userprofile';
import DoctorAppointment from '../pages/Mainpage/appointment/appointmentlisting/doctorappointment';
import WithDrawal from '../pages/Mainpage/withdrawal';
import AllWithdrawal from '../pages/Mainpage/admin/withdrawals/allwithdrawals';
import GetAllDrugs from '../pages/Mainpage/admin/drugs/getAllDrugs';
import Transactions from '../pages/Mainpage/transactions';
import LabOrders from '../pages/Mainpage/laborders';
import Orders from '../pages/Mainpage/orders';
import Settings from '../pages/Mainpage/settings';

export default [
  {
    path: 'dashboard',
    component: DasboardSelector,
  },
  {
    path: 'test',
    component: ForgetPassword,
  },
  {
    path: 'doctors',
    component: AllDoctors,
  },
  {
    path: 'chat',
    component: Chat,
  },
  {
    path: 'patient-record-details',
    component: PatientRecordDetails,
  },
  {
    path: 'tenants',
    component: Tenants,
  },
  {
    path: 'appointments',
    component: DoctorAppointment,
  },

  {
    path: 'all-drugs',
    component: GetAllDrugs,
  },
  {
    path: 'all-withdrawals',
    component: AllWithdrawal,
  },
  {
    path: 'appointments/',
    component: Appointment,
  },

  {
    path: 'withdrawal/',
    component: WithDrawal,
  },
  {
    path: 'laborders',
    component: LabOrders,
  },
  {
    path: 'transactions',
    component: Transactions,
  },
  {
    path: 'all-appointments',
    component: AdminAppointment,
  },
  {
    path: 'profile',
    component: UserProfile,
  },
  {
    path: 'orders',
    component: Orders,
  },
  // {
  //   path: 'settings',
  //   component: Settings,
  // },
];
