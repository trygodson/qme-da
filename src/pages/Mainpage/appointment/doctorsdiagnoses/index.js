import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import './index.scss';
import { useAuthState } from '../../../../shared/context/useAuthContext';
import useAppointmentService from '../../../../shared/hooks/api/useAppointmentService';
import LoadingOverlay from 'react-loading-overlay';

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
  },
  step_label_root: {
    fontSize: '10px',
  },
  wi: {
    width: '100%',
    backgroundColor: 'rgba(255, 0, 225, 0)',
  },
}));

function index({ id, handleNext }) {
  const classes = useStyles();
  const [diagnosis, setDiagnosis] = useState({
    conclusion: '',
    appointment_id: parseInt(id),
    weight: 'gjhkh',
    height: 'jhgkjhg',
    BMI: 'hgkjghhjb',
    healthchallenges: 'khgkjhghj',
    genotype: 'jh',
    bloodgroup: 'O+',
  });
  const [loading, setLoading] = useState(false);
  const { mutateAsync: createDiagnosis } = useAppointmentService.createDiagnosis();
  const { user } = useAuthState();
  const handleChange = e => {
    e.persist();
    setDiagnosis({ ...diagnosis, [e.target.name]: e.target.value });
  };
  const handleDiagnosis = async () => {
    setLoading(true);
    try {
      const res = await createDiagnosis(diagnosis);
      // console.log(res);
      if (res) {
        setLoading(false);
        handleNext();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LoadingOverlay active={loading} spinner text="Sending Diagnosis">
      <div className="__border">
        <div className="inner-bordert">
          <h3>Diagnosis</h3>
          <p>
            <b>Doctor</b>: Mr. {user?.user?.name}
          </p>
          <br />
          <textarea name="conclusion" onChange={handleChange} placeholder="write your diagnosis" />
          <Button color="primary" variant="contained" onClick={handleDiagnosis}>
            Finish
          </Button>
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default index;
