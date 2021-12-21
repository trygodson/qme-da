import React, { useState, useEffect } from 'react';
import {
  CalendarEvent,
  Mailbox,
  Pen,
  Person,
  Phone,
  Pin,
  Book,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './userprofile.css';
import useUserService from '../../../shared/hooks/api/useUserService';
import ProfileImg from '../../../assets/3983104.png';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios';
import Swal from 'sweetalert2';
import useBankService from '../../../shared/hooks/api/useBankService';

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const { mutateAsync: getUserInfo } = useUserService.useGetUserInfoService();
  const { mutateAsync: updateUserInfo } = useUserService.updateUserInfoService();
  const { mutateAsync: changeUserPassword } = useUserService.changeUserPasswordService();
  const { mutateAsync: addBank } = useBankService.addBankDetail();
  const [__isLoading, __setIsLoading] = useState(false);
  const [resetFormLoading, setResetFormLoading] = useState(false);
  const [bankLoading, setBankLoading] = useState(false);
  const [_avatar, _setAvatar] = useState(ProfileImg);

  async function getUserDetails() {
    const response = await getUserInfo();
    console.log(response);
    setUserInfo(response);
    _setAvatar(response.avatar);
  }
  useEffect(() => {
    getUserDetails();
  }, []);

  const renderItem = item => {
    if (userInfo != null) {
      return userInfo[item];
    }
  };

  async function handleSubmit(values) {
    console.log('pre=>', values);
    __setIsLoading(true);
    try {
      const response = await updateUserInfo(values);
      console.log('response=>', response);
      __setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePasswordResetForm(values) {
    setResetFormLoading(true);
    const payload = {
      password: values.pin1,
      id: userInfo.id,
      email: userInfo.email,
    };
    const response = await changeUserPassword(payload);
    console.log(response);
    setResetFormLoading(false);
    Swal.fire('Password reset successful', '', 'success');
  }
  async function handleBankForm(values) {
    setBankLoading(true);
    const payload = {
      account_number: values.account,
      bank: values.bank,
      sort_code: values.sort_code,
    };
    try {
      const response = await addBank(payload);
      if (response) {
        setBankLoading(false);
        Swal.fire('Details Updated Successfully', '', 'success');
      }
    } catch (error) {
      Swal.fire(error.message, '', 'error');
    }
  }

  const getFormProps = () => {
    const initialValues = {
      bio: renderItem('bio'),
      facebook: renderItem('facebook'),
      linkedin: renderItem('linkedin'),
      instagram: renderItem('instagram'),
      avatar: renderItem('avatar') != null ? renderItem('avatar') : '',
    };

    const validationSchema = Yup.object().shape({
      bio: Yup.string(),
      facebook: Yup.string(),
      linkedin: Yup.string(),
      instagram: Yup.string(),
      avatar: Yup.string(),
    });

    return {
      initialValues,
      validationSchema,
    };
  };

  const getResetFormProps = () => {
    const initialValues = {
      pin1: '',
      pin2: '',
    };

    const validationSchema = Yup.object().shape({
      pin1: Yup.string().required('Password is required').min(6),
      pin2: Yup.string()
        .required('Password is required')
        .oneOf([Yup.ref('pin1'), null], 'password must match'),
    });

    return {
      initialValues,
      validationSchema,
    };
  };
  const getAccountFormProps = () => {
    const initialValues = {
      account: '',
      bank: '',
      sort_code: '',
    };

    const validationSchema = Yup.object().shape({
      account: Yup.string().required('Password is required').min(10),
      bank: Yup.string().required('Password is required'),
      sort_code: Yup.string().required('Password is required'),
    });

    return {
      initialValues,
      validationSchema,
    };
  };

  const style = {
    fontSize: '16px',
  };

  const uploadPicture = () => {
    const formData = new FormData();
    const pictureFile = document.querySelector('#file');
    formData.append('photo', pictureFile?.files[0]);
    __setIsLoading(true);
    axios
      .post(`http://upload.walexbiztestbox.com/`, formData)
      .then(({ data }) => {
        const newImage = `http://${data}`;
        _setAvatar(newImage);
        handleSubmit({ avatar: newImage });
        __setIsLoading(false);
      })
      .catch(err => {
        console.log('Error=>', err);
      });
  };

  return (
    <main>
      <div className="main__container">
        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to="/newUser">
              <button className="userAddButton">Create</button>
            </Link>
          </div>
          <div className="userContainer row">
            <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12 mb-3">
              <div className="userShow">
                <div className="userShowTop">
                  <img src={_avatar} alt="" className="userShowImg" />
                  <div className="userShowTopTitle">
                    <span className="userShowUsername">
                      {`${renderItem('firstname')} ${renderItem('lastname')}`}
                    </span>
                    <span className="userShowUserTitle">
                      {renderItem('firstname') != null && userInfo.roles.name}
                    </span>
                  </div>
                </div>
                <div className="userShowBottom">
                  <span className="userShowTitle">Account Details</span>
                  <div className="userShowInfo">
                    <Facebook className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      {renderItem('facebook') != null ? (
                        renderItem('facebook')
                      ) : (
                        <i style={style}>Your facebook</i>
                      )}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <Instagram className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      {renderItem('instagram') != null ? (
                        renderItem('instagram')
                      ) : (
                        <i style={style}>Your instagram</i>
                      )}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <Linkedin className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      {renderItem('linkedin') != null ? (
                        renderItem('linkedin')
                      ) : (
                        <i style={style}>Your linkedin</i>
                      )}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <Book className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      {renderItem('bio') != null ? (
                        renderItem('bio')
                      ) : (
                        <i style={style}>Your bio</i>
                      )}
                    </span>
                  </div>
                  {/* <div className="userShowInfo">
                  <CalendarEvent className="userShowIcon" />
                  <span className="userShowInfoTitle">10.12.1999</span>
                </div> */}
                  <span className="userShowTitle">Contact Details</span>
                  <div className="userShowInfo">
                    <Phone className="userShowIcon" />
                    <span className="userShowInfoTitle">{renderItem('phonenumber')}</span>
                  </div>
                  <div className="userShowInfo">
                    <Mailbox className="userShowIcon" />
                    <span className="userShowInfoTitle">{renderItem('email')}</span>
                  </div>
                  <div className="userShowInfo">
                    <Pin className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      {`${renderItem('address')}, ${renderItem('city')}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-sm-12 col-xs-12 mb-3">
              <Formik
                enableReinitialize
                onSubmit={handleSubmit}
                validateOnMount={true}
                initialValues={getFormProps().initialValues}
                validationSchema={getFormProps().validationSchema}
              >
                {({ isSubmitting, isValid, values, handleChange }) => (
                  <LoadingOverlay active={__isLoading} spinner text="Updating Profile">
                    <Form className="userUpdateForm">
                      <div className="userUpdate">
                        <span className="userUpdateTitle">Edit</span>

                        <div className="row">
                          <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12">
                            <div className="userUpdateItem">
                              <label>First Name</label>
                              <div className="formGroup">
                                <input
                                  type="text"
                                  placeholder="Anna Becker"
                                  value={renderItem('firstname')}
                                  className="inputField"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12">
                            <div className="userUpdateItem">
                              <label>Last Name</label>
                              <div className="formGroup">
                                <input
                                  type="text"
                                  placeholder="Anna Becker"
                                  value={renderItem('lastname')}
                                  className="inputField"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12">
                            <div className="userUpdateItem">
                              <label>Email</label>
                              <div className="formGroup">
                                <input
                                  type="text"
                                  placeholder="annabeck99@gmail.com"
                                  value={renderItem('email')}
                                  className="inputField"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12">
                            <div className="userUpdateUpload">
                              <img className="userUpdateImg" src={_avatar} alt="" />
                              <label htmlFor="file">
                                <Pen className="userUpdateIcon" />
                              </label>
                              <input
                                accept="image/*, image/heic, image/heif"
                                type="file"
                                id="file"
                                onChange={uploadPicture}
                                hidden
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12">
                            <div className="userUpdateItem">
                              <label>Phone</label>
                              <div className="formGroup">
                                <input
                                  type="text"
                                  placeholder="+1 123 456 67"
                                  value={renderItem('phonenumber')}
                                  className="inputField"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12">
                            <div className="userUpdateItem">
                              <label>Address</label>
                              <div className="formGroup">
                                <input
                                  type="text"
                                  placeholder="New York | USA"
                                  value={renderItem('address')}
                                  className="inputField"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12">
                            <div className="userUpdateItem">
                              <label>City</label>
                              <div className="formGroup">
                                <input
                                  type="text"
                                  placeholder="New York | USA"
                                  value={renderItem('city')}
                                  className="inputField"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12">
                            <div className="userUpdateItem">
                              <label>Bio</label>
                              <div className="formGroup">
                                <input
                                  type="text"
                                  placeholder="Bio"
                                  value={values.bio}
                                  onChange={handleChange('bio')}
                                  className="inputField"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-sm-12 col-xs-12">
                            <div className="userUpdateItem">
                              <label>Facebook</label>
                              <div className="formGroup">
                                <input
                                  type="text"
                                  placeholder="Facebook"
                                  value={values.facebook}
                                  onChange={handleChange('facebook')}
                                  className="inputField"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-sm-12 col-xs-12">
                            <div className="userUpdateItem">
                              <label>Instagram</label>
                              <div className="formGroup">
                                <input
                                  type="text"
                                  placeholder="Instagram"
                                  value={values.instagram}
                                  onChange={handleChange('instagram')}
                                  className="inputField"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-sm-12 col-xs-12">
                            <div className="userUpdateItem">
                              <label>Linkedin</label>
                              <div className="formGroup">
                                <input
                                  type="text"
                                  placeholder="Linkedin"
                                  value={values.linkedin}
                                  onChange={handleChange('linkedin')}
                                  className="userUpdateInput"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <button
                              className="_button"
                              type="submit"
                              disabled={isSubmitting || !isValid}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </LoadingOverlay>
                )}
              </Formik>
            </div>
          </div>
          <div style={{ height: '20px' }}></div>
          <div className="row ">
            <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12 mb-3 mx-auto">
              <div className="userUpdate">
                <span className="userUpdateTitle">Update Password</span>

                <Formik
                  onSubmit={handlePasswordResetForm}
                  validateOnMount={true}
                  initialValues={getResetFormProps().initialValues}
                  validationSchema={getResetFormProps().validationSchema}
                >
                  {({ isSubmitting, isValid, values, handleChange, errors, touched }) => (
                    <LoadingOverlay active={resetFormLoading} spinner text="Updating Password">
                      <Form className="userUpdateForm">
                        <div className="row">
                          <div className="col-12">
                            <div className="userUpdateItem">
                              <label>New Password</label>
                              <div className="formGroup">
                                <input
                                  name="pin1"
                                  type="password"
                                  placeholder="New password"
                                  value={values.pin1}
                                  onChange={handleChange('pin1')}
                                  className="inputField"
                                />
                              </div>
                              {errors.pin1 && touched.pin1 && errors.pin1}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12">
                            <div className="userUpdateItem">
                              <label>Confirm new password</label>
                              <div className="formGroup">
                                <input
                                  type="password"
                                  placeholder="Confirm new password"
                                  value={values.pin2}
                                  onChange={handleChange('pin2')}
                                  className="inputField"
                                />
                              </div>
                              {errors.pin2 && touched.pin2 && errors.pin2}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12">
                            <button
                              className="_button"
                              type="submit"
                              //  disabled={isSubmitting || !isValid}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </Form>
                    </LoadingOverlay>
                  )}
                </Formik>
              </div>
            </div>

            <div className="col-xl-9 col-lg-9 col-sm-12 col-xs-12">
              <div className="userUpdate">
                <Formik
                  onSubmit={handleBankForm}
                  validateOnMount={true}
                  initialValues={getAccountFormProps().initialValues}
                  validationSchema={getAccountFormProps().validationSchema}
                >
                  {({ isSubmitting, isValid, values, handleChange, errors, touched }) => (
                    <LoadingOverlay active={bankLoading} spinner text="Updating Bank Info">
                      <Form className="userUpdateForm">
                        <div className="row">
                          <div className="col-12">
                            <div className="userUpdateItem">
                              <label>Account Number</label>
                              <div className="formGroup">
                                <input
                                  name="account"
                                  type="text"
                                  placeholder="Account Number"
                                  value={values.account}
                                  onChange={handleChange('account')}
                                  className="inputField"
                                />
                              </div>
                              {errors.account && touched.account && errors.account}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12">
                            <div className="userUpdateItem">
                              <label>Bank</label>
                              <div className="formGroup">
                                <input
                                  name="bank"
                                  type="text"
                                  placeholder="Bank"
                                  value={values.bank}
                                  onChange={handleChange('bank')}
                                  className="inputField"
                                />
                              </div>
                              {errors.bank && touched.bank && errors.bank}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="userUpdateItem">
                              <label>Sort Code</label>
                              <div className="formGroup">
                                <input
                                  name="sort_code"
                                  type="text"
                                  placeholder="Sort Code"
                                  value={values.sort_code}
                                  onChange={handleChange('sort_code')}
                                  className="inputField"
                                />
                              </div>
                              {errors.sort_code && touched.sort_code && errors.sort_code}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12">
                            <button
                              className="_button"
                              type="submit"
                              //  disabled={isSubmitting || !isValid}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </Form>
                    </LoadingOverlay>
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
