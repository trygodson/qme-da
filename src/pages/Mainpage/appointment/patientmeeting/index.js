import React, { useEffect, useState } from 'react';
import './index.scss';
import { Button } from '@material-ui/core';
import moment from 'moment';
import UseCountDown from '../../../../shared/hooks/useCountDown';
import Iframe from 'react-iframe';
import { bounceInRight, fadeInDown } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { useAuthState } from '../../../../shared/context/useAuthContext';
import { Spinner } from 'reactstrap';
import useAppointmentService from '../../../../shared/hooks/api/useAppointmentService';
import Swal from 'sweetalert2';

const bounceAnimation = keyframes`${bounceInRight}`;
const InfoAnimation = keyframes`${fadeInDown}`;
const _style = styled.div`
  animation: 1s ${bounceAnimation};
`;
const FadeDiv = styled.div`
  animation: 0.5s ${InfoAnimation};
  width: 100%;
  height: 100%;
`;

function index({ sm, handleNext, id }) {
  const [checkAppointment, setCheckAppointment] = useState(null);
  const [viewInfo, setViewInfo] = useState(true);
  const { mutateAsync: changeAppointmentStatusToTwo } =
    useAppointmentService.changeAppointmentStatusToTwo();
  useEffect(() => {
    setTimeout(() => {
      setLoadingOverlay(false);
    }, 2000);
  }, []);
  const changeToStepTwo = async () => {
    try {
      const res = await changeAppointmentStatusToTwo(id);
      if (res.appointment_step == 2) {
        handleNext();
      }
    } catch (error) {
      Swal.fire({
        title: 'Update Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    }
  };
  const [disabled, setDisabled] = useState(true);
  const [LoadingOverlay, setLoadingOverlay] = useState(true);
  const [showIframe, setShowIframe] = useState(false);
  let _r = sm != undefined && sm.starts_at?.split(' ')[0];
  const { user } = useAuthState();
  console.log(sm);
  return (
    <div className="__border">
      <div className="inner-borders" style={{ height: '550px !important' }}>
        <div className="row d-flex justify-content-center text-center ing">
          <div className="content col-8 col-sm-8 col-lg-4 col-md-6 col-xs-12 col-xl-12">
            {sm.appointment_step === 1 ? (
              viewInfo ? (
                showIframe ? (
                  <_style>
                    <Iframe
                      src={`https://portal.ripplesjmlj.com/${sm != undefined && sm.meetingid}/${
                        sm != undefined && sm.meetingpassword
                      }/${user.user.name}`}
                      width="1000"
                      height="500"
                      allow="camera; microphone"
                    />
                  </_style>
                ) : (
                  <FadeDiv>
                    <div className="druglistWrapper my-2">
                      <h3 className="title mt-4">List Of Instruction</h3>
                      <ul className="drug">
                        <li className="mt-2"> Be on time</li>
                        <li className="mt-2"> UnMute your Mic</li>
                        <li className="mt-2"> Frame the camera correctly</li>
                        <li className="mt-2"> Have the right light</li>
                      </ul>
                      <Button
                        variant="contained"
                        color="primary"
                        // disabled={disabled}
                        style={{ marginTop: '10px' }}
                        onClick={() => setViewInfo(false)}
                      >
                        Start Meeting
                      </Button>
                    </div>
                  </FadeDiv>
                )
              ) : (
                <>
                  {showIframe ? (
                    <_style>
                      <Iframe
                        src={`https://portal.ripplesjmlj.com/${sm != undefined && sm.meetingid}/${
                          sm != undefined && sm.meetingpassword
                        }/${user.user.name}`}
                        width="900"
                        height="500"
                        allow="camera; microphone"
                      />
                    </_style>
                  ) : (
                    <>
                      {LoadingOverlay ? (
                        <Spinner animation="border" variant="dark" />
                      ) : (
                        <h1 align="center">
                          <UseCountDown time={_r} setDisabled={setDisabled} />
                        </h1>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={disabled}
                        style={{ marginTop: '10px' }}
                        onClick={() => setShowIframe(true)}
                      >
                        Start Meeting
                      </Button>
                    </>
                  )}
                </>
              )
            ) : (
              <h1>This Step Has Already Been Taken</h1>
            )}
          </div>
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        disabled={disabled}
        style={{ marginTop: '10px' }}
        onClick={() => changeToStepTwo()}
      >
        Next
      </Button>
    </div>
  );
}

export default index;
