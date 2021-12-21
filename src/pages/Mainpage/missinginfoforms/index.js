import React, { useState } from 'react';
import Modal from 'react-modal';
import FolioNumber from './folionumber';
import Specialization from './specialization';
import './index.scss';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
  },
};

const MissingInfo = () => {
  const [modalIsOpen, setIsOpen] = React.useState(true);

  const forms = {
    0: FolioNumber,
    1: Specialization,
  };
  const [formCount, setFormCount] = useState(0);

  const nextForm = () => {
    const next = formCount + 1;
    let available = false;
    Object.keys(forms).map(values => {
      if (parseInt(values) == next) {
        setFormCount(next);
        available = true;
      }
    });
    available == false && setIsOpen(false);
  };

  const MissingInfoForm = forms[formCount];

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={() => {}}
      onRequestClose={() => {}}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <MissingInfoForm nextForm={nextForm} />
    </Modal>
  );
};

export default MissingInfo;
