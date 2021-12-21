import StatCard from '../../../../shared/components/statcard/StatCard';
// import '../doctordashboard/doctor.css';
import { wobble, fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const LabStats = () => {
  const bounceAnimation = keyframes`${fadeIn}`;
  const _style = styled.div`
    animation: 1s ${bounceAnimation};
  `;

  return (
    <_style className="main__cards">
      <StatCard value="1" title="Pending Tests" icon="fa fa-calendar" />
      <StatCard value="19" title="Cancelled Tests" icon="fa fa-calendar-times-o" />
      <StatCard value="3" title="Completed Tests" icon="fa fa-calendar-check-o" />
    </_style>
  );
};

export default LabStats;
