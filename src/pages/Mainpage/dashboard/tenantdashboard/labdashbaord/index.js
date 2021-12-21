import DoctorStats from './stats';
import DoctorChart from './chart';
import LatestRequest from './latestrequest';
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import Welcome from '../../../../../shared/components/welcome';
import { useMediaQuery } from 'react-responsive';

const LabDashboard = () => {
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

  return (
    <main>
      <div className="main__container">
        <Welcome />
        <DoctorStats />
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <DoctorChart
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
            <div style={{ height: '30px' }}></div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <LatestRequest />
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    </main>
  );
};

export default LabDashboard;
