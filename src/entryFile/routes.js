import { lazy } from 'react';
import ForgetPassword from '../pages/Auth/ForgetPassword';
import DefaultLayout from '../pages/layout';
// import { Login } from '../pages/Auth/Login';
// import { Register } from '../pages/Auth/Register';
import RedirectionPage from '../pages/Redirection';
import MissingInfo from '../pages/Mainpage/missinginfoforms';
import DoctorAppointment from '../pages/Mainpage/appointment/appointmentlisting/doctorappointment';
// const Dashboard = lazy(() => import('../pages/Mainpage/dashboard/DashboardOverview'));
// const Register = lazy(() => import('../pages/Auth/Register'));
// const ForgetPassword = lazy(() => import('../pages/Auth/ForgetPassword'));
//const DefaultLayout = lazy(() => import("../pages/layout"));

export const routes = [
  {
    path: '/:id',
    exact: true,
    component: RedirectionPage,
    guarded: false,
  },
  {
    path: '/update/doctor',
    exact: true,
    component: MissingInfo,
    guarded: false,
  },
  {
    path: '/app',
    component: DefaultLayout,
    guarded: true,
  },
];
