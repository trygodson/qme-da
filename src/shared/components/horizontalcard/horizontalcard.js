import React from 'react';

function MedicalRecord({ ...props }) {
  return (
    <div className="medical-records-details container _border">
      <div className="row">
        <div className="col-1">
          <i className="bx bx-star"></i>
        </div>
        <div className="col-11">
          <div className="row">
            <div className="col-12">
              <table>
                <thead>
                  <th>Date</th>
                  <th>Medication</th>
                  <th>Weight</th>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <b>{props.date}</b>
                    </td>
                    <td>
                      <b>{props.medication}</b>
                    </td>
                    <td>
                      <b>{props.weight}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalRecord;
