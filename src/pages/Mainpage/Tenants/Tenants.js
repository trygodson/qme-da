import React, { useState, useRef, createRef } from 'react';
import { employees } from '../../../shared/hooks/api/testService.js';
import { Row } from 'reactstrap';
import RippleTable from '../../../shared/components/tables/table/TableCard';
import '../../..';

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideModalForm from '../../../shared/components/sidemodalform/sidemodalform';
import LatestRequest from '../dashboard/doctordashboard/latestrequest';
import CreateTenant from './createTenant.js';
import useTenantService from '../../../shared/hooks/api/useTenantService.js';

function Tenants() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
  const refreshRef = createRef();
  const { mutateAsync: AllTenants, isLoading } = useTenantService.useGetAllTenantsService();
  const decorator = [
    {
      label: 'TenantName',
      accessor: 'name',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'TenantType',
      accessor: 'tenanttype.name',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'Address',
      accessor: 'address',
      Cell: props => <>{props.value}</>,
    },

    {
      label: 'City',
      disableSorting: true,
      accessor: 'city',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'Status',
      disableSorting: true,
      accessor: 'IsActive',
      Cell: props => <>{props.value == 1 ? 'Activated' : 'Deactivated'}</>,
    },
  ];

  return (
    <main>
      <div className="main__container">
        <div className="main__title"></div>
        <div className="row" style={{ marginTop: '40px' }}>
          <div className="col-12"></div>
        </div>
        <div style={{ height: '1px' }}></div>
        <div className="row">
          <div className="col-12">
            <Row className="">
              <RippleTable
                showAdd
                showRefresh
                handleAddNew={() => {
                  setShowModal(!showModal);
                }}
                title={'Tenant'}
                column={decorator}
                rowAction={() => modalRef.current.props.toggle()}
                handleView={() => {}}
                fetchService={AllTenants}
                fullpage={true}
                refreshRef={refreshRef}
              />
            </Row>
          </div>
        </div>

        {showModal && (
          <CreateTenant
            setShowModal={setShowModal}
            formref={() => {
              refreshRef.current.onClick();
            }}
          />
        )}
      </div>
    </main>
  );
}

export default Tenants;
