import React from 'react';
import './index.scss';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../../../shared/components/forminput';

const getFormProps = () => {
  const initialValues = {
    field1: '',
    field2: '',
    field3: '',
    field4: '',
  };

  const validationSchema = Yup.object().shape({
    field1: Yup.string(),
    field2: Yup.string(),
    field3: Yup.string(),
    field4: Yup.string(),
  });

  return {
    initialValues,
    validationSchema,
  };
};

const PatientMeeting = () => {
  async function handleSubmit(values) {}

  return (
    <>
      <div className="__border">
        <div style={{ height: '50px' }}></div>
        <div className="row">
          <div className="col-12">
            <Formik
              onSubmit={handleSubmit}
              validateOnMount={true}
              initialValues={getFormProps().initialValues}
              validationSchema={getFormProps().validationSchema}
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <div className="row">
                    <div className="col-3">
                      <Input.FormGroup>
                        <Input.InputField
                          id="Field 1"
                          name="field1"
                          placeholder="Field 1"
                          type="email"
                        />
                      </Input.FormGroup>
                    </div>
                    <div className="col-3">
                      <Input.FormGroup>
                        <Input.InputField
                          id="Field 1"
                          name="field1"
                          placeholder="Field 1"
                          type="email"
                        />
                      </Input.FormGroup>
                    </div>
                    <div className="col-6">
                      <Input.FormGroup>
                        <Input.InputField
                          id="Field 1"
                          name="field1"
                          placeholder="Field 1"
                          type="email"
                        />
                      </Input.FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <Input.FormGroup>
                        <Input.InputField
                          id="Field 1"
                          name="field1"
                          placeholder="Field 1"
                          type="email"
                        />
                      </Input.FormGroup>
                    </div>
                    <div className="col-6">
                      <Input.FormGroup>
                        <Input.InputField
                          id="Field 1"
                          name="field1"
                          placeholder="Field 1"
                          type="email"
                        />
                      </Input.FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <Input.FormGroup>
                        <Input.InputField
                          id="Field 1"
                          name="field1"
                          placeholder="Field 1"
                          type="email"
                        />
                      </Input.FormGroup>
                    </div>
                    <div className="col-6">
                      <Input.FormGroup>
                        <Input.InputField
                          id="Field 1"
                          name="field1"
                          placeholder="Field 1"
                          type="email"
                        />
                      </Input.FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <Input.FormGroup>
                        <Input.InputField
                          id="Field 1"
                          name="field1"
                          placeholder="Field 1"
                          type="email"
                        />
                      </Input.FormGroup>
                    </div>
                    <div className="col-6">
                      <Input.FormGroup>
                        <Input.InputField
                          id="Field 1"
                          name="field1"
                          placeholder="Field 1"
                          type="email"
                        />
                      </Input.FormGroup>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div style={{ height: '50px' }}></div>
      </div>
    </>
  );
};

export default PatientMeeting;
