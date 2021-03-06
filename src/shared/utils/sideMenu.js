import { userPermissions } from './userPermissions';
import {
  House,
  Calendar2Check,
  BagPlus,
  Wallet,
  ChatSquare,
  CashStack,
  ClipboardCheck,
  HouseDoor,
  BookHalf,
  Bank,
  PersonCircle,
  Calculator,
  People,
  ChatQuote,
  Bank2,
  Gear,
} from 'react-bootstrap-icons';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
export const MenuList = [
  {
    id: 'dashboard',
    label: 'DASHBOARD',
    to: 'dashboard',
    icon: <HouseDoor size={22} />,
  },

  // {
  //   id: 'employee',
  //   label: 'Test',
  //   to: '/app/test',
  //   permissions: [userPermissions.Doctor],
  // },
  {
    id: 'chat',
    label: 'Chat',
    to: 'chat',
    icon: <ChatQuote size={22} />,
    permissions: [userPermissions.User, userPermissions.Doctor],
  },
  {
    id: 'tenants',
    label: 'TENANTS ',
    to: 'tenants',
    icon: <BookHalf size={22} />,
    permissions: [userPermissions.Admin],
  },
  {
    id: 'all-appointments',
    label: 'APPOINTMENTS ',
    to: 'all-appointments',
    icon: <Calendar2Check size={22} />,
    permissions: [userPermissions.Admin],
  },
  {
    id: 'all-withdrawals',
    label: 'WITHDRAWALS ',
    to: 'all-withdrawals',
    icon: <Bank2 size={22} />,
    permissions: [userPermissions.Admin],
  },
  {
    id: 'transactions',
    label: 'TRANSACTIONS ',
    to: 'transactions',
    icon: <Bank size={22} />,
    permissions: [userPermissions.Admin],
  },
  {
    id: 'profile',
    label: 'PROFILE ',
    to: 'profile',
    icon: <PersonCircle size={22} />,
    permissions: [userPermissions.User, userPermissions.Doctor, userPermissions.Admin],
  },
  {
    id: 'all-drugs',
    label: 'DRUGS ',
    to: 'all-drugs',
    icon: <Calculator size={22} />,
    permissions: [userPermissions.Admin],
  },
  {
    id: 'doctors',
    label: 'DOCTORS',
    icon: <People size={22} />,
    to: '/app/doctors',
    permissions: [userPermissions.Admin],
  },
  {
    id: 'orders',
    label: 'ORDERS',
    icon: <People size={22} />,
    to: '/app/laborders',
    permissions: [userPermissions.LabAdmin, userPermissions.LabMember],
  },
  // {
  //   id: 'page:patient_record_details',
  //   label: 'page:patient_record_details',
  //   to: 'patient-record-details',
  //   icon: <House size={22} />,
  // },

  {
    id: 'appointments',
    label: 'APPOINTMENT',
    to: '/app/appointments',
    icon: <Calendar2Check size={22} />,
    permissions: [userPermissions.User, userPermissions.Doctor],
  },

  // {
  //   id: 'prescription',
  //   label: 'PRESCRIPTION',
  //   to: 'prescription',
  //   icon: <BagPlus size={22} />,
  //   permissions: [userPermissions.Doctor],
  // },

  // {
  //   id: 'wallet',
  //   label: 'WALLET',
  //   to: 'wallet',
  //   icon: <Wallet size={22} />,
  //   permissions: [userPermissions.Doctor],
  // },
  // {
  //   id: 'lab-result',
  //   label: 'LAB RESULT',
  //   to: 'lab-result',
  //   icon: <ClipboardCheck size={22} />,
  //   permissions: [userPermissions.Doctor],
  // },
  // {
  //   id: 'earning',
  //   label: 'EARNING',
  //   to: 'earning',
  //   icon: <CashStack size={22} />,
  //   permissions: [userPermissions.Doctor],
  // },
  {
    id: 'withdrawal',
    label: 'WITHDRAWAL',
    to: '/app/withdrawal',
    icon: <Bank2 size={22} />,
    permissions: [userPermissions.Doctor],
  },

  {
    id: 'orders',
    label: 'ORDERS',
    to: '/app/orders',
    icon: <Bank2 size={22} />,
    permissions: [userPermissions.PharmacyAdmin, userPermissions.PharmacyMember],
  },
  {
    id: 'settings',
    label: 'SETTINGS',
    to: '/app/settings',
    icon: <Gear size={22} />,
    permissions: [userPermissions.Doctor],
  },
];
