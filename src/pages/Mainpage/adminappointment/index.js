import React, { createRef, useRef } from 'react';
import { employees } from '../../../shared/hooks/api/testService.js';
import { Row } from 'reactstrap';
import RippleTable from '../../../shared/components/tables/table/TableCard';
import '../../../';
import useAppointmentService from '../../../shared/hooks/api/useAppointmentService.js';
import { getStep } from '../../../shared/helpers/getstep.js';
import moment from 'moment';

function AppointmentDetail() {
  const { mutateAsync: AllAppointment, isLoading } = useAppointmentService.useAllAppointment();
  const modalRef = useRef();
  const refreshRef = createRef;
  function next(id) {
    setId(id);
  }
  const decorator = [
    {
      label: 'Customers Name',
      accessor: 'user',
      Cell: props => (
        <>
          {props.value.firstname} {props.value.lastname}
        </>
      ),
    },
    {
      label: 'Doctors Name',
      accessor: 'doctor.users',
      Cell: props => (
        <>
          {props.value.firstname} {props.value.lastname}
        </>
      ),
    },
    {
      label: 'Step',
      accessor: 'appointment_step',
      Cell: props => <>{getStep(props.value)}</>,
    },

    {
      label: 'Amount',
      disableSorting: true,
      accessor: 'amount',
      Cell: props => <div>₦{props.value}</div>,
    },
    {
      label: 'Charged Amount',
      disableSorting: true,
      accessor: 'onemedy_share',
      Cell: props => <div>₦{props.value}</div>,
    },
    {
      label: 'Date',
      disableSorting: true,
      accessor: 'created_at',
      Cell: props => <div>{moment(props.value).format('LT')}</div>,
    },
  ];
  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <div className="main__greeting">
            <h1>Appointments</h1>
          </div>
        </div>
        <div className="row" style={{ float: 'right' }}>
          <div className="col-6">
            <h1>4</h1>
            <p>
              Total
              <br /> Active
            </p>
          </div>
          <div className="col-6">
            <h1>6</h1>
            <p>
              Total
              <br /> Inactive
            </p>
          </div>
        </div>
        <div className="row" style={{ marginTop: '120px' }}>
          <div className="col-12">
            <Row className="">
              <RippleTable
                title={'All Appointment'}
                column={decorator}
                rowAction={() => modalRef.current.props.toggle()}
                handleView={row => {}}
                fetchService={AllAppointment}
                fullpage={true}
              />
            </Row>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AppointmentDetail;
