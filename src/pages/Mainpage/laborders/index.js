import moment from 'moment';
import { createRef, useState } from 'react';
import { Row } from 'reactstrap';
import RippleTable from '../../../shared/components/tables/table/TableCard';
import { useTenantState } from '../../../shared/context/useTenantContext';
import useLabService from '../../../shared/hooks/api/useLabService';
import { LabTestForm } from './labtestform';

const LabOrders = () => {
  const [labTestForm, setLabTestForm] = useState(false);
  const [labId, setLabId] = useState();
  const refreshRef = createRef();

  const onClickLab = id => {
    setLabTestForm(true);
    setLabId(id);
  };
  const findvalue = (i, v) => {
    let _i = i.findIndex(val => val.labtest_id == v);

    return i[_i].iscompleted;
  };
  const findResultImage = (i, v) => {
    let _i = i.findIndex(val => val.labtest_id == v);

    return i[_i].result;
  };

  const decorator = [
    {
      label: 'Result',
      accessor: 'labtest_id',
      Cell: props =>
        findResultImage(props.data, props.value) == null ? (
          <>No Result Yet</>
        ) : (
          <img src={findResultImage(props.data, props.value)} width="50px" />
        ),
    },
    {
      id: 'i',
      label: 'Conclusion',
      accessor: 'conclusion',
      Cell: props => <>{props.value}</>,
    },
    {
      id: 'j',
      label: 'iscompleted',
      accessor: 'iscompleted',
      Cell: props => <>{props.value == 1 ? <>Completetd</> : <>InComplete</>}</>,
    },
    {
      id: 'k',
      label: 'Paid',
      accessor: 'ispaid',
      Cell: props => <>{props.value == 1 ? <>Paid</> : <>Not Paid</>}</>,
    },
    {
      id: 'l',
      label: 'Received',
      accessor: 'isrecieved',
      Cell: props => <>{props.value == 1 ? <>Received</> : <>Not Received</>}</>,
    },
    {
      id: 's',
      label: 'Create Date',
      disableSorting: true,
      accessor: 'created_at',
      Cell: props => <>{moment(props.value).format('LL')}</>,
    },
    {
      id: 'm',
      label: 'Update',
      disableSorting: true,
      accessor: 'labtest_id',
      Cell: props =>
        findvalue(props.data, props.value) == 1 ? (
          <div className="btn btn-sm btn-success">Updated</div>
        ) : (
          <a className="btn btn-secondary btn-sm" onClick={() => onClickLab(props.value)}>
            update
          </a>
        ),
    },
  ];
  const { tenant } = useTenantState();
  const { mutateAsync: getRequest } = useLabService.getLabRequestByTenantId();
  return (
    <>
      <main>
        <div className="main__container">
          <div className="row" style={{ marginTop: '120px' }}>
            <div className="col-12">
              <Row className="">
                <RippleTable
                  title={'Lab Orders'}
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
                  args={{ id: tenant.tenant.id }}
                />
              </Row>
            </div>
          </div>
        </div>
        {labTestForm && <LabTestForm setLabTestForm={setLabTestForm} id={labId} />}
      </main>
    </>
  );
};

export default LabOrders;
