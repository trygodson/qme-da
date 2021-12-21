import '../../../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  LineSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis';

const Chart = ({ ...props }) => {
  const data = [
    { x: 'Jan', y: 500 },
    { x: 'Feb', y: 500 },
    { x: 'Mar', y: 500 },
    { x: 'Apr', y: 500 },
    { x: 'May', y: 600 },
    { x: 'Jun', y: 400 },
    { x: 'July', y: 6 },
    { x: 'Aug', y: 3 },
    { x: 'Sept', y: 2 },
    { x: 'Oct', y: 0 },
    { x: 'Nov', y: 0 },
    { x: 'Dec', y: 0 },
  ];

  const height = typeof props.xs != undefined ? 350 : 300;
  const width =
    typeof props.xs != undefined
      ? props.xxxl
        ? props.xxxlSize
          ? props.xxxlSize
          : 1300
        : props.xxl
        ? props.xxlSize
          ? props.xxlSize
          : 800
        : props.xl
        ? props.xlSize
          ? props.xlSize
          : 800
        : props.lg
        ? props.lgSize
          ? props.lgSize
          : 650
        : props.md
        ? props.mdSize
          ? props.mdSize
          : 650
        : props.sm
        ? props.smSize
          ? props.smSize
          : 500
        : props.xs
        ? props.xsSize
          ? props.xsSize
          : 400
        : 600
      : 600;

  console.log(width);

  return (
    <div style={{ marginTop: '15px' }}>
      <XYPlot height={height} width={width} xType="ordinal">
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />

        <LineSeries data={data} color="green" />
      </XYPlot>
    </div>
  );
};

export default Chart;
