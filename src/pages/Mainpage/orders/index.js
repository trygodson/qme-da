import { Row } from 'reactstrap';
import RippleTable from '../../../shared/components/tables/table/TableCard';
import React, { useRef, createRef, useEffect, useState } from 'react';
import usePharmacyOrderService from '../../../shared/hooks/api/usePharmacyOrderService';
import usePrescriptionService from '../../../shared/hooks/api/usePrescriptionService';
import { useTenantState } from '../../../shared/context/useTenantContext';
import moment from 'moment';
import Modal from 'react-modal';
import { X } from 'react-bootstrap-icons';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
  },
};

function index() {
  const modalRef = useRef();
  const refreshRef = createRef();
  const { mutateAsync: getPharmacyOrdersByTenantId } =
    usePharmacyOrderService.useGetPharmacyOrdersByTenantIdService();
  const { mutateAsync: completePharmacyOrder } =
    usePharmacyOrderService.useCompletePharmacyOrderService();
  const { mutateAsync: getDrugsByPrescriptionId } =
    usePrescriptionService.useGetDrugsByPrescriptionIdService();
  const { tenant } = useTenantState();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [prescriptionId, setPrescriptionId] = useState(null);
  const [orderTitle, setOrderTitle] = useState(null);
  const [drugs, setDrugs] = useState([]);

  async function _completePharmacyOrder(id) {
    const response = await completePharmacyOrder(id);
    window.location.reload(false);
  }

  async function getDrugs(id) {
    const response = await getDrugsByPrescriptionId(id);
    setDrugs(response.data);
  }

  const findIsCompletedValue = (i, v) => {
    let _i = i.findIndex(val => val.id == v);

    return i[_i].iscompleted;
  };

  const findDrugPrescriptionId = (i, v) => {
    let _i = i.findIndex(val => val.id == v);

    return i[_i].drug_prescription_id;
  };

  const findItem = (i, v) => {
    let _i = i.findIndex(val => val.id == v);

    return i[_i];
  };

  useEffect(() => {
    getDrugs(prescriptionId);
  }, [prescriptionId]);

  const decorator = [
    {
      label: 'Order',
      accessor: 'id',
      Cell: props => (
        <>
          Order <b>#{props.value}</b>
        </>
      ),
    },
    {
      label: 'Delivery Channel',
      accessor: 'deliverychannel',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'Start Date',
      disableSorting: true,
      accessor: 'created_at',
      Cell: props => <>{moment(props.value).format('LL')}</>,
    },
    {
      id: '4445',
      label: 'More details',
      accessor: 'id',
      Cell: props => (
        <a
          href="#"
          style={{ textDecoration: 'underline' }}
          onClick={e => {
            e.preventDefault();
            setIsOpen(true);
            setOrderTitle(findItem(props.data, props.value)['id']);
            setPrescriptionId(findItem(props.data, props.value)['drug_prescription_id']);
          }}
        >
          View more
        </a>
      ),
    },
    {
      id: '444',
      label: 'Mark as complete',
      accessor: 'id',
      Cell: props => (
        <input
          type="checkbox"
          data-toggle="toggle"
          style={{ fontSize: '20px !important' }}
          className="checkboxtext"
          data-onstyle="primary"
          checked={findIsCompletedValue(props.data, props.value)}
          onClick={() => _completePharmacyOrder(props.value)}
        />
      ),
    },
  ];

  return (
    <main>
      <div className="main__container">
        <div className="row" style={{ marginTop: '120px' }}>
          <div className="col-12">
            <RippleTable
              title={'Orders'}
              handleAddNew={() => {
                refreshRef.current.onClick();
              }}
              column={decorator}
              rowAction={() => modalRef.current.props.toggle()}
              handleView={row => {}}
              fetchService={getPharmacyOrdersByTenantId}
              fullpage={true}
              refreshRef={refreshRef}
              showRefresh
              args={{ id: tenant.tenant.id }}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={() => {}}
        onRequestClose={() => {}}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Order #{orderTitle}</h2>
        ==============================
        <br />
        <br />
        {drugs.map(drug => {
          return (
            <>
              <b>Name: {drug.name}</b>
              <p style={{ marginBottom: '-1px' }}>Dosage: {drug.dosage_description}</p>
              <p>Amount: {drug.amount}</p>
              --------------------------
              <br />
            </>
          );
        })}
        <br />
        <br />
        <button className="btn btn-primary btn-block" onClick={() => setIsOpen(false)}>
          Close
        </button>
      </Modal>
    </main>
  );
}

export default index;
