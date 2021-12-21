import React from 'react';
import { useAuthState } from '../../context/useAuthContext';

function index() {
  const { user } = useAuthState();

  return (
    <div className="main__title">
      <div className="main__greeting">
        <h1>Hello {user.user.name.split(' ')[0]}!</h1>
        <p>Welcome to One Medy</p>
      </div>
    </div>
  );
}

export default index;
