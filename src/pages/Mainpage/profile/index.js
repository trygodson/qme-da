import React, { useEffect } from 'react';
import { Input } from '../../../shared/components/forminput';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../../shared/components/button';
import './index.scss';
import Image from '../../../assets/male.jpg';
import { CameraFill } from 'react-bootstrap-icons';
import useUserService from '../../../shared/hooks/api/useUserService';

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

function index() {
  const [userInfo, setUserInfo] = useState(null);
  const { mutateAsync: getUserInfo, isLoading } = useUserService.useGetUserInfoService();

  useEffect(() => {
    async () => {
      const response = await getUserInfo(payload);
      console.log(response);
    };
    console.log('11');
  }, []);

  async function handleSubmit(values) {}

  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <div className="main__greeting">
            <h1>Profile</h1>
            <br />
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-sm-12 col-xs-12">
            <div className="user_profile container">
              <img src={Image} />
              {/* <div className="camera_cont">
                <CameraFill size={40} />
              </div> */}
            </div>
          </div>
          <div className="col-xl-8 col-lg-8 col-sm-12 col-xs-12">
            <div className="container">
              <div className="container">
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
                          id="Field 1"
                          name="text"
                          placeholder="First Name"
                          type="email"
                        />
                      </Input.FormGroup>

                      <Input.FormGroup>
                        <Input.InputField
                          id="Field 2"
                          name="text"
                          placeholder="Last Name"
                          type="email"
                        />
                      </Input.FormGroup>
                      <Input.FormGroup>
                        <Input.InputField
                          id="Field 3"
                          name="text"
                          placeholder="Field 3"
                          type="email"
                        />
                      </Input.FormGroup>
                      <Input.FormGroup>
                        <Input.InputField
                          id="Field 4"
                          name="text"
                          placeholder="Field 4"
                          type="email"
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
                          Update Profile
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default index;
