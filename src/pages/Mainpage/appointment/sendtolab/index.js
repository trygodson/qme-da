import React, { useEffect, useState } from 'react';
import './index.scss';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../../../shared/components/forminput';
// import Button from '../../../../shared/components/button';
import { Button } from '@material-ui/core';
import useLabTestService from '../../../../shared/hooks/api/useLabTestService';
import { useParams } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

function index({ handleNext, handleSkip, id }) {
  const { mutateAsync: addLabTest } = useLabTestService.addLabTest();
  const { mutateAsync: getLabTestByAppointmentId } =
    useLabTestService.useGetLabTestByAppointmentIdService();
  const [isLoading, setIsLoading] = useState(false);
  const [labResult, setLabResult] = useState(null);

  const [labInfo, setLabInfo] = useState({
    appointment_id: id,
    result: 'gfsf',
    title: '',
    description: '',
  });
  const handleInputs = e => {
    e.persist();
    setLabInfo({ ...labInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitLabInfo = async e => {
    setIsLoading(true);
    try {
      const res = await addLabTest(labInfo);
      if (res) {
        setIsLoading(false);
        handleNext();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getLabTest() {
      const labtest = await getLabTestByAppointmentId(id);
      console.log('labtest ==>', labtest);
      setLabResult(labtest[0]?.result);
    }
    getLabTest();
  }, []);

  return (
    <LoadingOverlay active={isLoading} spinner text="Sending To Lab">
      <div className="__border">
        <div className="inner-border-lab" style={{ height: '600px' }}>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-sm-12 col-xs-12">
              <div className="lab-image-preview">
                <div className="content col-8 col-sm-8 col-lg-4 col-md-6 col-xs-12 col-xl-12">
                  {labResult ? (
                    <>
                      <a href={labResult}>
                        <img src={labResult} style={{ width: '200px', marginTop: '-120px' }} />
                        <p>
                          <u style={{ float: 'center' }}>View Image</u>
                        </p>
                      </a>
                    </>
                  ) : (
                    <h3 align="center">No result uploaded yet</h3>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 col-sm-12 col-xs-12">
              <div className="lab-inputs">
                <div className="row">
                  <div className="col-12">
                    <Input.OrdinaryInputField
                      name="title"
                      placeholder="Title"
                      type="text"
                      onChange={handleInputs}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      name="description"
                      placeholder="Description of test..."
                      onChange={handleInputs}
                    ></textarea>
                  </div>
                </div>
                <div>
                  <Button
                    onClick={handleSubmitLabInfo}
                    style={{
                      backgroundColor: 'blue',
                      padding: '10px 15px',
                      width: '100%',
                      color: 'white',
                      marginTop: '18px',
                    }}
                    disabled={labInfo.title.length < 1 || labInfo.description.length < 1}
                  >
                    SEND TO LAB
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={handleSkip}
                    style={{
                      backgroundColor: '#b0276b',
                      padding: '10px 15px',
                      color: 'white',
                      width: '100%',
                      marginTop: '18px',
                    }}
                  >
                    Skip to next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default index;
