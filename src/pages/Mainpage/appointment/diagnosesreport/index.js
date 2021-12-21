import React, { useEffect } from 'react';
import './index.scss';
import Swal from 'sweetalert2';

function index({ sm, step, handleBack, handleSkip, handleDynamicBack }) {
  useEffect(() => {
    if (sm.appointment_step < step) {
      Swal.fire({
        title: 'Previous step not cleared yet',
        text: 'Go back to previous step',
        icon: 'error',
        confirmButtonText: 'Go Back',
      }).then(result => {
        handleBack();
      });
    } else {
      if (sm.appointmentdiagnosis == null) {
        Swal.fire('Doctor has not uploaded any diagnosis', '', 'warning');
      }
    }
  }, []);

  return (
    <div className="__border">
      <div className="inner-bordert">
        <h3>Diagnosis</h3>
        <br />
        <p>
          <b>Weight</b>: {sm.appointmentdiagnosis.weight}
        </p>
        <p>
          <b>Height</b>: {sm?.appointmentdiagnosis.height}
        </p>
        <p>
          <b>BMI</b>: {sm?.appointmentdiagnosis.BMI}
        </p>
        <p>
          <b>Blood Group</b>: {sm?.appointmentdiagnosis.bloodgroup}
        </p>
        <p>
          <b>Genotype</b>: {sm?.appointmentdiagnosis.genotype}
        </p>
        <br />
        <h4>Health Challenges</h4>
        <p>{sm?.appointmentdiagnosis.healthchallenges}</p>
        <br />
        <h4>Conclusion</h4>
        <p>{sm?.appointmentdiagnosis.conclusion}</p>
      </div>
    </div>
  );
}

export default index;
