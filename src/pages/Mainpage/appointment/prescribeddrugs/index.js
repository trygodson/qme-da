import React, { useEffect, useState, useRef } from 'react';
import AsyncInput from 'react-select/async';
import { Button } from '@material-ui/core';
import './index.scss';
import axios from 'axios';
import { X } from 'react-bootstrap-icons';
import styled, { keyframes } from 'styled-components';
import { fadeInDown } from 'react-animations';
import useAppointmentService from '../../../../shared/hooks/api/useAppointmentService';
import usePrescriptionService from '../../../../shared/hooks/api/usePrescriptionService';
import { useParams } from 'react-router-dom';
import { ApiEndpoints, BASE_URL } from '../../../../shared/config/Endpoints';
import LoadingOverlay from 'react-loading-overlay';

const bounceAnimation = keyframes`${fadeInDown}`;

const FadeDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

function PrescribedDrugs({ handleNext, id }) {
  const [selectedDrug, setSelectedDrug] = useState();
  const [prescription, setPrescription] = useState('');
  const [prescribedDrug, setPrescribedDrug] = useState({});
  const [prescribedDrugs, setPrescribedDrugs] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [finishedList, setFinishedList] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: addPrescribedDrugs } = useAppointmentService.addPrescribedDrugs();
  const { mutateAsync: getDrugList } = useAppointmentService.getDrugList();
  const { mutateAsync: getPrescriptionItemsByAppointmentId } =
    usePrescriptionService.useGetPrescriptionItemsByAppointmentId();
  const { mutateAsync: deletePrescriptionItem } =
    usePrescriptionService.useDeletePrescriptionItem();

  const drugOption = async (text, callback) => {
    const res = await getDrugList(text);
    console.log('drugs==>', res);
    callback(
      res.data.map(i => ({
        label: i.name,
        value: i.amount,
        // drug_prescription_id: i.id,
        // appointment_id: id,
      })),
    );
  };
  useEffect(() => {
    let total = 0;
    if (prescribedDrugs.length > 0) {
      prescribedDrugs.forEach(({ amount }) => {
        total += parseInt(amount);
        setTotalPrice(total);
      });
    } else {
      setTotalPrice(0);
    }
  }, [prescribedDrugs]);

  const handlePrescribe = () => {
    const _ps = {
      name: selectedDrug.label,
      amount: selectedDrug.value,
      dosage_description: prescription,
    };
    setPrescribedDrugs([...prescribedDrugs, _ps]);

    setFinishedList({
      total: totalPrice,
      appointment_id: id,
      drugs: [...prescribedDrugs, _ps],
    });
    setPrescription('');
  };

  async function deleteDrugFromServer(id) {
    const response = await deletePrescriptionItem(id);
  }

  const removeDrug = id => {
    let array = [...prescribedDrugs];
    const _d = array.findIndex(drug => drug.id === id);

    // delete from database
    deleteDrugFromServer(id);

    if (_d !== -1) {
      array.splice(_d, 1);
      setPrescribedDrugs([...array]);
    }
  };

  const handlePrescribedDrugs = async () => {
    setIsLoading(true);
    try {
      const res = await addPrescribedDrugs(finishedList);
      if (res) {
        setIsLoading(false);
        handleNext();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getDrugs() {
      const response = await getPrescriptionItemsByAppointmentId(id);
      setPrescribedDrugs(response.drug_prescription_item);
    }
    getDrugs();
  }, []);

  return (
    <LoadingOverlay active={isLoading} spinner text="Sending Prescribed Drugs">
      <div className="__border">
        <div className="inner-border" style={{ height: '550px !important' }}>
          <div className="row d-flex justify-content-center text-center">
            <div className=" col-lg-6 lhs">
              <AsyncInput
                loadOptions={drugOption}
                value={selectedDrug}
                onChange={setSelectedDrug}
              />
              <div className="selectedDrug">
                {selectedDrug && (
                  <div className="drug d-flex justify-content-between">
                    <h6>{selectedDrug.label}</h6>
                    <span>{`₦${selectedDrug.value}`}</span>
                  </div>
                )}
              </div>
              <div className="description">
                <textarea
                  placeholder="prescribe your drug"
                  onChange={({ target }) => {
                    setPrescription(target.value);
                  }}
                />
              </div>
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePrescribe}
                disabled={selectedDrug === null || prescription.length < 1}
              >
                Add Drug
              </Button>
            </div>
            <div className=" col-lg-6 rhs">
              <div className="druglistWrapper my-2">
                {prescribedDrugs.map((val, i) => (
                  <FadeDiv>
                    <div className="drug" key={i}>
                      <X size={20} className="close-icon" onClick={() => removeDrug(val.id)} />
                      <div className="d-flex justify-content-between">
                        <h6>{val.name}</h6>
                        <span>{`₦ ${val.amount}`}</span>
                      </div>
                      <div className="drug_description">{val.dosage_description} </div>
                    </div>
                  </FadeDiv>
                ))}
              </div>
              <div className="price">
                <h5>{`₦ ${totalPrice}`}</h5>
              </div>
              <Button
                variant="contained"
                onClick={handlePrescribedDrugs}
                disabled={prescribedDrugs.length < 1}
              >
                Finish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default PrescribedDrugs;
