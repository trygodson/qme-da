import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

// Random component

const UseCountDown = ({ time, setDisabled }) => {
  console.log(time);
  const Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, completed }) => {
    if (completed) {
      setDisabled(false);
      return <Completionist />;
    } else {
      setDisabled(true);
      return (
        <span>Your Meeting will Start {`${days} days ${hours} hours ${minutes} minutes`}</span>
      );
    }
  };
  return <Countdown date={time} renderer={renderer} />;
};
export default UseCountDown;
