import React from 'react';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../../shared/components/forminput';
import Button from '../../../shared/components/button';
import useDoctorService from '../../../shared/hooks/api/useDoctorService';

const getFormProps = () => {
  const initialValues = {
    folioNumber: '',
    qualification: '',
    professionalBio: '',
  };

  const validationSchema = Yup.object().shape({
    folioNumber: Yup.string(),
    qualification: Yup.string(),
    specialization: Yup.number(),
    professionalBio: Yup.string(),
  });

  return {
    initialValues,
    validationSchema,
  };
};

function FolioNumber(props) {
  const { mutateAsync: createDoctor, isLoading } = useDoctorService.useRegisterDoctorService();
  // async function handleSubmit(values) {
  //   if (values.folioNumber.length > 0) {
  //     props.nextForm();
  //   }
  // }
  async function handleSubmit(values, { setErrors }) {
    const { folioNumber, professionalBio, yearsOfExperience, qualification } = values;
    const payload = {
      folio_id: folioNumber,
      qualification,
      yearsofexperience: yearsOfExperience,
      proffessional_bio: professionalBio,
    };

    try {
      const response = await createDoctor(payload);
      props.nextForm(1);
    } catch (error) {
      console.log(payload);
      alert(error.message);
    }
  }

  return (
    <div>
      <br />
      <h2>Complete your doctor profile:</h2>
      <br />
      <Formik
        onSubmit={handleSubmit}
        validateOnMount={true}
        initialValues={getFormProps().initialValues}
        validationSchema={getFormProps().validationSchema}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Input.FormGroup>
              <Input.InputField
                name="folioNumber"
                placeholder="Enter your folio number"
                type="text"
              />
            </Input.FormGroup>
            <Input.FormGroup>
              <Input.InputField
                name="qualification"
                placeholder="Enter your Qualification"
                type="text"
              />
            </Input.FormGroup>

            <Input.FormGroup>
              <Input.InputField
                name="professionalBio"
                component="textarea"
                rows="3"
                placeholder="Professional Bio"
                type="text"
              />
            </Input.FormGroup>
            <Input.FormGroup>
              <Input.InputField
                name="yearsOfExperience"
                placeholder="Years of Experience"
                type="number"
              />
            </Input.FormGroup>

            <div>
              <Button
                doctorid={2}
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
    </div>
  );
}

export default FolioNumber;
