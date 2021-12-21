import React, { useRef, createRef, useEffect, useState } from 'react';
import moment from 'moment';
import { Row } from 'reactstrap';
import RippleTable from '../../../../shared/components/tables/table/TableCard';
import { useDoctorState } from '../../../../shared/context/useDoctorContext';
import useAppointmentService from '../../../../shared/hooks/api/useAppointmentService';
import useDoctorService from '../../../../shared/hooks/api/useDoctorService';
import { Button } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { Next } from '@themesberg/react-bootstrap/lib/esm/PageItem';
import { useAuthState } from '../../../../shared/context/useAuthContext';
import RateDoctor from '../../../../shared/components/ratedoctor';

import Appointment from '..';
import Swal from 'sweetalert2';
import { getStep } from '../../../../shared/helpers/getstep';
function DoctorAppointment(props) {
  const [id, setId] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const { doctor } = useDoctorState();
  const { mutateAsync: DoctorAppointment, isLoading } =
    useAppointmentService.useAllDoctorAppointment();
  const { mutateAsync: CustomerAppointment } =
    useAppointmentService.getAppointmentDetailByCustomerId();
  const { mutateAsync: changeStatus } = useAppointmentService.changeStatus();
  const modalRef = useRef();
  const refreshRef = createRef();

  const { user } = useAuthState();
  const isUser = user.permission[0] == 'user' ? true : false;

  function next(id) {
    setId(id);
  }
  const findvalue = (i, v) => {
    let _i = i.findIndex(val => val.id == v);

    return i[_i].status;
  };
  const acceptStatus = async id => {
    console.log(id);
    Swal.fire({
      title: 'Are You Sure You Want To Accept The Appointment?',
      showCancelButton: true,
      confirmButtonText: 'Okay',
      denyButtonText: `Cancel`,
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const res = changeStatus({ id: id, payload: { status: 'accepted' } });

          if (res) {
            console.log(res);
            setDisabled(true);
            Swal.fire('Accepted!', '', 'success').then(result => {
              if (result.isConfirmed) {
                return refreshRef.current;
              }
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };
  const declineStatus = async id => {
    Swal.fire({
      title: 'Are You Sure You Want To Decline The Appointment?',
      showCancelButton: true,
      confirmButtonText: 'Okay',
      denyButtonText: `Cancel`,
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const res = changeStatus({ id: id, payload: { status: 'declined' } });

          console.log(res);
          if (res) {
            setDisabled(true);
            Swal.fire('Declined!', '', 'success');
          }
        } catch (error) {
          console.log(error);
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  const customerDecorator = [
    {
      label: 'Doctor Name',
      accessor: 'doctor.users',
      Cell: props => (
        <>
          {console.log(doctor)}
          {props.value.firstname} {props.value.lastname}
        </>
      ),
    },
    {
      label: 'Amount',
      accessor: 'doctor_share',
      Cell: props => <>₦{props.value}</>,
    },
    // {
    //   id: 'p',
    //   label: 'Action',
    //   accessor: 'id',
    //   Cell: props => (
    //     <div className="row">
    //       <Button
    //         outline
    //         color="success"
    //         size="sm"
    //         onClick={() => acceptStatus(props.value)}
    //         disabled={disabled}
    //       >
    //         accept
    //       </Button>
    //       <Button outline color="danger" size="sm" onClick={() => declineStatus(props.value)}>
    //         decline
    //       </Button>
    //     </div>
    //   ),
    // },
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

    // {
    //   label: 'Mobile',
    //   accessor: 'user.phonenumber',
    //   Cell: props => <>{props.value}</>,
    // },
    {
      id: 'view',
      accessor: 'id',
      label: 'View',

      Cell: props => (
        <>
          <a onClick={() => next(props.value)}>view more</a>
        </>
      ),
    },
  ];

  const doctorDecorator = [
    {
      label: 'Customer Name',
      accessor: 'user',
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
      label: 'Step',
      accessor: 'appointment_step',
      Cell: props => <>{getStep(props.value)}</>,
    },
    {
      id: 'i',
      label: 'Status',
      accessor: 'status',
      Cell: props => <>{props.value}</>,
    },
    {
      id: 'p',
      label: 'Action',
      accessor: 'id',
      Cell: props =>
        findvalue(props.data, props.value) == 'initialized' ? (
          <div className="row">
            <Button
              outline
              color="success"
              size="sm"
              onClick={() => acceptStatus(props.value)}
              disabled={disabled}
            >
              accept
            </Button>
            <Button outline color="danger" size="sm" onClick={() => declineStatus(props.value)}>
              decline
            </Button>
          </div>
        ) : (
          <div>{findvalue(props.data, props.value)}</div>
        ),
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
      label: 'Mobile',
      accessor: 'user.phonenumber',
      Cell: props => <>{props.value}</>,
    },
    {
      id: 'view',
      accessor: 'id',
      label: 'View',

      Cell: props => (
        <>
          <a
            className="btn btn-sm btn-primary"
            style={{ color: 'white' }}
            onClick={() => next(props.value)}
          >
            view
          </a>
        </>
      ),
    },
  ];

  return (
    <>
      {(id === null || id === undefined) && (
        <main>
          <div className="main__container">
            <div className="row" style={{ marginTop: '120px' }}>
              <div className="col-12">
                <Row className="">
                  {isUser ? (
                    <RippleTable
                      title={'My Appointment'}
                      column={customerDecorator}
                      rowAction={() => modalRef.current.props.toggle()}
                      handleView={row => {}}
                      fetchService={CustomerAppointment}
                      fullpage={true}
                      refreshRef={refreshRef}
                      showRefresh
                      args={{ id: user.user.id }}
                    />
                  ) : (
                    <RippleTable
                      title={'My Appointment'}
                      handleAddNew={() => {
                        refreshRef.current.onClick();
                      }}
                      column={doctorDecorator}
                      rowAction={() => modalRef.current.props.toggle()}
                      handleView={row => {}}
                      fetchService={DoctorAppointment}
                      fullpage={true}
                      refreshRef={refreshRef}
                      showRefresh
                      args={{ id: doctor.doctor.id }}
                    />
                  )}
                </Row>
              </div>
            </div>
          </div>
        </main>
      )}

      {id !== null && <Appointment id={id} setId={setId} />}
    </>
  );
}

export default DoctorAppointment;
