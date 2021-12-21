import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import './index.scss';
import Swal from 'sweetalert2';
import useLabTestService from '../../../../shared/hooks/api/useLabTestService';
import useTenantService from '../../../../shared/hooks/api/useTenantService';
import styled, { keyframes } from 'styled-components';
import { fadeInDown } from 'react-animations';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';

const bounceAnimation = keyframes`${fadeInDown}`;

const FadeDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

function index({ sm, step, handleBack, handleSkip }) {
  const { mutateAsync: getLabTestByAppointmentId } =
    useLabTestService.useGetLabTestByAppointmentIdService();
  const { mutateAsync: updateToInternal } = useLabTestService.useUpdateToInternalService();
  const { mutateAsync: updateToExternal } = useLabTestService.useUpdateToExternalService();
  const { mutateAsync: updateLabTestResult } = useLabTestService.useUpdateLabTestResultService();
  const { mutateAsync: _getAllTenants } = useTenantService._useGetAllTenantsService();
  const [_res, _setRes] = useState(null);
  const [pictureIsLoading, setPictureIsLoading] = useState(false);
  const [option, setOption] = useState(null);
  const [labImage, setLabImage] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(true);
  const [labs, setLabs] = useState([]);

  console.log('labs', labs);

  console.log('===>', option, labImage);
  useEffect(() => {
    setOption(_res != null && _res[0].isexternallab == 0 ? 1 : 2);
    setLabImage(_res != null && _res[0].result);
    setPageLoaded(false);
  }, [_res]);

  async function getLabTestByAppointIdFuncCall(id) {
    const res = await getLabTestByAppointmentId(id);
    _setRes(res);
  }

  async function getLabs() {
    const res = await _getAllTenants();
    setLabs(res.data);
  }

  useEffect(() => {
    getLabTestByAppointIdFuncCall(sm.id);
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
        // if this is the present step and nothing has been uploaded yet
        // Swal.fire({
        //   title: 'No Lab results available',
        //   text: 'Please go back',
        //   icon: 'error',
        //   confirmButtonText: 'Go Back',
        // }).then(result => {
        //   handleBack();
        // });
        // if (_res != null && _res.length < 1) {
        // }
        Swal.fire('Doctor has not yet uploaded any lab results', '', 'warning');
      }
    }
  }, [sm, _res]);

  const renderItem = item => {
    if (_res != null) {
      return _res[0][item];
    }
  };
  console.log(_res);

  const noOptionChosen = () => {
    return (
      <>
        <div style={{ height: '21.5vh' }} className="hide-on-med-and-down"></div>
        <div style={{ height: '10px' }} className="show-on-medium-and-down"></div>
        <h3 style={{ marginLeft: '-35px' }}>Please choose a lab</h3>
      </>
    );
  };

  const uploadPicture = () => {
    const formData = new FormData();
    const pictureFile = document.querySelector('#file');
    formData.append('photo', pictureFile?.files[0]);
    setPictureIsLoading(true);
    axios
      .post(`http://upload.walexbiztestbox.com/`, formData)
      .then(({ data }) => {
        console.log('image uploaded', data);
        const newImage = `http://${data}`;
        setLabImage(newImage);
        updateLabTestResult({ id: _res != null && _res[0].id, payload: { result: newImage } });
        setPictureIsLoading(false);
      })
      .catch(err => {
        console.log('Error=>', err);
      });
  };

  const uploadDocument = () => {
    return (
      <LoadingOverlay active={pictureIsLoading} spinner text="Lab Test Uploading">
        {labImage == null && (
          <div style={{ height: '23.5vh' }} className="hide-on-med-and-down"></div>
        )}
        <label htmlFor="file">
          {labImage != null && (
            <div className="image">
              {/* display image once uploaded */}
              <div style={{ height: '9.5vh' }} className="hide-on-med-and-down"></div>
              <img src={labImage} style={{ width: '200px' }} />
              <p style={{ textDecoration: 'underline', cursor: 'pointer' }}>Change Image</p>
            </div>
          )}
          {labImage == null && <div className="upload_something">Upload something</div>}
        </label>
        <input
          accept="image/*, image/heic, image/heif"
          type="file"
          id="file"
          onChange={uploadPicture}
          hidden
        />
      </LoadingOverlay>
    );
  };

  const renderChosen = option => {
    if (option == null) {
      return noOptionChosen();
    } else if (option == 1) {
      return oneMedyLabs();
    } else {
      return uploadDocument();
    }
  };

  async function updateCustomerLabTestChoice(type) {
    if (type == 'internal') {
      const res = await updateToInternal(sm.id);
      console.log('internal=>', res);
    } else {
      // external
      const res = await updateToExternal(sm.id);
      console.log('external=>', res);
    }
  }

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
    <LoadingOverlay active={pageLoaded} spinner text="Loading...">
      <div className="__border">
        <div className="inner-borderp">
          {/* d-flex justify-content-center text-center */}
          <div className="row">
            <div className="col-xl-5 col-lg-5 col-sm-12 text-center">
              <div className="container">{renderChosen(option)}</div>
            </div>
            <div className="col-1 hide-on-med-and-down">
              <div style={{ border: '0.1px solid #ccc', height: '100%', width: '.6px' }}></div>
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12" style={{ textAlign: 'left' }}>
              <div style={{ height: '2.5px' }} className="hide-on-med-and-down"></div>
              <h3>{renderItem('title')}</h3>
              <p>{renderItem('description')}</p>
              <p>
                <b>Date Created: </b>
                {renderItem('created_at')}
              </p>
              <div className="row">
                <div className="col-12">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: '100%' }}
                    onClick={() => {
                      setOption(1);
                      updateCustomerLabTestChoice('internal');
                    }}
                  >
                    Use One-Medy Lab
                  </Button>
                  <div style={{ height: '8px' }}></div>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ width: '100%' }}
                    onClick={() => {
                      setOption(2);
                      updateCustomerLabTestChoice('external');
                    }}
                  >
                    Use External Lab
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
