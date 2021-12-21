import DoctorStats from './stats';
// import '../doctordashboard/doctor.css';
import AdminChart from './chart';
import LatestRequest from './latestrequest';
import ColoredStatCard from '../../../../shared/components/coloredstat/coloredstats';
import ChatContainer from '../../../../shared/components/chatcomponent/chatcontainer';
import { pulse, fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { useAuthState } from '../../../../shared/context/useAuthContext';
import Welcome from '../../../../shared/components/welcome';

const DoctorDashboard = () => {
  const bounceAnimation = keyframes`${fadeIn}`;
  const _style = styled.div`
    animation: 1s ${bounceAnimation};
  `;

  const xs = useMediaQuery({ query: '(max-width: 576px)' });
  const sm = useMediaQuery({ query: '(min-width: 575px)' });
  const md = useMediaQuery({ query: '(min-width: 767px)' });
  const lg = useMediaQuery({ query: '(min-width: 991px)' });
  const xl = useMediaQuery({ query: '(min-width: 1199px)' });
  const xxl = useMediaQuery({ query: '(min-width: 1200px)' });
  const xxxl = useMediaQuery({ query: '(min-width: 1455px)' });

  const { user } = useAuthState();
  return (
    <main>
      <div className="main__container">
        <Welcome />

        <DoctorStats />
        {/* <!-- MAIN CARDS ENDS HERE --> */}

        {/* <!-- CHARTS STARTS HERE --> */}
        <div className="charts__left">
          <div className="col-12">
            <div className="container">
              <AdminChart {...{ xs, sm, md, lg, xl, xxl, xxxl }} />
            </div>
          </div>
        </div>

        {/* <_style className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Financial Summary</h1>
                <p>Amount made over time</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>

            <_style className="charts__right__cards">
              <ColoredStatCard class="card1" amount="₦12,000" title="Amount made today" />
              <ColoredStatCard class="card2" amount="₦120,000" title="Amount made this week" />
              <ColoredStatCard class="card3" amount="₦1,500,000" title="Total Amount Generated" />
              <ColoredStatCard class="card4" amount="₦12,000" title="Wallet balance" />
            </_style>
          </_style> */}

        {/* <!-- CHARTS ENDS HERE --> */}
        <br />
        <br />
        <br />
        {/* <div className="row">
          <div className="col-12">
            <LatestRequest />
          </div>
        </div> */}
        <y>hello world</y>
      </div>
    </main>
  );
};

export default DoctorDashboard;
