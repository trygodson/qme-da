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
const bounceAnimation = keyframes`${fadeInRight}`;
const _div = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

const getFormProps = props => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {
    tenantName: '',
    tenantAddress: '',
    tenantCity: '',

    email: '',
    firstname: '',
    lastname: '',
    phonenumber: '',
  };

  const validationSchema = Yup.object().shape({
    tenantName: Yup.string()
      .min(1, 'Tenant Name Should be atleast one word')
      .required('Tenant is Required'),
    tenantAddress: Yup.string()
      .min(2, 'Tenant Address must be more than 2 characters')
      .required('Address is required'),
    tenantCity: Yup.string()
      .min(2, 'Tenant Address must be more than 2 characters')
      .required('Address is required'),

    email: Yup.string().email('Invalid email address').required('Email is required'),
    firstname: Yup.string().required('Admin Name is Required'),
    lastname: Yup.string().required('Admin Last Name is Required'),

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

function CreateTenant({ formref, ...props }) {
  const { mutateAsync: addTenant, isLoading } = useTenantService.useAddTenantService();
  const tenantTypesOptions = [
    { value: 1, label: 'Pharmacy' },
    { value: 2, label: 'Laboratory' },
  ];
  const stateOptions = [
    { value: 1, label: 'Abuja' },
    { value: 2, label: 'Lagos' },
  ];
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
    }),

    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      border: '2px solid #888888',
      margin: '10px 0',
      padding: '10px 5px 10px 10px',
      borderColor: state.isFocused ? 'pink' : null,
    }),
  };
  async function handleSubmit(values, { setErrors }) {
    const {
      tenantName,
      phonenumber,
      tenantAddress,
      tenantCity,
      email,
      lastname,
      firstname,
      state,
      tenantType,
    } = values;
    const payload = {
      tenant: {
        address: tenantAddress,
        name: tenantName,
        state_id: state,
        tenant_type_id: tenantType,
        city: tenantCity,
      },
      admin: {
        email: email,
        phonenumber: phonenumber,
        firstname: firstname,
        lastname: lastname,
        state_id: state,
        gender: 'male',
        city: tenantCity,
        address: tenantAddress,
      },
    };

    try {
      const response = await addTenant(payload);
      Swal.fire({
        title: 'Tenant Aded',
        text: 'Sweet',
        type: 'success',
      }).then(function () {
        return { formref };
      });

      // if (response.isConfirmed != true) {
      // } else {
      //   return;
      //   //props.history.push("/app/dashboard");
      // }
    } catch (error) {
      // setAccount(error.response.data.errors);
      console.log(error.errors.message + 'err');
      setFormikErrors(error.errors, setErrors);
    }
  }

  return (
    <_div className="modal-form-73u543">
      <div className="container">
        <div className="modal-header">
          <h2>Add a Tenant</h2>
          <i className="bx bx-x close" onClick={() => {}}></i>
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
                <div>Tenant Details</div>
                <Input.FormGroup>
                  <Input.InputField
                    id="tenantName"
                    name="tenantName"
                    placeholder="Tenant Name"
                    type="text"
                  />
                </Input.FormGroup>
                <ErrorMessage className="text-danger" component="div" name="tenantName" />
                <Input.FormGroup>
                  <Input.InputField
                    id="tenantAddress"
                    name="tenantAddress"
                    placeholder="Tenant Address"
                    type="text"
                  />
                </Input.FormGroup>
                <ErrorMessage className="text-danger" component="div" name="tenantAddress" />

                <Input.FormGroup>
                  <Input.InputField
                    id="tenantCity"
                    name="tenantCity"
                    placeholder="Tenant City"
                    type="text"
                  />
                </Input.FormGroup>
                <ErrorMessage className="text-danger" component="div" name="tenantCity" />
                <Select
                  name="tenantType"
                  styles={customStyles}
                  options={tenantTypesOptions}
                  placeholder="Tenant Type"
                  onChange={({ value }) => setFieldValue('tenantType', value)}
                />
                <Select
                  name="state"
                  styles={customStyles}
                  options={stateOptions}
                  placeholder="State Of Operation"
                  onChange={({ value }) => setFieldValue('state', value)}
                />
                {/* <ErrorMessage className="text-danger" component="div" name="city" />
                 */}
                <div>Admin Details</div>
                <Input.FormGroup>
                  <Input.InputField
                    id="firstname"
                    name="firstname"
                    placeholder="First Name"
                    type="text"
                  />
                </Input.FormGroup>
                <Input.FormGroup>
                  <Input.InputField
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    type="text"
                  />
                </Input.FormGroup>
                <Input.FormGroup>
                  <Input.InputField id="email" name="email" placeholder="Email" type="email" />
                </Input.FormGroup>
                <Input.FormGroup>
                  <Input.InputField
                    id="phonenumber"
                    name="phonenumber"
                    placeholder="Phone Number"
                    type="number"
                  />
                </Input.FormGroup>

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

export default CreateTenant;
