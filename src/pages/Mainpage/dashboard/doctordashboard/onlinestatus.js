import React, { useState, useEffect } from 'react';
import { CaretUpFill, CaretDownFill } from 'react-bootstrap-icons';

function onlinestatus() {
  const [optionOpen, setOptionOpen] = useState(false);

  const toggleOptions = () => {
    setOptionOpen(!optionOpen);
  };

  const [currentStatus, setCurrentStatus] = useState(true);

  const updateStatus = () => {
    setCurrentStatus(!currentStatus);
    setOptionOpen(false);
  };

  const status = {
    true: 'Offline',
    false: 'Online',
  };

  const iconProps = {
    size: 23,
    color: 'white',
    className: 'caret-icon',
  };

  return (
    <>
      <div className="change_status _status">
        <div className="container">
          {!optionOpen ? (
            <CaretDownFill {...iconProps} onClick={toggleOptions} />
          ) : (
            <CaretUpFill {...iconProps} onClick={toggleOptions} />
          )}
          <p className="status-text" onClick={toggleOptions}>
            Status
          </p>
          <p className="selected-text" onClick={toggleOptions}>
            {status[currentStatus]}
          </p>
        </div>
        {optionOpen && (
          <div className="_status options">
            <div className="container">
              <hr className="hr" />
              <p className="option-text" onClick={updateStatus}>
                {status[!currentStatus]}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default React.memo(onlinestatus);
