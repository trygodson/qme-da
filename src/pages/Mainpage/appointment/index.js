import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Stepper, Step, StepLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import PatientMeeting from './patientmeeting';
import SendToLab from './sendtolab';
import './index.scss';
import ChatBox from '../../../shared/components/chatcomponent/chatbox';
import { ArrowLeftCircle, ArrowLeftSquare, Chat } from 'react-bootstrap-icons';
import _chatlist from '../../../assets/jsondata/chat_list.json';
import _chatmessages from '../../../assets/jsondata/chat_messages.json';
import PrescribedDrugs from './prescribeddrugs';
import UserDiagnosisReport from './diagnosesreport';
import LabResults from './labresults';
import Medication from './medication';
import DiagnosisReport from './doctorsdiagnoses';
import ThankYou from './thankyou';
import useAppointmentService from '../../../shared/hooks/api/useAppointmentService';
import useUserService from '../../../shared/hooks/api/useUserService';
import { useAuthState } from '../../../shared/context/useAuthContext';
import axios from 'axios';
import RateDoctor from '../../../shared/components/ratedoctor';

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
  },
  step_label_root: {
    fontSize: '10px',
  },
  wi: {
    width: '100%',
    backgroundColor: 'rgba(255, 0, 225, 0)',
  },
}));

// const AppointmentDetails = ({ id, ...props }) => {

