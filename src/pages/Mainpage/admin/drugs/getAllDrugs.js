import React, { useState, useRef, createRef } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useDrugListService from '../../../../shared/hooks/api/useDrugListService';
import RippleTable from '../../../../shared/components/tables/table/TableCard';
import AddDrugs from './createDrugs';
import { Link } from 'react-router-dom';

function GetAllDrugs() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
  const refreshRef = createRef();
  const { mutateAsync: AllGetAllDrugs, isLoading } = useDrugListService.getAllDrugs();
  const decorator = [
    {
      label: 'Name',
      accessor: 'name',
      Cell: props => <>{props.value}</>,
    },

    {
      label: 'Amount',
      disableSorting: true,
      accessor: 'amount',
      Cell: props => <>{props.value}</>,
    },
    {
      label: 'Status',
      disableSorting: true,
      accessor: 'isavailable',
      Cell: props => <>{props.value == 1 ? 'Yes' : 'No'}</>,
    },
  ];

  return (
    <main>
      <div className="main__container">
        <div className="main__title"></div>
        <div className="row" style={{ marginTop: '40px' }}>
          <div className="col-12"></div>
        </div>
        <div style={{ height: '1px' }}></div>
        <div className="row">
          <div className="col-12">
            <Row className="">
              <a href={require('./drugs.csv')} download="myFile">
                Download file
              </a>
              <RippleTable
                showAdd
                showRefresh
                handleAddNew={() => {
                  setShowModal(!showModal);
                }}
                title={'All Drugs'}
                column={decorator}
                rowAction={() => modalRef.current.props.toggle()}
                handleView={() => {}}
                fetchService={AllGetAllDrugs}
                fullpage={true}
                refreshRef={refreshRef}
              />
            </Row>
          </div>
        </div>

        {showModal && (
          <AddDrugs
            setShowModal={setShowModal}
            formref={() => {
              refreshRef.current.onClick();
            }}
          />
        )}
      </div>
    </main>
  );
}

export default GetAllDrugs;
