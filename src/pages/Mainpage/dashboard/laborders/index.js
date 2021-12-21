import { Row } from 'reactstrap';
import RippleTable from '../../../shared/components/tables/table/TableCard';
import { LabTestForm } from './labtestform';

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

const LabOrders = () => {
  const [labTestForm, setLabTestForm] = useState(false);
  return (
    <>
      <main>
        <div className="main__container">
          <div className="row" style={{ marginTop: '120px' }}>
            <div className="col-12">
              <Row className="">
                <RippleTable
                  title={'Lab Orders'}
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
        {labTestForm && <LabTestForm setLabTestForm={setLabTestForm} />}
      </main>
    </>
  );
};

export default LabOrders;
