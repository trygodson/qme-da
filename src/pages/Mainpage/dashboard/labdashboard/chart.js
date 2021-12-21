import Chart from '../../../../shared/components/charts/Chart';
import StatCard from '../../../../shared/components/statcard/StatCard';
// import "./doctor.css";
import { wobble, fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const DoctorChat = () => {
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
      <Chart />
    </_style>
  );
};

export default DoctorChat;
