import React from 'react';
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

const bounceAnimation = keyframes`${fadeInRight}`;
const _div = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

const getFormProps = props => {
  const initialValues = {
    amount: null,
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.number().required('Amount is Required'),

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

function WithDrawalForm({ formref, ...props }) {
  const { mutateAsync: makeRequest, isLoading } = useWithDrawalService.makeWithWithdrawalRequest();
  async function handleSubmit(values, { setErrors }) {
    const { amount } = values;
    const payload = {
      amount,
    };

    try {
      const response = await makeRequest(payload);
      console.log(response);
      Swal.fire({
        title: 'Appointment Message',
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
      console.log(error.errors.message + 'err');
      setFormikErrors(error.errors, setErrors);
    }
  }

  return (
    <_div className="modal-form-73u543">
      <div className="container">
        <div className="modal-header">
          <h2>WithDrawal Request</h2>
          <i className="bx bx-x close" onClick={() => props.setWithDrawalForm(false)}></i>
        </div>
        <div className="modal-body">
          <Formik
            onSubmit={handleSubmit}
            validateOnMount={true}
            initialValues={getFormProps().initialValues}
            validationSchema={getFormProps().validationSchema}
          >
            {({ isSubmitting, isValid, setFieldValue }) => (
              <Form>
                <div>Type Amount</div>
                <Input.FormGroup>
                  <Input.InputField id="amount" name="amount" placeholder="$1000" type="number" />
                </Input.FormGroup>
                <ErrorMessage className="text-danger" component="div" name="amount" />

                <div>
                  <Button
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

export default WithDrawalForm;
