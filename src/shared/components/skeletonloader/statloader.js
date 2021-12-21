import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
const StatLoader = props => {
  return (
    <div className="cardtemplate">
      <SkeletonTheme color="#202020" highlightColor="#444">
        <section>
          <Skeleton height={50} width={50} />
        </section>
      </SkeletonTheme>
    </div>
  );
};

export default StatLoader;
