import React, { lazy } from 'react';
import { useAuthState } from '../../../shared/context/useAuthContext';
import { useTenantState } from '../../../shared/context/useTenantContext';
import DoctorDashboard from './doctordashboard/doctor';
import UserDashboard from './userdashboard/user';
import AdminDashboard from './admindashboard/admin';
import TenantDashboard from './tenantdashboard';

const DasboardSelector = ({ ...props }) => {
  const { user } = useAuthState();
  // const { tenant } = useTenantState();
  // console.log(tenant.tenant.tenant.tenant.tenant.tenant.tenant.tenant.tenant.tenant.Tenant);
  return (
    <>
      {{
        doctor: <DoctorDashboard {...props} />,
        user: <UserDashboard {...props} />,
        admin: <AdminDashboard {...props} />,
        tenantuser: <TenantDashboard {...props} />,
      }[user?.user?.role] || (
        <div className="main-wrapper">
          <h1>Seems you're an hacker😂</h1>
        </div>
      )}
    </>
  );
};

export default DasboardSelector;
