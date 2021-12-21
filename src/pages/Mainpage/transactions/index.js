import React, { useRef, createRef, useEffect, useState } from 'react';
import moment from 'moment';
import { Row } from 'reactstrap';
import RippleTable from '../../../shared/components/tables/table/TableCard';
import { useAuthState } from '../../../shared/context/useAuthContext';
import useTransactionService from '../../../shared/hooks/api/useTransactionService';
// import { useDoctorState } from '../../../../shared/context/useDoctorContext';
// import useAppointmentService from '../../../../shared/hooks/api/useAppointmentService';
// import useDoctorService from '../../../../shared/hooks/api/useDoctorService';
// import { Button } from 'reactstrap';

// import Appointment from '..';
// import Swal from 'sweetalert2';
// import { getStep } from '../../../../shared/helpers/getstep';

function Transactions(props) {
  const { mutateAsync: getRequest } = useTransactionService.getAllTransactions();
  const [disabled, setDisabled] = useState(false);
  const refreshRef = createRef();

  const { user } = useAuthState();
  const isUser = user.permission[0] == 'user' ? true : false;

  const decorator = [
    {
      label: 'Is Verified',
      accessor: 'isverified',
      Cell: props => <>₦{props.value}</>,
    },
    {
      id: 'i',
      label: 'Is Debit',
      accessor: 'isdebit',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'Decription',
      accessor: 'payment_description',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'Amount',
      accessor: 'amount',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'PaymentMethod',
      accessor: 'payment_method.name',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'User',
      accessor: 'user',
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
                  showAdd
                  title={'All Transactions'}
                  column={decorator}
                  rowAction={() => modalRef.current.props.toggle()}
                  handleView={row => {}}
                  fetchService={getRequest}
                  fullpage={true}
                  refreshRef={refreshRef}
                  showRefresh
                />
              </Row>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Transactions;
