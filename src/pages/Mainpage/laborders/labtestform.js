import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeInRight } from 'react-animations';
import './index.scss';
// import { Button, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Label } from 'reactstrap';
import { Input } from '../../../shared/components/forminput';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../../shared/components/button';
import FormikForm from '../../../shared/components/form-inputs/formik/customInputs';
import Select from 'react-select';
import useTenantService from '../../../shared/hooks/api/useTenantService';
import Swal from 'sweetalert2';
import useWithDrawalService from '../../../shared/hooks/api/useWithDrawalService';
import { Pen } from 'react-bootstrap-icons';
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios';
import useLabTestService from '../../../shared/hooks/api/useLabTestService';
import useLabService from '../../../shared/hooks/api/useLabService';

const bounceAnimation = keyframes`${fadeInRight}`;
const _div = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

const getFormProps = props => {
  const initialValues = {
    amount: '',
    labimage: '',
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.string().required('Conclusion is Required'),
    labimage: Yup.string().required('Image Is Required'),
    // acceptedTerms: Yup.boolean()
    //   .oneOf([true], 'You must accept the terms and conditions.')
    //   .required('Required'),
  });

  return {
    initialValues,
    validationSchema,
    ...props,
  };
};
export function LabTestForm(props) {
  const { mutateAsync: sendResult } = useLabService.updateLabTestResult();
  const [_isLoading, _setIsLoading] = useState(false);
  const [conclusion, setConclusion] = useState();
  const [_labImage, _setLabImage] = useState();

  console.log(props.id);
  const uploadLabImage = e => {
    const formData = new FormData();
    const pictureFile = document.querySelector('#labimage');
    formData.append('photo', pictureFile?.files[0]);
    _setIsLoading(true);

    axios
      .post(`http://upload.walexbiztestbox.com/`, formData)
      .then(({ data }) => {
        const newImage = `http://${data}`;
        _setLabImage(newImage); // http://upload.walexbiztestbox.com/upload/Rectangle%2044.jpg
        _setIsLoading(false);
      })
      .catch(err => {
        Swal.fire({
          title: 'Error ',
          text: err.message,
          type: 'error',
        });
      });
  };

  async function handleSubmit() {
    const payload = {
      conclusion: conclusion,
      result: _labImage,
    };
    console.log(payload);
    try {
      const response = await sendResult({ id: props.id, payload });
      console.log(response);
      Swal.fire({
        title: 'Uploaded Successfully',
        text: response.message,
        icon: 'success',
        confirmButtonText: 'Cool',
      });
    } catch (error) {
      // setAccount(error.response.data.errors);
      Swal.fire({
        title: 'Error ',
        text: error.message,
        type: 'error',
      });
      // setFormikErrors(error.errors, setErrors);
    }
  }

  return (
    <_div className="modal-form-73u543">
      <div className="container">
        <div className="modal-header">
          <h2>Fianal Lab Result</h2>
          <i className="bx bx-x close" onClick={() => props.setLabTestForm(false)}></i>
        </div>
        <div className="modal-body">
          {/* <Formik
            onSubmit={handleSubmit}
            validateOnMount={true}
            initialValues={getFormProps().initialValues}
            validationSchema={getFormProps().validationSchema}
          >
            {({ isSubmitting, isValid, setFieldValue }) => (
              <Form> */}
          <label htmlFor="conclusion">Conclusion</label>
          <Input.FormGroup style={{ justifyContent: 'flex-start', paddingLeft: '10px' }}>
            <input
              id="conclusion"
              name="conclusion"
              placeholder="Type Your Conclusion"
              onChange={({ target }) => {
                setConclusion(target.value);
              }}
              type="text"
            />
          </Input.FormGroup>
          {_labImage && <img src={_labImage} width="150px" />}
          <LoadingOverlay active={_isLoading} spinner>
            <Input.FormGroup
              style={{ justifyContent: 'flex-start', paddingLeft: '10px', alignItems: 'center' }}
            >
              <label htmlFor="file">
                <Pen className="" />
              </label>
              <input
                id="labimage"
                name="labimage"
                type="file"
                onChange={uploadLabImage}
                accept="image/*, image/heic, image/heif"
              />
            </Input.FormGroup>
          </LoadingOverlay>

          <div>
            <button
              type="button"
              style={{ width: '100%' }}
              onClick={() => handleSubmit()}
              className="_button"
            >
              Submit
            </button>
          </div>
          {/* </Form>
            )}
          </Formik> */}
        </div>
        {/* <div className = "modal-footer">
              <hr />
                <button className = "btn btn-success">Submit</button>
                <button className = "btn btn-secondary" onClick = {()=>props.setShowModal(false)}>Cancel</button>
            </div> */}
      </div>
    </_div>
  );
}
