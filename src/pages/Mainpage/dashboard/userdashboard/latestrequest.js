import React, { useRef } from 'react';
import { employees } from '../../../../shared/hooks/api/testService.js';
import { Row } from 'reactstrap';
import RippleTable from '../../../../shared/components/tables/table/TableCard';
import '../../../../';

const LatestRequest = () => {
  const modalRef = useRef();

  const decorator = [
    {
      label: 'First Name',
      accessor: 'fullName',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'Email',
      accessor: 'email',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'Mobile',
      accessor: 'mobile',
      Cell: props => <>{props.value}</>,
    },

    {
      label: 'Department',
      disableSorting: true,
      accessor: 'department',
      Cell: props => <div style={{ color: 'green' }}>{props.value}</div>,
    },
  ];

  return (
    <Row className="">
      <RippleTable
        title={'Recent Request'}
        column={decorator}
        rowAction={() => modalRef.current.props.toggle()}
        //handleView={(row)=>alert(row.fullName)}
        fetchService={employees}
      />
    </Row>
  );
};

export default LatestRequest;
