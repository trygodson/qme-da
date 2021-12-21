import './index.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import response from '../../assets/jsondata/response.json';
import {
  AuthActionAddAccount,
  AuthActionSuccess,
} from './../../shared/context/reducers/authActions';
import axios from 'axios';

import { useAuthState } from './../../shared/context/useAuthContext';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../shared/config/Endpoints';
import useDoctorService from '../../shared/hooks/api/useDoctorService';
import { DoctorActionSuccess } from '../../shared/context/reducers/doctorActions';
import { useDoctorState } from '../../shared/context/useDoctorContext';
import { useTenantState } from '../../shared/context/useTenantContext';
import useTenantMemberService from '../../shared/hooks/api/useTenantMemberService';
import { TenantActionSuccess } from '../../shared/context/reducers/tenantActions';
const RedirectionPage = props => {
  const { mutateAsync: doctorbyUserId, isLoading } =
    useDoctorService.useDoctorDetailByUserIdService();
  // const { mutateAsync: getTenant, isLoading2 } = useTenantMemberService.getTenant();
  const { mutateAsync: getTenantMember } = useTenantMemberService.getTenantMember();
  const { id } = useParams();
  const { dispatchdoctor } = useDoctorState();
  const { dispatchtenant } = useTenantState();
  const { user, dispatch } = useAuthState();

  // const rootDashboardUrl = 'https://app.onemedy.com/app/dashboard';
  const rootDashboardUrl = 'http://localhost:3000/app/dashboard';

  const api = `${BASE_URL}userinfo`;
  async function checkdoctor(id) {
    try {
      const response = await doctorbyUserId(id);

      dispatchdoctor(
        DoctorActionSuccess({
          doctordetail: {
            id: response.id,
            isverified: response.isverified,
          },
        }),
      );

      //props.history.push("/app/dashboard");
      window.location.href = rootDashboardUrl;

      // }
    } catch (error) {
      window.location.href = '/update/doctor';
      //  props.history.push('/updatedoctor');
    }
  }

  async function checktenant(id, userObj) {
    try {
      const response = await getTenantMember(id);
      dispatchtenant(
        TenantActionSuccess({
          tenantdetail: {
            id: response.tenant.id,
            tenant: response.tenant,
            tenantrole: response.tenant_role,
          },
        }),
      );
      const permission = `${response.tenant.tenanttype.name.toLowerCase()}.${response.tenant_role.name.toLowerCase()}`;
      dispatch(
        AuthActionSuccess({
          ...userObj,
          currentUser: {
            ...userObj.currentUser,
          },
          permission: [permission],
        }),
      );

      //props.history.push("/app/dashboard");
      window.location.href = rootDashboardUrl;
    } catch (error) {
      console.log(error);
      //  props.history.push('/updatedoctor');
    }
  }
  const fetchData = () => {
    axios
      .get(api, { headers: { Authorization: `Bearer ${id}` } })
      .then(res => {
        if (res.data.isVerified == true) {
          const userObj = {
            token: id,
            currentUser: {
              name: res.data.firstname + ' ' + res.data.lastname,
              img_url: res.data.avatar,
              role: res.data.roles.name,
              id: res.data.id,
              email: res.data.email,
            },
            permission: [res.data.roles.name],
          };
          dispatch(AuthActionSuccess(userObj));

          if (res.data.roles.id == 2) {
            checkdoctor(res.data.id);
          } else if (res.data.roles.id == 4) {
            checktenant(res.data.id, userObj);
          } else {
            window.location.href = rootDashboardUrl;
          }
          //props.history.push("/app/dashboard");
        }
      })
      .catch(error => {
        console.log(error);
        return Swal.fire({
          title: 'UnAuthorized Access',
          text: error.message,
          icon: 'It is possible your session is expired please login again',
          confirmButtonText: 'Cool',
        });
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  async function handleSubmit(values) {
    try {
      const response = await loginUser(payload);

      dispatch(
        AuthActionSuccess({
          token: response.token,

          currentUser: {
            name: response.user.firstname + ' ' + response.user.lastname,

            id: response.user.id,
            email: response.user.email,
          },
          permission: [],
        }),
      );

      // }
    } catch (error) {
      return Swal.fire({
        title: 'Login Failed',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool',
      });
      console.log(error.message);
    }
  }

  return (
    <div className="r_g">
      {' '}
      <div className="loader">
        <ReactLoading type="cylon" color="#fff" />
        <p>Please Wait</p>
      </div>{' '}
    </div>
  );
};

export default RedirectionPage;
