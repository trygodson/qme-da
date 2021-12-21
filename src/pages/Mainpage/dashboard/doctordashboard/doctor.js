import { useEffect, useState } from 'react';
import './doctor.css';
import DoctorStats from './stats';
import DoctorChat from './chart';
import useSummaryService from '../../../../shared/hooks/api/useSummaryService';

import LatestRequest from './latestrequest';
import ColoredStatCard from '../../../../shared/components/coloredstat/coloredstats';
import ChatContainer from '../../../../shared/components/chatcomponent/chatcontainer';
import { pulse, fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import OnlineStatus from './onlinestatus';
import Walletdropdown from './walletdropdown';
import Welcome from '../../../../shared/components/welcome';
import { useDoctorState } from '../../../../shared/context/useDoctorContext';
import { useMediaQuery } from 'react-responsive';
import { useAuthState } from '../../../../shared/context/useAuthContext';

const DoctorDashboard = () => {
  const [data, setData] = useState({});

  const { mutateAsync: SummaryData, isLoading } = useSummaryService.getDoctorSummaryMoneyData();
  const { doctor } = useDoctorState();
  const { user } = useAuthState();

  useEffect(() => {
    fetchedata();
  }, []);
  async function fetchedata() {
    try {
      const response = await SummaryData(doctor.doctor.id);
      setData(response);
    } catch (error) {
      console.log(error.message);
    }
  }

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

  const xsSize = 400;
  const smSize = 600;
  const mdSize = 600;
  const lgSize = 350;
  const xlSize = 400;
  const xxlSize = 400;
  const xxxlSize = 550;
  console.log(user);
  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <div className="main__greeting">
            <h1>Hello {user.user.name.split(' ')[0]}!</h1>
            <p>Welcome to One Medy</p>
          </div>
        </div>
        <div className="the_drop_down">
          <div className="row">
            <div className="col-lg-6 ">
              <Walletdropdown className="" walletamount={data.pendingbalance} />
            </div>
            <div className="col-lg-6">
              <OnlineStatus />
            </div>
          </div>
        </div>

        <DoctorStats id={doctor.doctor.id} />
        {/* <!-- MAIN CARDS ENDS HERE --> */}

        {/* <!-- CHARTS STARTS HERE --> */}
        <div className="row">
          <div className="col-md-6 my-2">
            <DoctorChat
              {...{
                xs,
                sm,
                md,
                lg,
                xl,
                xxl,
                xxxl,
                xsSize,
                smSize,
                mdSize,
                lgSize,
                xlSize,
                xxlSize,
                xxxlSize,
              }}
            />
          </div>
          <div className="col-md-6 my-2">
            <_style className="charts__right">
              <div className="charts__right__title">
                <div>
                  <h1>Financial Summary</h1>
                  <p>Amount made over time</p>
                </div>
                <i className="fa fa-usd" aria-hidden="true"></i>
              </div>

              <_style className="row">
                <div className="col-md-6">
                  <ColoredStatCard
                    class="card1"
                    amount={`₦ ${data.todayamount}`}
                    title="Amount made today"
                  />
                </div>
                <div className="col-md-6 my-2">
                  <ColoredStatCard
                    class="card2"
                    amount={`₦ ${data.thisweekamount}`}
                    title="Amount made this week"
                  />
                </div>
                <div className="col-md-6">
                  <ColoredStatCard
                    class="card3"
                    amount={`₦ ${data.totalamount}`}
                    title="Total Amount Generated"
                  />
                </div>
                <div className="col-md-6 my-2">
                  <ColoredStatCard
                    class="card4"
                    amount={`₦ ${data.pendingbalance?.toFixed(2)}`}
                    title="Wallet balance"
                  />
                </div>
              </_style>
            </_style>
          </div>
        </div>

        {/* <!-- CHARTS ENDS HERE --> */}
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-xl-8 col-lg-8  col-md-12  col-sm-12 col-xs-12">
            <LatestRequest />
          </div>
          <div className="col-xl-4 col-lg-4  col-md-12  col-sm-12 col-xs-12 ">
            <ChatContainer />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DoctorDashboard;
