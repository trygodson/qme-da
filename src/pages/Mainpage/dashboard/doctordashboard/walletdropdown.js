import React, { useState, useEffect } from 'react';
import { WalletFill, Wallet } from 'react-bootstrap-icons';
import useWithDrawalService from '../../../../shared/hooks/api/useWithDrawalService';

function walletdropdown({ walletamount }) {
  const [optionOpen, setOptionOpen] = useState(false);
  const [amount, setAmount] = useState();
  const [currentStatus, setCurrentStatus] = useState(true);
  const { mutateAsync: getAmount } = useWithDrawalService.getAmount();

  useEffect(() => {
    const _gf = async () => {
      const res = await getAmount();
      setAmount(res);
    };
    _gf();
  }, []);
  const toggleOptions = () => {
    setOptionOpen(!optionOpen);
  };

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
      <div className="change_status _status _wd">
        <div className="container">
          {!optionOpen ? (
            <WalletFill {...iconProps} color="black" onClick={toggleOptions} />
          ) : (
            <Wallet {...iconProps} color="black" onClick={toggleOptions} />
          )}
          <p className="status-text wd" onClick={toggleOptions}>
            Current Wallet
          </p>
          <p className="selected-text wd" onClick={toggleOptions}>
            ₦ {amount ? amount?.balance?.toFixed(2) : walletamount?.toFixed(2)}
          </p>
        </div>
        {/* {optionOpen && (
          <div className="_status options py-2 dd ">
            <div className="container">
              <hr className="hr" />
              <a className="option-text my-2" onClick={updateStatus}>
                View Wallet
              </a>
              <a className="option-text my-2" onClick={updateStatus}>
                WithDraw
              </a>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}

export default React.memo(walletdropdown);
