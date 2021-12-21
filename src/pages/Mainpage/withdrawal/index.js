import React, { useRef, createRef, useEffect, useState } from 'react';
import moment from 'moment';
import { Row } from 'reactstrap';
import RippleTable from '../../../shared/components/tables/table/TableCard';
import { useAuthState } from '../../../shared/context/useAuthContext';
import WithDrawalForm from './withdrawalform';
import useWithDrawalService from '../../../shared/hooks/api/useWithDrawalService';
// import { useDoctorState } from '../../../../shared/context/useDoctorContext';
// import useAppointmentService from '../../../../shared/hooks/api/useAppointmentService';
// import useDoctorService from '../../../../shared/hooks/api/useDoctorService';
// import { Button } from 'reactstrap';
import useLabService from '../../../shared/hooks/api/useLabService';

// import Appointment from '..';
// import Swal from 'sweetalert2';
// import { getStep } from '../../../../shared/helpers/getstep';

function WithDrawal(props) {
  const [withDrawalForm, setWithDrawalForm] = useState(false);
  const { mutateAsync: getRequest } = useLabService.getLabRequestByTenantId();
  const [disabled, setDisabled] = useState(false);
  const refreshRef = createRef();

  const { user } = useAuthState();
  const isUser = user.permission[0] == 'user' ? true : false;

  const decorator = [
    {
      label: 'Amount',
      accessor: 'amount',
      Cell: props => <>₦{props.value}</>,
    },
    {
      id: 'i',
      label: 'Status',
      accessor: 'status',
      Cell: props => <>{props.value}</>,
    },
    {
      id: 's',
      label: 'Create Date',
      disableSorting: true,
      accessor: 'created_at',
      Cell: props => <>{moment(props.value).format('LL')}</>,
    },
  ];

  return (
    <>
      <main>
        <div className="main__container">
          <div className="row" style={{ marginTop: '120px' }}>
            <div className="col-12">
              <Row className="">
                <RippleTable
                  title={'My WithDrawal'}
                  handleAddNew={() => {
                    // refreshRef.current.onClick();
                    setWithDrawalForm(true);
                  }}
                  column={decorator}
                  rowAction={() => modalRef.current.props.toggle()}
                  handleView={row => {}}
                  fetchService={getRequest}
                  fullpage={true}
                  refreshRef={refreshRef}
                  showRefresh
                  args={{ id: user.user.id }}
                />
              </Row>
            </div>
          </div>
        </div>
        {withDrawalForm && <WithDrawalForm setWithDrawalForm={setWithDrawalForm} />}
      </main>
    </>
  );
}

export default WithDrawal;
