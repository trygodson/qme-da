import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { fadeInDown, slideInDown } from 'react-animations';
import { ArrowClockwise, ArrowLeftCircle, ArrowLeftSquare } from 'react-bootstrap-icons';
import { Button, Row } from 'reactstrap';
import styled, { keyframes } from 'styled-components';
import Chart from '../../../shared/components/charts/Chart';
import RippleTable from '../../../shared/components/tables/table/TableCard';
import useAppointmentService from '../../../shared/hooks/api/useAppointmentService';
import './patientrecorddetails.scss';
import PatientTable from './patienttable';

const InfoAnimation = keyframes`${fadeInDown}`;
const Prescrip = keyframes`${slideInDown}`;

const FadeDiv = styled.div`
  animation: 0.5s ${InfoAnimation};
  width: 100%;
  height: 100%;
`;
const _pres = styled.div`
  animation: 0.5s ${Prescrip};
  width: 100%;
  height: 100%;
`;

function PatientRecordDetails() {
  const [detailRecord, setDetailRecord] = useState();
  const [viewState, setViewState] = useState(null);
  const [prescription, setPrescription] = useState();
  const [labRes, setLabRes] = useState(null);
  const { mutateAsync: getLastData } = useAppointmentService.getLastAppointmentUserId();
  const { mutateAsync: getPrescription } = useAppointmentService.getPrescriptionByAppointmentId();
  const { mutateAsync: getLabtest } = useAppointmentService.getLabtestByUserId();
  const { state } = useLocation();

  useEffect(() => {
    const _gd = async () => {
      const res = await getLastData(state);
      const lab_res = await getLabtest(state);
      setDetailRecord(res);
      setLabRes(lab_res);
    };
    _gd();
  }, []);

  const handlePrescription = async gu => {
    try {
      const res = await getPrescription(gu);
      setPrescription(res.drug_prescription_item);
      setViewState(1);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLabTest = () => {
    setViewState(2);
  };

  const _prescription = () => {
    return (
      <_pres>
        <div className="row">
          <div className="col-12">
            <div className="last-visit mt-5">
              <b>Prescription</b>
            </div>
            <div className="last-visit-details container _border">
              <div className="row">
                <div className="col-12 description">
                  {prescription != null || (prescription != null && prescription.length < 1) ? (
                    <p>No Prescription Available</p>
                  ) : (
                    prescription?.map((i, d) => {
                      return (
                        <Fragment key={d}>
                          <h5>{i.name}</h5>
                          <p>{i.dosage_description}</p>
                        </Fragment>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </_pres>
    );
  };
  const _main = () => {
    return (
      <FadeDiv>
        <div className="row">
          <div className="col-12">
            <div className="last-visit mt-5">
              <b>Last visit</b>
            </div>
            <div className="last-visit-details container _border">
              <div className="row">
                <div className="col-1">
                  <i className="bx bx-star"></i>
                </div>
                <div className="col-11">
                  <div className="row">
                    <div className="col-12">
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Medication</th>
                            <th className="weight">Weight</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <b>{moment(detailRecord?.starts_at).format('LL')}</b>
                            </td>
                            <td>
                              <b>Vivoderall 20mg </b>
                            </td>
                            <td>
                              <b>17.5lbs</b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 description">
                      <div className="row">
                        <div className="col-12">
                          <h5>Note</h5>
                          <p>{detailRecord?.note}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="medical-records"></div>
            <div className="scrollable">
              <PatientTable id={state} setDetailRecord={setDetailRecord} />
            </div>
          </div>
        </div>
      </FadeDiv>
    );
  };
  const _labTest = () => {
    return (
      <FadeDiv>
        <div className="row">
          <div className="col-12">
            <div className="last-visit mt-5">
              <b>Lab Test</b>
            </div>
            <div className="last-visit-details container _border">
              <div className="row">
                <div className="col-12 description">
                  {labRes != null || (labRes != null && labRes.labtest.length < 1) ? (
                    <p>No Lab Test Available</p>
                  ) : (
                    labRes?.labtest?.map((test, i) => {
                      return (
                        <>
                          <h5>{test?.title}</h5>
                          <p>{test?.result}</p>
                          <p>{test?.description}</p>
                        </>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeDiv>
    );
  };

  const renderChosen = chosen => {
    if (chosen === null) {
      return _main();
    } else if (chosen === 1) {
      return _prescription();
    } else if (chosen === 2) {
      return _labTest();
    }
  };
  return (
    <main className="pb-4">
      <div className="main__container">
        {/* <div className="main__title">
                    <div className="main__greeting">
                        <h1>Chat</h1>
                    </div>
                </div> */}
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12">
            <div className="_container">
              <div className="row">
                <div className="col-12 ">
                  <div className="container profile _border">
                    <div className="a">
                      <img src="http://upload.walexbiztestbox.com/upload/gggggggg.jpg" />
                      <h4 style={{ 'white-space': 'pre' }}>
                        {labRes?.firstname} {labRes?.firstname}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="container weight _border">
                    <Button
                      color="primary"
                      className="m-1"
                      onClick={() => handlePrescription(detailRecord.id)}
                    >
                      View Prescription
                    </Button>
                    <Button color="primary" className="m-1" onClick={() => handleLabTest()}>
                      View Lab Test
                    </Button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="container details _border">
                    <b>Details</b>
                    <p>
                      Age: <b>{detailRecord?.appointmentdiagnosis?.age} years</b>
                    </p>
                    <p>
                      Weight: <b>{detailRecord?.appointmentdiagnosis?.weight} lbs</b>
                    </p>
                    <p>
                      Height: <b>{detailRecord?.appointmentdiagnosis?.height} ft</b>
                    </p>
                    <p>
                      Genotype: <b>{detailRecord?.appointmentdiagnosis?.genotype}</b>
                    </p>
                    <p>
                      BMI: <b>{detailRecord?.appointmentdiagnosis?.bmi}</b>
                    </p>
                    <p>
                      BloodGroup: <b>{detailRecord?.appointmentdiagnosis?.bloodgroup}</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-sm-12 col-xs-12">
            <div className="_container">
              <ArrowClockwise size={30} color="#5842f4" onClick={() => setViewState(null)} />
              {/* <div className="row">
                <div className="col-12 col-sm-12">
                  <div className="search container">
                    <input className="search" placeholder="Search for records..." />
                    <button className="">+ Record</button>
                  </div>
                </div>
              </div> */}
              {renderChosen(viewState)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PatientRecordDetails;
