import moment from "moment";
import React from "react";

const TimeFormatter = ({ value = 1 }) => {
  return <>{moment(value).format("MMMM Do YYYY, hh:mm A")}</>;
};

export default TimeFormatter;
