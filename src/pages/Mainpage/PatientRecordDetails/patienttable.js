import moment from 'moment';
import { useState } from 'react';
import { Row } from 'reactstrap';
import Swal from 'sweetalert2';
import RippleTable from '../../../shared/components/tables/table/TableCard';
import useAppointmentService from '../../../shared/hooks/api/useAppointmentService';
const PatientTable = ({ id, setDetailRecord }) => {
  const { mutateAsync: RecordDetails, isLoading } =
    useAppointmentService.getSingleAppointmentDetailById();

  const updateRecord = async rec_id => {
    try {
      const res = await RecordDetails(rec_id);
      setDetailRecord(res);
    } catch (error) {
      Swal.fire({
        title: 'Unable to Get',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    }
  };
  const decorator = [
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
      label: 'Amount',
      accessor: 'doctor_share',
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
      label: 'Start Date',
      disableSorting: true,
      accessor: 'starts_at',
      Cell: props => <>{moment(props.value).format('LL')}</>,
    },
    {
      label: 'Start Time',
      disableSorting: true,
      accessor: 'starts_at',
      Cell: props => <>{moment(props.value).format('LT')}</>,
    },
    {
      label: 'End Time',
      disableSorting: true,
      accessor: 'ends_at',
      Cell: props => <>{moment(props.value).format('LT')}</>,
    },

    {
      id: 'view',
      accessor: 'id',
      label: 'View',

      Cell: props => (
        <>
          <a className="btn btn-sm btn-primary" onClick={() => updateRecord(props.value)}>
            view
          </a>
        </>
      ),
    },
  ];

  const { mutateAsync: getCustomerAppointments } =
    useAppointmentService.getAppointmentsCustomerId();
  return (
    <Row className="p-2">
      <RippleTable
        title={'Past Records'}
        //   handleAddNew={() => {
        //     refreshRef.current.onClick();
        //   }}
        column={decorator}
        //   rowAction={() => modalRef.current.props.toggle()}
        handleView={row => {}}
        fetchService={getCustomerAppointments}
        // refreshRef={refreshRef}
        // showRefresh
        args={{ id: id }}
      />
    </Row>
  );
};

export default PatientTable;
