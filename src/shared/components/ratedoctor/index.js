import React, { useState, useEffect } from 'react';
import './index.scss';
import { Star, StarFill } from 'react-bootstrap-icons';
import useRatingService from '../../hooks/api/useRatingService';
import { useAuthState } from '../../../shared/context/useAuthContext';

function index({ doctor_id }) {
  const { user } = useAuthState();
  const [rating, setRating] = useState(1);
  const { mutateAsync: rateDoctor } = useRatingService.useRateDoctorService();

  async function handleRate(rating) {
    const response = await rateDoctor(doctor_id, {
      rating,
      user_id: user.user.id,
      rated_user_id: doctor_id,
    });
  }

  const starProps = {
    size: 30,
  };

  const starredProps = {
    border: '1px solid black',
    color: 'orange',
  };

  const renderRating = rating => {
    if (rating == 1) {
      return (
        <>
          <StarFill {...starProps} {...starredProps} />
          <Star {...starProps} />
          <Star {...starProps} />
          <Star {...starProps} />
          <Star {...starProps} />
        </>
      );
    } else if (rating == 2) {
      return (
        <>
          <StarFill {...starProps} />
          <StarFill {...starProps} />
          <Star {...starProps} />
          <Star {...starProps} />
          <Star {...starProps} />
        </>
      );
    } else if (rating == 3) {
      return (
        <>
          <StarFill {...starProps} />
          <StarFill {...starProps} />
          <StarFill {...starProps} />
          <Star {...starProps} />
          <Star {...starProps} />
        </>
      );
    } else if (rating == 4) {
      return (
        <>
          <StarFill {...starProps} />
          <StarFill {...starProps} />
          <StarFill {...starProps} />
          <StarFill {...starProps} />
          <Star {...starProps} />
        </>
      );
    } else if (rating == 5) {
      return (
        <>
          <StarFill {...starProps} />
          <StarFill {...starProps} />
          <StarFill {...starProps} />
          <StarFill {...starProps} />
          <StarFill {...starProps} />
        </>
      );
    } else {
      return (
        <>
          <Star {...starProps} onClick={() => handleRate(1)} />
          <Star {...starProps} onClick={() => handleRate(2)} />
          <Star {...starProps} onClick={() => handleRate(3)} />
          <Star {...starProps} onClick={() => handleRate(4)} />
          <Star {...starProps} onClick={() => handleRate(5)} />
        </>
      );
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="rate-doctor">
      <div className="container">
        <div style={{ height: '15px' }}></div>
        <h4>Don't forget to rate the doctor!</h4>
        <div className="stars">{renderRating(rating)}</div>
        <div style={{ height: '25px' }}></div>
      </div>
    </div>
  );
}

export default index;
