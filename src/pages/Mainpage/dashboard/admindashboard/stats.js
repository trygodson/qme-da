import StatCard from '../../../../shared/components/statcard/StatCard';
// import "./doctor.css";
import { wobble, fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import useSummaryService from '../../../../shared/hooks/api/useSummaryService';
import { useEffect, useState } from 'react';
import StatLoader from '../../../../shared/components/skeletonloader/statloader';

const DoctorStats = () => {
  const [data, setData] = useState({});
  const [loading, Loading] = useState(true);
  const { mutateAsync: SummaryData, isLoading } = useSummaryService.getAdminSummaryData();
  const bounceAnimation = keyframes`${fadeIn}`;
  const _style = styled.div`
    animation: 1s ${bounceAnimation};
  `;
  useEffect(() => {
    fetchedata();
  }, []);
  async function fetchedata() {
    try {
      const response = await SummaryData(1);
      setData(response);
      Loading(false);
    } catch (error) {
      console.log(1);
      alert('error.message');
    }
  }

  return loading === true ? (
    <_style className="main__cards">
      <StatLoader />
      <StatLoader />
      <StatLoader />
      <StatLoader />
      <StatLoader />
      <StatLoader />
      <StatLoader />
      <StatLoader />
    </_style>
  ) : (
    <_style className="main__cards">
      <StatCard value={data.appointments} title="All Appointments" icon="fa fa-calendar" />
      <StatCard value="3" title="Completed Appointments" icon="fa fa-calendar-check-o" />
      <StatCard value="1" title="Pending Appointments" icon="fa fa-calendar" />
      <StatCard value={data.prescription} title="Prescription" icon="fa fa-calendar-times-o" />
      <StatCard value={data.doctors} title="All Doctors" icon="fa fa-users" />
      <StatCard value={data.drugs} title="Completed Appointments" icon="fa fa-medkit" />

      <StatCard value={data.tenant} title="All Tenants" icon="fa fa-calendar-check-o" />
      <StatCard value={data.labtest} title="Al Proceesed Lab Test" icon="fa fa-calendar-check-o" />
    </_style>
  );
};

export default DoctorStats;
