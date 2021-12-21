import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeInRight } from 'react-animations';
import './index.scss';
// import { Button, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Label } from 'reactstrap';
import { Input } from '../forminput';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../button';

const bounceAnimation = keyframes`${fadeInRight}`;
const _div = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

const getFormProps = () => {
  const initialValues = {
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
  };

  const validationSchema = Yup.object().shape({
    field1: Yup.string(),
    field2: Yup.string(),
    field3: Yup.string(),
    field4: Yup.string(),
    field5: Yup.string(),
  });

  return {
    initialValues,
    validationSchema,
  };
};

function SideModalForm({ formref, ...props }) {
  async function handleSubmit(values) {}

  return (
    <_div className="modal-form-73u543">
      <div className="container">
        <div className="modal-header">
          <h2>Add a Tenant</h2>
          <i className="bx bx-x close" onClick={() => props.setShowModal(false)}></i>
        </div>
        <div className="modal-body">
          <Formik
            onSubmit={handleSubmit}
            validateOnMount={true}
            initialValues={getFormProps().initialValues}
            validationSchema={getFormProps().validationSchema}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <Input.FormGroup>
                  <FormikForm id="Field 1" name="text" placeholder="Field 1" type="email" />
                </Input.FormGroup>

                <Input.FormGroup>
                  <Input.InputField id="Field 2" name="text" placeholder="Field 2" type="p" />
                </Input.FormGroup>
                <Input.FormGroup>
                  <Input.InputField id="Field 3" name="text" placeholder="Field 3" type="email" />
                </Input.FormGroup>
                <Input.FormGroup>
                  <Input.InputField id="Field 4" name="text" placeholder="Field 4" type="email" />
                </Input.FormGroup>
                <div>
                  <Button
                    onClick={formref}
                    type="submit"
                    login={true}
                    disabled={isSubmitting || !isValid}
                    isLoading={isSubmitting}
                    style={{ width: '100%' }}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
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

export default SideModalForm;
