import Chart from '../../../../../shared/components/charts/Chart';
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const DoctorChart = ({ ...props }) => {
  const bounceAnimation = keyframes`${fadeIn}`;
  const _style = styled.div`
    animation: 1s ${bounceAnimation};
  `;
  return (
    <_style className="charts__left">
      <div className="charts__left__title">
        <div>
          <h1>Revenue Generateds</h1>
          <p>Income Generation Report</p>
        </div>
      </div>
      <Chart {...props} />
    </_style>
  );
};

export default DoctorChart;
