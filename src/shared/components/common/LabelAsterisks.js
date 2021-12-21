import React from "react";

const LabelAsterisks = ({ text = "Enter Value", color = "red", ...props }) => {
  return (
    <>
      {text} <span style={{ color: color }}>*</span>
    </>
  );
};

export default LabelAsterisks;