const AppointmentDetails = ({ id, setId }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({ name: 'John Doe', image: 'http://localhost:3000/male.jpg' });
  const [chatMessages, setChatMessages] = useState(_chatmessages);
  const [appointmentDetail, setAppointmentDetail] = useState(null);
  const [changeHandleButton, setChangeHandleButton] = useState(false);
  const { user: _user } = useAuthState();
  const isUser = _user.permission[0] == 'user' ? true : false;

  const [patientDetail, setPatientDetail] = useState(false);
  const { push } = useHistory();
  const steps = getSteps();
  const { mutateAsync: getAppointmentDetails } =
    useAppointmentService.getSingleAppointmentDetailById();
  // const steps = getSteps();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roomKey, setRoomKey] = useState(null);

  const { mutateAsync: getUserById } = useUserService.useGetUserByIdService();
  const [you, setYou] = useState(null);
  const [other, setOther] = useState(null);

  function getSteps() {
    if (isUser) {
      return ['Schedule Meeting', 'Lab Results', 'Medication', 'Diagnoses Report'];
    } else {
      return ['Schedule Meeting', 'Send to Lab', 'Prescribe Drugs', 'Diagnoses Note/ Record'];
    }
  }

  async function getUserByIdFuncCall(id, type) {
    const response = await getUserById(id);
    if (type == 'you') {
      setYou(response);
    } else {
      setOther(response);
    }
  }

  useEffect(() => {
    if (appointmentDetail != null) {
      getUserByIdFuncCall(_user.user.id, 'you');
      getUserByIdFuncCall(
        appointmentDetail.user_id == _user.user.id
          ? appointmentDetail.doctor_id
          : appointmentDetail.user_id,
        'other',
      );
    }
  }, [appointmentDetail]);

  useEffect(() => {
    if (you != null && other != null) {
      console.log(
        `http://onemedy.peerpro.co/api/Chat/checkchatroom?toid=${you.id}&fromid=${other.id}&toimage=${you.image}&fromimage=${other.image}&toname=${you.firstname} ${you.lastname}&fromname=${other.firstname} ${other.lastname}`,
      );
      axios
        .get(
          // get user
          `http://onemedy.peerpro.co/api/Chat/checkchatroom?toid=${you.id}&fromid=${other.id}&toimage=${you.image}&fromimage=${other.image}&toname=${you.firstname} ${you.lastname}&fromname=${other.firstname} ${other.lastname}`,
        )
        .then(({ data }) => {
          console.log('test_data', data);
          setRoomKey(data.referenceId);
          // use roomKey and get both user objects
          // getUserByIdFuncCall(_user.user.id, 'you');
          // getUserByIdFuncCall(
          //   appointmentDetail.user_id == _user.user.id
          //     ? appointmentDetail.doctor_id
          //     : appointmentDetail.user_id,
          //   'other',
          // );
        });
    }
  }, [you, other]);

  console.log('roomKey state===>', roomKey);

  useEffect(() => {
    async function detailData() {
      const res = await getAppointmentDetails(id);
      console.log('appointments=>', res);
      setAppointmentDetail(res);
    }

    detailData();
  }, []);

  const isStepOptional = step => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = step => {
    return skippedSteps.includes(step);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter(skipItem => skipItem !== activeStep));
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleDynamicBack = x => {
    setActiveStep(activeStep - x);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <>
            {
              <PatientMeeting
                sm={appointmentDetail !== null && appointmentDetail}
                setChangeHandleButton={setChangeHandleButton}
                id={id}
                step={1}
                handleNext={handleNext}
              />
            }
          </>
        );

      case 1:
        return (
          <>
            {isUser ? (
              <LabResults
                sm={appointmentDetail !== null && appointmentDetail}
                step={2}
                handleBack={handleBack}
                handleSkip={handleSkip}
              />
            ) : (
              <SendToLab
                sm={appointmentDetail !== null && appointmentDetail}
                handleSkip={handleSkip}
                handleNext={handleNext}
                appointmentId={appointmentDetail.id}
                setChangeHandleButton={setChangeHandleButton}
                id={id}
              />
            )}
          </>
        );
      case 2:
        return (
          <>
            {isUser ? (
              <Medication
                sm={appointmentDetail !== null && appointmentDetail}
                step={3}
                handleBack={handleBack}
                handleSkip={handleSkip}
                handleDynamicBack={handleDynamicBack}
              />
            ) : (
              <PrescribedDrugs
                sm={appointmentDetail !== null && appointmentDetail}
                handleSkip={handleSkip}
                handleNext={handleNext}
                setChangeHandleButton={setChangeHandleButton}
                id={id}
              />
            )}
          </>
        );
      case 3:
        return (
          <>
            {isUser ? (
              <UserDiagnosisReport
                sm={appointmentDetail !== null && appointmentDetail}
                setChangeHandleButton={setChangeHandleButton}
                id={id}
                step={4}
                handleBack={handleBack}
                handleSkip={handleSkip}
              />
            ) : (
              <DiagnosisReport sm={appointmentDetail !== null && appointmentDetail} />
            )}
          </>
        );
      default:
        return 'unknown step';
    }
  };

  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <div className="mr-3 p-2">
            <ArrowLeftCircle size={28} color="#5842f4" onClick={() => setId(null)} />
          </div>
          <div className="main__greeting">
            <h1>Appointment</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="container ___border"></div>
          </div>
        </div>

        <div style={{ height: '30px' }}></div>

        {activeStep === steps.length ? (
          <ThankYou />
        ) : (
          <>
            <div className="row">
              <div className="col-xl-8 col-lg-8 col-sm-12 col-xs-12">
                <div className="container form-div">
                  <Stepper alternativeLabel activeStep={activeStep}>
                    {steps.map((step, index) => {
                      const labelProps = {};
                      const stepProps = {};
                      if (isStepOptional(index)) {
                        labelProps.optional = (
                          <Typography variant="caption" align="center" style={{ display: 'block' }}>
                            (optional)
                          </Typography>
                        );
                      }
                      if (isStepSkipped(index)) {
                        stepProps.completed = false;
                      }
                      return (
                        <Step {...stepProps} key={index}>
                          <StepLabel {...labelProps}>{step}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                  <br />
                  <form>{getStepContent(activeStep)}</form>
                  <br />
                  <Button
                    className={classes.button}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    back
                  </Button>
                  {isStepOptional(activeStep) && (
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      disabled={changeHandleButton}
                      onClick={handleSkip}
                    >
                      skip
                    </Button>
                  )}
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={changeHandleButton}
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-sm-12 col-xs-12">
                <div className="show-on-medium-and-down" style={{ height: '20px' }}></div>
                <div className="_hide-on-small-and-down" style={{ height: '145px' }}>
                  {isUser ? (
                    <RateDoctor
                      doctor_id={appointmentDetail !== null && appointmentDetail.doctor_id}
                    />
                  ) : (
                    <div
                      className="view_result"
                      onClick={() =>
                        push({
                          pathname: '/app/patient-record-details',
                          state: appointmentDetail?.user_id,
                        })
                      }
                    >
                      View Medical Record
                    </div>
                  )}
                </div>
                <div className="show-on-small" style={{ height: '30px' }}></div>
                <div className="_container mb-3">
                  <div className="chat_list">
                    {roomKey != null && you != null && other != null && (
                      <ChatBox
                        user={user}
                        chat_messages={chatMessages}
                        closeChat={() => {}}
                        type={`small`}
                        userId={userId}
                        roomKey={roomKey}
                        you={you}
                        other={other}
                      />
                      // roomKey=6620117
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};
export default AppointmentDetails;
