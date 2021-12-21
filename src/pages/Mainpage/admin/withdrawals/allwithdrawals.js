import React, { useRef, createRef } from 'react';

import { Button, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import RippleTable from '../../../../shared/components/tables/table/TableCard';
import useDoctorService from '../../../../shared/hooks/api/useDoctorService';
import useWithDrawalService from '../../../../shared/hooks/api/useWithDrawalService';

function AllWithdrawal() {
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

    return i[_i].status;
  };
  const { mutateAsync: AllWithdrawal, isLoading } = useWithDrawalService.getAllWithdrawals();
  const modalRef = useRef();
  const refreshRef = createRef();

  const decorator = [
    {
      label: 'Name',
      accessor: 'user',
      Cell: props => (
        <>
          {props.value.firstname} {props.value.lastname}
        </>
      ),
    },

    {
      label: 'Email',
      accessor: 'user.email',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'Mobile',
      accessor: 'user.phonenumber',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'Amount',
      accessor: 'amount',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'Date',
      accessor: 'created_at',
      Cell: props => <>{props.value}</>,
    },

    {
      label: 'Verification',
      disableSorting: true,
      accessor: 'id',
      Cell: props =>
        findvalue(props.data, props.value) == 'processing' ? (
          <div className="row">
            <Button outline color="success" size="sm" onClick={() => declineStatus(props.value)}>
              Send To Bank
            </Button>
          </div>
        ) : (
          <div> Funds Sent To Bank</div>
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
                showAdd
                title={'All WithDrawal Request'}
                handleAddNew={() => {
                  refreshRef.current.onClick();
                }}
                column={decorator}
                rowAction={() => modalRef.current.props.toggle()}
                handleView={row => {}}
                fetchService={AllWithdrawal}
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

export default AllWithdrawal;
