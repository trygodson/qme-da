import React, { useState, useEffect } from 'react';
import {
  Button,
  Paper,
  Divider,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import styled, { keyframes } from 'styled-components';
import { fadeInDown } from 'react-animations';
import Swal from 'sweetalert2';
import './index.scss';
import usePrescriptionService from '../../../../shared/hooks/api/usePrescriptionService';
import LoadingOverlay from 'react-loading-overlay';
import useTenantService from '../../../../shared/hooks/api/useTenantService';

const bounceAnimation = keyframes`${fadeInDown}`;

const FadeDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

function index({ sm, step, handleBack, handleSkip, handleDynamicBack }) {
  const [option, setOption] = useState(null);
  const [_res, _setRes] = useState(null);
  const { mutateAsync: getPrescriptionsByAppointmentId } =
    usePrescriptionService.useGetPrescriptionsByAppointmentIdService();
  const { mutateAsync: getPrescriptionItemsByAppointmentId } =
    usePrescriptionService.useGetPrescriptionItemsByAppointmentId();
  const [prescriptionItems, setPrescriptionItems] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const { mutateAsync: _getAllTenants } = useTenantService._useGetAllTenantsService();
  const [labs, setLabs] = useState([]);

  async function getPrescriptionsByAppointmentIdFuncCall(payload) {
    const res = await getPrescriptionsByAppointmentId(payload);
    _setRes(res.data);
    const res2 = await getPrescriptionItemsByAppointmentId(sm.id);
    setPrescriptionItems(res2.drug_prescription_item);
    setPageLoading(false);
  }

  async function getLabs() {
    const res = await _getAllTenants();
    setLabs(res.data);
  }

  useEffect(() => {
    getPrescriptionsByAppointmentIdFuncCall({ id: sm.id });
    getLabs();
  }, []);

  useEffect(() => {
    if (sm.appointment_step < step) {
      // doctor has not reached here
      Swal.fire({
        title: 'Previous step not cleared yet',
        text: 'Go back to previous step',
        icon: 'error',
        confirmButtonText: 'Go Back',
      }).then(result => {
        handleBack();
      });
    } else {
      if (_res != null && sm.appointment_step == step && _res.length < 1) {
        Swal.fire('Doctor has not yet uploaded any medication yet', '', 'warning');
      }
    }
  }, [sm, _res]);

  const renderChosen = option => {
    if (option == null) {
      return noOptionChosen();
    } else if (option == 1) {
      return oneMedyLabs();
    } else {
      return noOptionChosen();
    }
  };

  const noOptionChosen = () => {
    return (
      <>
        <div style={{ height: '21.5vh' }} className="hide-on-med-and-down"></div>
        <div style={{ height: '10px' }} className="show-on-medium-and-down"></div>
        <h3 style={{ marginLeft: '-35px' }}>Please choose a lab</h3>
      </>
    );
  };

  const oneMedyLabs = () => {
    return (
      <div style={{ textAlign: 'left' }}>
        <h3>Labs</h3>
        <div className="druglistWrapper jj">
          {labs?.map(item => {
            if (item.tenant_type_id == 2) {
              return (
                <FadeDiv>
                  <div className="drug" key={1}>
                    <div className="d-flex justify-content-between">
                      <h6>{item.name}</h6>
                      <span>
                        <b>{item.IsActive == 1 ? 'Active' : 'Non-active'}</b>
                      </span>
                    </div>
                    <div className="drug_description">
                      {item.address}, {item.city}
                    </div>
                  </div>
                </FadeDiv>
              );
            }
          })}
        </div>
      </div>
    );
  };

  return (
    <LoadingOverlay active={pageLoading} spinner text="Loading...">
      <div className="__border">
        <div className="inner-border kkk">
          {/* d-flex justify-content-center text-center */}
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-sm-12" style={{ textAlign: 'left' }}>
              <div style={{ height: '2.5px' }} className="hide-on-med-and-down"></div>
              <h3>Doctor's Prescription</h3>
              <div className="druglistWrapper" style={{ height: '500px !important' }}>
                {prescriptionItems != null &&
                  prescriptionItems.map((item, i) => {
                    return (
                      <FadeDiv>
                        <div className="drug" key={i}>
                          <div className="d-flex justify-content-between">
                            <h6>{item.name}</h6>
                            <span>₦{item.amount}</span>
                          </div>
                          <div className="drug_description">{item.dosage_description}</div>
                        </div>
                      </FadeDiv>
                    );
                  })}
              </div>
              <div style={{ height: '20px' }}></div>
              <div className="row">
                <div className="col-12">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: '100%' }}
                    onClick={() => setOption(1)}
                  >
                    Buy from One-Medy Lab
                  </Button>
                  <div style={{ height: '8px' }}></div>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ width: '100%' }}
                    onClick={() => setOption(2)}
                  >
                    Buy from External Lab
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-1 hide-on-med-and-down">
              <div style={{ border: '0.1px solid #ccc', height: '100%', width: '.6px' }}></div>
            </div>
            <div className="col-xl-5 col-lg-5 col-sm-12 text-center">
              <div className="container">{renderChosen(option)}</div>
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default index;
