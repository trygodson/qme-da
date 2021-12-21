import React, { useEffect, useState } from 'react';
import { Form, Formik, ErrorMessage } from 'formik';
import { Input } from '../../../shared/components/forminput';
import * as Yup from 'yup';
import Button from '../../../shared/components/button';
import styled, { keyframes } from 'styled-components';
import { slideInRight } from 'react-animations';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AsyncInput from 'react-select/async';
import { BASE_URL } from '../../../shared/config/Endpoints';
import axios from 'axios';
import useDoctorService from '../../../shared/hooks/api/useDoctorService';
import { useAuthState } from '../../../shared/context/useAuthContext';
const getFormProps = () => {
  const initialValues = {
    specialization: '',
  };

  const validationSchema = Yup.object().shape({
    specialization: Yup.string(),
  });

  return {
    initialValues,
    validationSchema,
  };
};

const bounceAnimation = keyframes`${slideInRight}`;
const AnimationDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

function Specialization({ ...props }) {
  const { user, dispatch } = useAuthState();
  const { mutateAsync: addSpecialization, isLoading } = useDoctorService.useAddSpecialization();
  const [specialization, setSpecialization] = useState('');
  const loadspecializationOptions = async (text, callback) => {
    const res = await axios.get(`${BASE_URL}specialization?search=${text}`);

    callback(
      res.data.map(({ name, ...i }) => ({
        label: name,
        value: name,
        ...i,
      })),
    );
  };
  const selectSpecialization = i => {
    setSpecialization(i.id);
  };

  async function handleSubmit(values, { setErrors }) {
    const payload = {
      specialization_id: specialization,
    };
    try {
      const response = await addSpecialization(payload);
      window.location.href = `/${user.token}`;
    } catch (error) {
      console.log(payload);
      alert(error.message);
    }
  }

  return (
    <AnimationDiv>
      <br />
      <h2>Enter your specializations:</h2>
      <br />
      <Formik
        onSubmit={handleSubmit}
        validateOnMount={true}
        initialValues={getFormProps().initialValues}
        validationSchema={getFormProps().validationSchema}
      >
        {({ isSubmitting, isValid, setFieldValue }) => (
          <Form>
            <AsyncInput
              name="select"
              className="reach-doctor-input"
              loadOptions={loadspecializationOptions}
              defaultOptions
              placeholder="Search For A Specialization"
              onChange={selectSpecialization}
            />
            <div>
              <Button
                type="submit"
                login={true}
                disabled={isSubmitting || !isValid}
                isLoading={isLoading}
                style={{ width: '100%' }}
              >
                Next
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </AnimationDiv>
  );
}

export default Specialization;
