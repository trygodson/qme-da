import React from 'react';
import { useAuthState } from '../../../../shared/context/useAuthContext';
import LabDashboard from './labdashbaord';
import PharmacyDashboard from './pharmacydashboard';

function index({ ...props }) {
  const { user } = useAuthState();
  return (
    <>
      {{
        pharmacy: <LabDashboard {...props} />,
        labs: <PharmacyDashboard {...props} />,
      }[user?.permission[0].split('.')[0]] || (
        <div className="main-wrapper">
          <h1>Bros give up😂</h1>
        </div>
      )}
    </>
  );
}

export default index;
