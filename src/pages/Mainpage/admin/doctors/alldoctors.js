import React, { useRef, createRef } from 'react';

import { Button, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import RippleTable from '../../../../shared/components/tables/table/TableCard';
import useDoctorService from '../../../../shared/hooks/api/useDoctorService';

function AllDoctors() {
  const { mutateAsync: changeStatus, isLoading2 } = useDoctorService.useChangeDoctorState();
  const acceptStatus = async id => {
    Swal.fire({
      title: 'Are You Sure You Want To Activate the Doctor?',
      showCancelButton: true,
      confirmButtonText: 'Okay',
      denyButtonText: `Cancel`,
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const res = changeStatus({ id: id, data: { isactivated: true } });

          if (res) {
            // console.log(res);
            // setDisabled(true);
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
      title: 'Are You Sure You Want To Deactivate this doctor?',
      showCancelButton: true,
      confirmButtonText: 'Okay',
      denyButtonText: `Cancel`,
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */

      try {
        const res = changeStatus({ id: id, data: { isactivated: false } });

        Swal.fire('Declined!', '', 'success');
      } catch (error) {
        console.log(error);
      }
    });
  };
  const findvalue = (i, v) => {
    let _i = i.findIndex(val => val.id == v);

    return i[_i].isactivated;
  };
  const { mutateAsync: allDoctors, isLoading } = useDoctorService.useAllDoctors();
  const modalRef = useRef();
  const refreshRef = createRef();

  const decorator = [
    {
      label: 'FirstName',
      accessor: 'users.firstname',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'LastName',
      accessor: 'users.lastname',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'Email',
      accessor: 'users.email',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'Mobile',
      accessor: 'users.phonenumber',
      Cell: props => <>{props.value}</>,
    },

    {
      label: 'Verification',
      disableSorting: true,
      accessor: 'id',
      Cell: props =>
        findvalue(props.data, props.value) == 1 ? (
          <div className="row">
            <Button outline color="success" size="sm" onClick={() => declineStatus(props.value)}>
              Deactive
            </Button>
          </div>
        ) : (
          <div>
            {' '}
            <Button outline color="danger" size="sm" onClick={() => acceptStatus(props.value)}>
              Activate
            </Button>
          </div>
        ),
    },
  ];
  return (
    <main>
      <div className="main__container">
        <div className="row" style={{ marginTop: '120px' }}>
          <div className="col-12">
            <Row className="">
              <RippleTable
                title={'All Doctors'}
                column={decorator}
                rowAction={() => modalRef.current.props.toggle()}
                handleView={row => {}}
                fetchService={allDoctors}
                fullpage={true}
                refreshRef={refreshRef}
                showRefresh
              />
            </Row>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AllDoctors;
