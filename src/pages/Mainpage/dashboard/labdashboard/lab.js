import './lab.css';
import LabStats from './stats';
import DoctorChat from './chart';
import LatestRequest from './latestrequest';
import ColoredStatCard from '../../../../shared/components/coloredstat/coloredstats';
import ChatContainer from '../../../../shared/components/chatcomponent/chatcontainer';
import { pulse, fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import Welcome from '../../../../shared/components/welcome';

const LabDashboard = () => {
  const bounceAnimation = keyframes`${fadeIn}`;
  const _style = styled.div`
    animation: 1s ${bounceAnimation};
  `;

  return (
    <main>
      <div className="main__container">
        <Welcome />

        <LabStats />
        {/* <!-- MAIN CARDS ENDS HERE --> */}

        {/* <!-- CHARTS STARTS HERE --> */}
        <div className="charts">
          <DoctorChat />

          <LatestRequest />
        </div>

        {/* <!-- CHARTS ENDS HERE --> */}
        <br />
        <br />
        <br />
        {/* <div className="row">
          <div className="col-lg-8  col-md-12  col-sm-12">
            <LatestRequest />
          </div>
          <div className="col-lg-4  col-md-12  col-sm-12 ">
            <ChatContainer />
          </div>
        </div> */}
      </div>
    </main>
  );
};

export default LabDashboard;
