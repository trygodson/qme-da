import { useState, useEffect } from 'react';
import StatCard from '../../../../shared/components/statcard/StatCard';
import useSummaryService from '../../../../shared/hooks/api/useSummaryService';
import { wobble, fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { useAuthState } from '../../../../shared/context/useAuthContext';
import StatLoader from '../../../../shared/components/skeletonloader/statloader';

const DoctorStats = () => {
  const [data, setData] = useState({});
  const [loading, Loading] = useState(true);
  const { user } = useAuthState();

  const { mutateAsync: SummaryData, isLoading } = useSummaryService.getDoctorSummaryData();

  useEffect(() => {
    fetchedata();
  }, []);
  async function fetchedata() {
    try {
      const response = await SummaryData(user.user.id);
      setData(response);
      Loading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  const bounceAnimation = keyframes`${fadeIn}`;
  const _style = styled.div`
    animation: 1s ${bounceAnimation};
  `;

  return loading === true ? (
    <_style className="main__cards">
      <StatLoader />
      <StatLoader />
      <StatLoader />
      <StatLoader />
    </_style>
  ) : (
    <_style className="main__cards">
      <StatCard
        value={data.pending_appointments}
        title="Pending Appointments"
        icon="fa fa-calendar"
      />
      <StatCard
        value={data.canceled_appointments}
        title="Cancelled Appointments"
        icon="fa fa-calendar-times-o"
      />
      <StatCard
        value={data.completed_appointments}
        title="Completed Appointments"
        icon="fa fa-calendar-check-o"
      />
      <StatCard
        value={data.total_appointments}
        title="Total Appointments"
        icon="fa fa-calendar-check-o"
      />
    </_style>
  );
};

export default DoctorStats;
