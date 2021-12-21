import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeInRight } from 'react-animations';
import './index.scss';

import Papa from 'papaparse';
import Swal from 'sweetalert2';
import Button from '../../../../shared/components/button';
import useDrugListService from '../../../../shared/hooks/api/useDrugListService';
const bounceAnimation = keyframes`${fadeInRight}`;
const _div = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

function AddDrugs({ formref, ...props }) {
  const { mutateAsync: addDrugs, isLoading } = useDrugListService.addlDrugs();
  const [data, setData] = useState([]);
  const [wait, isWaiting] = useState(true);
  async function submit(result) {
    try {
      const response = await addDrugs(result.data);
      Swal.fire({
        title: 'Documement Updated',
        text: 'Sweet',
      }).then(function () {
        return { formref };
      });
    } catch (error) {
      // setAccount(error.response.data.errors);
      console.log(error.message + 'err');
    }
  }

  return (
    <_div className="modal-form-73u543">
      <div className="container">
        <div className="modal-header">
          <h2>Upload File</h2>
          <i className="bx bx-x close" onClick={() => props.setShowModal(false)}></i>
        </div>
        <div className="modal-body">
          <div className="App">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={e => {
                isWaiting(false);
                const files = e.target.files;
                console.log(files);
                if (files) {
                  console.log(files[0]);
                  Papa.parse(files[0], {
                    header: true,
                    complete: function (results) {
                      return submit(results);
                    },
                  });
                }
              }}
            />
          </div>
          <div>
            <Button type="submit" isLoading={isWaiting} style={{ width: '100%' }}>
              Submit
            </Button>
          </div>
        </div>
        {/* <div className = "modal-footer">
              <hr />
                <button className = "btn btn-success">Submit</button>
                <button className = "btn btn-secondary" onClick = {()=>props.setShowModal(false)}>Cancel</button>
            </div> */}
      </div>
    </_div>
  );
}

export default AddDrugs;
